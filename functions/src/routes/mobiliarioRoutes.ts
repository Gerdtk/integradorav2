import { Router, Request, Response } from "express";
import { Firestore } from "firebase-admin/firestore";
import { verifyAuth } from "../middlewares/authMiddleware";
import { sanitizeInput } from "../utils/sanitize";

export default function mobiliarioRoutes(db: Firestore) {
  const router = Router();

  //obtener usuario actual
  const obtenerUsuarioActual = async (uid: string) => {
    try {
      const userDoc = await db.collection("clientes").doc(uid).get();
      return userDoc.exists ? userDoc.data()?.usuario : "sistema";
    } catch {
      return "sistema";
    }
  };

  //logMobiliario
  const registrarLog = async (
    accion: string,
    mobiliarioId: string,
    nombreMobiliario: string,
    usuario: string
  ) => {
    try {
      await db.collection("LogsMobiliario").add({
        accion,
        mobiliarioId,
        nombreMobiliario,
        usuario,
        fecha: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Error al registrar log de mobiliario: ", error);
    }
  };

  //Obtener todo el mobiliario
  router.get("/", verifyAuth, async (_req: Request, res: Response) => {
    try {
      const snapshot = await db.collection("Mobiliario").get();
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      res.status(200).json(data);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  //Obtener un mobiliario por id
  router.post("/id", verifyAuth, async (req: Request, res: Response) => {
    try {
      const doc = await db.collection("Mobiliario").doc(req.body.id).get();
      if (!doc.exists) {
        res.status(404).json({ error: "Mobiliario no encontrada" });
        return;
      }
      res.status(200).json({ id: doc.id, ...doc.data() });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  //Agregar nuevo mobiliario
  router.post("/", verifyAuth, async (req: Request, res: Response) => {
    try {
      //Obtener Usuario
      const uid = res.locals.user?.uid;
      if (!uid) {
        return res.status(401).json({ error: "Usuario no autenticado" });
      }
      const usuarioNombre = await obtenerUsuarioActual(uid);

      //Sanitizar rutas
      const nombre = sanitizeInput(req.body.nombre);
      const estado = sanitizeInput(req.body.estado);
      const cantidad = Number(req.body.cantidad);

      if (!nombre || !estado || cantidad === undefined || isNaN(cantidad)) {
        res.status(400).json({ error: "Faltan datos para actualizar" });
        return;
      }

      const ref = await db.collection("Mobiliario").add({
        nombre,
        estado,
        cantidad,
        creadoEl: new Date(),
      });

      //Registrar log de creacion
      await registrarLog("agregó", ref.id, nombre, usuarioNombre || "sistema");

      res.status(201).json({ id: ref.id, message: "Mobiliario agregado" });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
    return;
  });

  //Actualizar mobiliario existente (completo)
  router.put("/:id", verifyAuth, async (req: Request, res: Response) => {
    try {
      //Obtener Usuario
      const uid = res.locals.user?.uid;
      if (!uid) {
        return res.status(401).json({ error: "Usuario no autenticado" });
      }
      const usuarioNombre = await obtenerUsuarioActual(uid);

      //Sanitizar rutas
      const nombre = sanitizeInput(req.body.nombre);
      const estado = sanitizeInput(req.body.estado);
      const cantidad = Number(req.body.cantidad);

      if (!nombre || !estado || cantidad === undefined || isNaN(cantidad)) {
        res.status(400).json({ error: "Faltan datos para actualizar" });
        return;
      }

      await db.collection("Mobiliario").doc(req.params.id).update({
        nombre,
        estado,
        cantidad
      });

      //registrar log de actualizacion
      await registrarLog("actualizó", req.params.id, nombre, usuarioNombre || "sistema");

      res.status(200).json({ message: "Mobiliario actualizado correctamente" });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
    return;
  });

  //Eliminar mobiliario COMPLETO
  router.delete("/:id", verifyAuth, async (req: Request, res: Response) => {
    try {
      
      const uid = res.locals.user?.uid;
      if (!uid) {
        return res.status(401).json({ error: "Usuario no autenticado" });
      }
      const usuarioNombre = await obtenerUsuarioActual(uid);

      const docRef = db.collection("Mobiliario").doc(req.params.id);
      const doc = await docRef.get();

      if (!doc.exists) {
        res.status(404).json({ error: "Mobiliario no encontrado" });
        return;
      }
      const nombreMobiliario = doc.data()?.nombre || "Desconocido";

      await docRef.delete();

      await registrarLog("eliminó", req.params.id, nombreMobiliario, usuarioNombre);

      res.status(200).json({ message: "Mobiliario eliminado correctamente." })
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
    return;
  });

  return router;
}

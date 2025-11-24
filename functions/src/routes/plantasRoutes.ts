import { Router, Request, Response } from "express";
import { Firestore } from "firebase-admin/firestore";
import { verifyAuth } from "../middlewares/authMiddleware";
import { sanitizeInput } from "../utils/sanitize";

export default function plantasRoutes(db: Firestore) {
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

  //LogPlantas
  const registrarLog = async (
    accion: string,
    plantaId: string,
    nombrePlanta: string,
    usuario: string
  ) => {
    try {
      await db.collection("LogsPlantas").add({
        accion,
        plantaId,
        nombrePlanta,
        usuario,
        fecha: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Error al registrar log de planta:", error);
    }
  };

  //Obtener todas las plantas
  router.get("/", verifyAuth, async (_req: Request, res: Response) => {
    try {
      const snapshot = await db.collection("Plantas").get();
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      res.status(200).json(data);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  //Obtener una planta por id
  router.post("/id", verifyAuth, async (req: Request, res: Response) => {
    try {
      const doc = await db.collection("Plantas").doc(req.body.id).get();
      if (!doc.exists) {
        res.status(404).json({ error: "Planta no encontrada" });
        return;
      }
      res.status(200).json({ id: doc.id, ...doc.data() });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  //Agregar nueva planta
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
        res.status(400).json({ error: "Faltan datos" });
        return;
      }

      const ref = await db.collection("Plantas").add({
        nombre,
        estado,
        cantidad,
        fechaGerminacion: new Date(),
      });
      // Registrar log de creación
      await registrarLog("agregó", ref.id, nombre, usuarioNombre || "sistema");

      res.status(201).json({ id: ref.id, message: "Planta agregada" });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
    return;
  });

  //Actualizar una planta (todo)
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
      await db.collection("Plantas").doc(req.params.id).update({
        nombre,
        estado,
        cantidad
      });

      // Registrar log de actualización
      await registrarLog("actualizó", req.params.id, nombre, usuarioNombre || "sistema");

      res.status(200).json({ message: "Planta actualizada correctamente" });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
    return;
  });

  //Eliminar una planta COMPLETO
  router.delete("/:id", verifyAuth, async (req: Request, res: Response) => {
    try {
      //Obtener Usuario
      const uid = res.locals.user?.uid;
      if (!uid) {
        return res.status(401).json({ error: "Usuario no autenticado" });
      }
      const usuarioNombre = await obtenerUsuarioActual(uid);

      const docRef = db.collection("Plantas").doc(req.params.id);
      const doc = await docRef.get();

      if (!doc.exists) {
        res.status(404).json({ error: "Planta no encontrada" });
        return;
      }
      const nombrePlanta = doc.data()?.nombre || "Desconocido";

      await docRef.delete();

      await registrarLog("eliminó", req.params.id, nombrePlanta, usuarioNombre);

      res.status(200).json({ message: "Planta eliminada correctamente" });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
    return;
  });


  return router;
}
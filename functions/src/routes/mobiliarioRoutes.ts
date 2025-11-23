import { Router, Request, Response } from "express";
import { Firestore } from "firebase-admin/firestore";
//import { verifyAuth } from "../middlewares/authMiddleware"; // Puedes comentar esto para pruebas

export default function mobiliarioRoutes(db: Firestore) {
  const router = Router();

  //logMobiliario
  const registrarLog = async(
    accion: string,
    mobiliarioId: string,
    nombreMobiliario: string,
    usuario: string = "sistema"
  ) => {
    try {
      await db.collection("LogsMobiliario").add({
        accion,
        mobiliarioId,
        nombreMobiliario,
        usuario,
        fecha: new Date().toISOString(),
      });
    } catch (error){
      console.error("Error al registrar log de mobiliario: ", error);
    }
  };

  //Obtener todo el mobiliario
  router.get("/", async (_req: Request, res: Response) => {
    try {
      const snapshot = await db.collection("Mobiliario").get();
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      res.status(200).json(data);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  //Obtener un mobiliario por id
  router.post("/id", async (req: Request, res: Response) => {
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
  router.post("/", async (req: Request, res: Response) => { // Para pruebas quita el verifyAuth
    try {
      const { nombre, estado, cantidad, usuario } = req.body;
      if (!nombre || !estado || !cantidad) {
        res.status(400).json({ error: "Faltan datos" });
        return;
      }

      const ref = await db.collection("Mobiliario").add({
        nombre,
        estado,
        cantidad,
        creadoEl: new Date(),
      });

      //Registrar log de creacion
      await registrarLog("agrego", ref.id, nombre, usuario || "sistema");

      res.status(201).json({ id: ref.id, message: "Mobiliario agregado" });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  //Actualizar mobiliario existente (completo)
  router.put("/:id", async (req: Request, res: Response) => { // Para pruebas quita el verifyAuth
    try {
      const { nombre, estado, cantidad, usuario } = req.body;
      if (!nombre || !estado || cantidad) {
        res.status(400).json({ error: "Faltan datos para actualizar" });
        return;
      }
      
      await db.collection("Mobiliario").doc(req.params.id).update({ 
        nombre, 
        estado, 
        cantidad
      });

      //registrar log de actualizacion
      await registrarLog("actualizo", req.params.id, nombre, usuario || "sistema");

      res.status(200).json({ message: "Mobiliario actualizado correctamente" });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // ✅ Eliminar mobiliario COMPLETO
  router.delete("/:id", async (req: Request, res: Response) => { // Para pruebas quita el verifyAuth
    try {
      const docRef = db.collection("Mobiliario").doc(req.params.id);
      const doc = await docRef.get();

      if(!doc.exists){
        res.status(404).json({error: "Mobiliario no encontrado"});
        return;
      }
      const nombreMobiliario = doc.data()?.nombre || "Desconocido";
      const usuario = req.body.usuario || "sistema";
      
      await docRef.delete();

      await registrarLog("elimino", req.params.id, nombreMobiliario, usuario);
      
      res.status(200).json({ message: "Mobiliario eliminado correctamente."})
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  return router;
}

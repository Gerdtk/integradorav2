import { Router, Request, Response } from "express";
import { Firestore } from "firebase-admin/firestore";
//import { verifyAuth } from "../middlewares/authMiddleware";

export default function plantasRoutes(db: Firestore) {
  const router = Router();

  //LogPlantas
  const registrarLog = async (
    accion: string,
    plantaId: string,
    nombrePlanta: string,
    usuario: string = "sistema",
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
  router.get("/", async (_req: Request, res: Response) => {
    try {
      const snapshot = await db.collection("Plantas").get();
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      res.status(200).json(data);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  //Obtener una planta por id
  router.post("/id", async (req: Request, res: Response) => {
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
  router.post("/", async (req: Request, res: Response) => { //Para pruebas quitar verifyAuth
    try {
      const { nombre, estado, cantidad, usuario } = req.body;
      if (!nombre || !estado || !cantidad) {
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
      await registrarLog("agrego", ref.id, nombre, usuario || "sistema");

      res.status(201).json({ id: ref.id, message: "Planta agregada" });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  //Actualizar una planta (todo)
  router.put("/:id", async (req: Request, res: Response) => { //Para pruebas quitar verifyAuth
    try {
      const { nombre, estado, cantidad, usuario } = req.body;
      if (!nombre || !estado || !cantidad) {
        res.status(400).json({ error: "Faltan datos para actualizar" });
        return;
      }
      await db.collection("Plantas").doc(req.params.id).update({
        nombre,
        estado,
        cantidad
      });

      // Registrar log de actualización
      await registrarLog("actualizo", req.params.id, nombre, usuario || "sistema");

      res.status(200).json({ message: "Planta actualizada correctamente" });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  //Eliminar una planta COMPLETO
  router.delete("/:id", async (req: Request, res: Response) => {
    try {
      const docRef = db.collection("Plantas").doc(req.params.id);
      const doc = await docRef.get();

      if (!doc.exists) {
        res.status(404).json({ error: "Planta no encontrada" });
        return;
      }

      const nombrePlanta = doc.data()?.nombre || "Desconocido";
      const usuario = req.body.usuario || "sistema";

      await docRef.delete();

      await registrarLog("eliminó", req.params.id, nombrePlanta, usuario);

      res.status(200).json({ message: "Planta eliminada correctamente" });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });


  return router;
}

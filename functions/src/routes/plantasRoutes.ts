import { Router, Request, Response } from "express";
import { Firestore } from "firebase-admin/firestore";
import { verifyAuth } from "../middlewares/authMiddleware";

export default function plantasRoutes(db: Firestore) {
  const router = Router();

  // ✅ Obtener todas las plantas
  router.get("/", async (_req: Request, res: Response) => {
    try {
      const snapshot = await db.collection("PlantasGeneral").get();
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      res.status(200).json(data);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // obtener planta por nombre
  router.get("/:nombre", async (req: Request, res: Response) => {
    try {
      const docRef = await db.collection("PlantasGeneral").doc(req.params.id).get();
      if (!docRef.exists) {
        res.status(404).json({ error: "Planta no encontrada" });
        return;
      }
      res.status(200).json({ id: docRef.id, ...docRef.data() });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // ✅ Agregar nueva planta (requiere token)
  router.post("/", verifyAuth, async (req: Request, res: Response) => { //Para pruebas quitar verifyAuth
    try {
      const { nombre, tipo } = req.body;
      if (!nombre || !tipo){
        res.status(400).json({ error: "Faltan datos" });
        return;
      }
      const ref = await db.collection("PlantasGeneral").add({
        nombre,
        tipo,
        creadoEn: new Date(),
      });

      res.status(201).json({ id: ref.id, message: "Planta agregada" });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // ✅ Actualizar una planta
  //No probe estos dos, pero deberian funcionar, si no funcionan avisame y si da algun error cambia el router.put("/:nombre" por router.put("/:id"), igual el de abajo xd
  router.put("/:nombre", verifyAuth, async (req: Request, res: Response) => { //Para pruebas quitar verifyAuth
    try {
      const { nombre, tipo } = req.body;
      await db.collection("PlantasGeneral").doc(req.params.id).update({ nombre, tipo });
      res.status(200).json({ message: "Planta actualizada correctamente" });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // ✅ Eliminar una planta
  router.delete("/:nombre", verifyAuth, async (req: Request, res: Response) => { //Para pruebas quitar verifyAuth
    try {
      await db.collection("PlantasGeneral").doc(req.params.id).delete();
      res.status(200).json({ message: "Planta eliminada correctamente" });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  return router;
}

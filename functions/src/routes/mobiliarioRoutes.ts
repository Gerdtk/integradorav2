import { Router, Request, Response } from "express";
import { Firestore } from "firebase-admin/firestore";
import { verifyAuth } from "../middlewares/authMiddleware"; // Puedes comentar esto para pruebas

export default function mobiliarioRoutes(db: Firestore) {
  const router = Router();

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

  //Obtener un mobiliario por nombre
  router.get("/:nombre", async (req: Request, res: Response) => {
    try {
      const query = await db
        .collection("Mobiliario")
        .where("nombre", "==", req.params.nombre)
        .get();

      if (query.empty) {
        res.status(404).json({ error: "Mobiliario no encontrado" });
        return;
      }

      const data = query.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      res.status(200).json(data[0]);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  //Agregar nuevo mobiliario
  router.post("/", verifyAuth, async (req: Request, res: Response) => { // Para pruebas quita el verifyAuth
    try {
      const { nombre, cantidad } = req.body;
      if (!nombre || cantidad === undefined) {
        res.status(400).json({ error: "Faltan datos" });
        return;
      }

      const ref = await db.collection("Mobiliario").add({
        nombre,
        cantidad,
        creadoEn: new Date(),
      });

      res.status(201).json({ id: ref.id, message: "Mobiliario agregado" });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  //Actualizar mobiliario existente
  router.put("/:nombre", verifyAuth, async (req: Request, res: Response) => { // Para pruebas quita el verifyAuth
    try {
      const { nombre, cantidad } = req.body;
      await db.collection("Mobiliario").doc(req.params.id).update({ nombre, cantidad });
      res.status(200).json({ message: "Mobiliario actualizado correctamente" });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // ✅ Eliminar mobiliario
  router.delete("/:nombre", verifyAuth, async (req: Request, res: Response) => { // Para pruebas quita el verifyAuth
    try {
      await db.collection("Mobiliario").doc(req.params.id).delete();
      res.status(200).json({ message: "Mobiliario eliminado correctamente" });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  return router;
}

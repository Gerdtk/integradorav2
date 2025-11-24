import { Router } from "express";
import { Firestore } from "firebase-admin/firestore";
import { verifyAuth } from "../middlewares/authMiddleware";

export default function authRoutes(db: Firestore) {
  const router = Router();

  // Devuelve info del usuario logueado
  router.get("/me", verifyAuth, async (req: any, res) => {
    try {
      const uid = req.user.uid;

      const userDoc = await db.collection("clientes").doc(uid).get();

      if (!userDoc.exists) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }

      const data = userDoc.data();

      res.json({
        uid,
        usuario: data?.usuario,
        correo: data?.correo,
        rol: data?.rol
      });
    } catch (error) {
      console.error("Error en /auth/me:", error);
      res.status(500).json({ error: "Error al obtener usuario" });
    }
    return;
  });

  return router;
}

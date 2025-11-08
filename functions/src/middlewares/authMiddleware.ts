//puro esqueleto de middleware, aun no lo he probado porque aun no esta activado el auth en el proyecto de firebase.
import { Request, Response, NextFunction } from "express";
import admin from "firebase-admin";

// Middleware para verificar autenticación usando Firebase Admin SDK
export async function verifyAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;
    // Verificar que el header de autorización esté presente y tenga el formato correcto
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ error: "Token no proporcionado" });
      return;
    }
    // Extraer el token del header
    const idToken = authHeader.split("Bearer ")[1];
    const decodedToken = await admin.auth().verifyIdToken(idToken);

    // Agregamos los datos del usuario a la request (útil en rutas protegidas)
    (req as any).user = decodedToken;

    next(); // sigue con la ruta
  } catch (error: any) {
    console.error("Error al verificar token:", error);
    res.status(403).json({ error: "Token inválido o expirado" });
  }
}

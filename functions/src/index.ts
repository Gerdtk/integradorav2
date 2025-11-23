import * as functions from "firebase-functions";
import express from "express";
import cors from "cors";
import admin from "firebase-admin";

// Inicializa Firebase Admin (para manejar Firestore y Auth)
admin.initializeApp();
const db = admin.firestore();

const app = express();
app.use(cors({ origin: true })); // Permite peticiones desde cualquier origen (frontend)
app.options("*", cors());
app.use(express.json()); // Permite leer JSON del body

//Importar tus rutas personalizadas
import plantasRoutes from "./routes/plantasRoutes";
import mobiliarioRoutes from "./routes/mobiliarioRoutes";
//import { verifyAuth } from "./middlewares/authMiddleware";

//Montar las rutas en el servidor
app.use("/Plantas", plantasRoutes(db));
app.use("/Mobiliario", mobiliarioRoutes(db));

//Exportar como función HTTPS
exports.api = functions.https.onRequest(app);

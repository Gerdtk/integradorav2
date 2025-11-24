//Pagina Plantilla de Mobiliario
//Contiene Anti-inyecciones y verificacion del usuario
import './Mobiliario.css';
import { useEffect, useState } from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonList, IonItem, IonLabel, IonButton, IonInput
} from "@ionic/react";
import { getAuth } from 'firebase/auth';

const API_URL = "http://127.0.0.1:5001/imk2-3c2db/us-central1/api/Mobiliario";

//Limpiar el texto para evitar inyecciones de codigo
const cleanText = (text: string) =>
  text.replace(/<[^>]*>?/gm, "").replace(/['"$;]/g, "").trim();

interface Mobiliario {
  id: string;
  nombre: string;
  estado: string;
  cantidad: number;
}

const Mobiliarios: React.FC = () => {
  const [mobiliario, setMobiliario] = useState<Mobiliario[]>([]);
  const [nombre, setNombre] = useState("");
  const [estado, setEstado] = useState("");
  const [cantidad, setCantidad] = useState<number>(0);
  const [editando, setEditando] = useState<string | null>(null);

  const auth = getAuth();

  //Obtener token JWT de Firebase
  const getToken = async () => {
    return new Promise<string | null>((resolve) => {
      const unsub = auth.onAuthStateChanged(async user => {
        unsub();

        if (!user) {
          resolve(null);
          return;
        }

        const token = await user.getIdToken(true);
        resolve(token);
      });
    });
  };

  // Obtener Mobiliario
  const obtenerMobiliario = async () => {
    try {
      const token = await getToken();
      if (!token) {
        console.warn("No hay token, usuario no autenticado");
        return;
      }
      const res = await fetch(API_URL, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setMobiliario(await res.json());

    } catch (err) {
      console.error("Error al obtener mobiliario:", err);
    }
  };

  useEffect(() => {
    obtenerMobiliario();
  }, []);

  // Agregar o actualizar
  const guardarMobiliario = async () => {
    if (!nombre || !estado || cantidad <= 0) return;

    const token = await getToken();

    const nuevoMobiliario = {
      nombre: cleanText(nombre),
      estado: cleanText(estado),
      cantidad,
    };

    try {
      const url = editando ? `${API_URL}/${editando}` : API_URL;
      const method = editando ? "PUT" : "POST";

      await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(nuevoMobiliario),
      });

      setEditando(null);
      setNombre("");
      setEstado("");
      setCantidad(0);
      obtenerMobiliario();

    } catch (error) {
      console.error("Error al guardar:", error);
    }
  };

  // Eliminar Mobiliario
  const eliminarMobiliario = async (id: string) => {
    try {
      const token = await getToken();

      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      obtenerMobiliario();

    } catch (error) {
      console.error("Error al eliminar mobiliario:", error);
    }
  };


  // Cargar datos en el formulario al editar
  const editarMobiliario = (mobiliario: Mobiliario) => {
    setEditando(mobiliario.id);
    setNombre(mobiliario.nombre);
    setEstado(mobiliario.estado);
    setCantidad(mobiliario.cantidad);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Gestión de Mobiliario</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {/* Formulario */}
        <IonItem>
          <IonLabel position="stacked">Nombre</IonLabel>
          <IonInput
            value={nombre}
            onIonChange={(e) => setNombre(e.detail.value!)}
            placeholder="Ej. Pala"
          />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Estado</IonLabel>
          <IonInput
            value={estado}
            onIonChange={(e) => setEstado(e.detail.value!)}
            placeholder="Ej. Buena"
          />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Cantidad</IonLabel>
          <IonInput
            type="number"
            value={cantidad}
            onIonChange={e => {
              const valor = e.detail.value;
              if (typeof valor !== "string" || valor === ""){
                setCantidad(0);
                return;
              }
              setCantidad(parseInt(valor, 10))
            }}
          />
        </IonItem>

        <IonButton expand="block" onClick={guardarMobiliario}>
          {editando ? "Actualizar Mobiliario" : "Agregar Mobiliario"}
        </IonButton>

        {/* Lista */}
        <IonList>
          {mobiliario.length > 0 ? (
            mobiliario.map((mobiliario) => (
              <IonItem key={mobiliario.id}>
                <IonLabel>
                  <h2>{mobiliario.nombre}</h2>
                  <p>Estado: {mobiliario.estado}</p>
                  <p>Cantidad: {mobiliario.cantidad}</p>
                </IonLabel>
                <IonButton onClick={() => editarMobiliario(mobiliario)}>Editar</IonButton>
                <IonButton color="danger" onClick={() => eliminarMobiliario(mobiliario.id)}>
                  Eliminar
                </IonButton>
              </IonItem>
            ))
          ) : (
            <p>No hay mobiliario registrado.</p>
          )}
        </IonList>
      </IonContent>
    </IonPage>
  );
}
export default Mobiliarios;
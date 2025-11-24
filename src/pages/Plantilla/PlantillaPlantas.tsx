//Pagina Plantilla de Plantas con Firebase Auth + Sanitización + Token
import { useEffect, useState } from "react";
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonList, IonItem, IonLabel, IonButton, IonInput
} from "@ionic/react";
import { getAuth } from "firebase/auth";

const API_URL = "http://127.0.0.1:5001/imk2-3c2db/us-central1/api/Plantas";

//Limpiar el texto para evitar inyecciones de codigo
const cleanText = (text: string) =>
  text.replace(/<[^>]*>?/gm, "").replace(/['"$;]/g, "").trim();

interface Planta {
  id: string;
  nombre: string;
  estado: string;
  cantidad: number;
}


const Plantas: React.FC = () => {
  const [plantas, setPlantas] = useState<Planta[]>([]);
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


  // Obtener plantas
  const obtenerPlantas = async () => {
    try {
      const token = await getToken();
      if (!token) {
        console.warn("No hay token, usuario no autenticado");
        return;
      }
      const res = await fetch(API_URL, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setPlantas(await res.json());

    } catch (err) {
      console.error("Error al obtener plantas:", err);
    }
  };

  useEffect(() => {
    obtenerPlantas();
  }, []);

  // Guardar o actualizar
  const guardarPlanta = async () => {
    if (!nombre || !estado || cantidad <= 0) return;

    const token = await getToken();

    const nuevaPlanta = {
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
        body: JSON.stringify(nuevaPlanta),
      });

      setEditando(null);
      setNombre("");
      setEstado("");
      setCantidad(0);
      obtenerPlantas();

    } catch (error) {
      console.error("Error al guardar:", error);
    }
  };

  // Eliminar
  const eliminarPlanta = async (id: string) => {
    try {
      const token = await getToken();

      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      obtenerPlantas();

    } catch (error) {
      console.error("Error al eliminar planta:", error);
    }
  };

  // Cargar datos para edición
  const editarPlanta = (planta: Planta) => {
    setEditando(planta.id);
    setNombre(planta.nombre);
    setEstado(planta.estado);
    setCantidad(planta.cantidad);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Gestión de Plantas</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">

        <IonItem>
          <IonLabel position="stacked">Nombre</IonLabel>
          <IonInput value={nombre} onIonChange={e => setNombre(e.detail.value!)} />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Estado</IonLabel>
          <IonInput value={estado} onIonChange={e => setEstado(e.detail.value!)} />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Cantidad</IonLabel>
          <IonInput
            type="number"
            value={cantidad}
            onIonChange={e => {
              const valor = e.detail.value;
              // Asegurarse de que valor es una cadena antes de llamar a parseInt
              if (typeof valor !== "string" || valor === "") {
                setCantidad(0);
                return;
              }
              setCantidad(parseInt(valor, 10));
            }}
          />
        </IonItem>
        <IonButton expand="block" onClick={guardarPlanta}>
          {editando ? "Actualizar" : "Agregar"}
        </IonButton>

        {/* Lista */}
        <IonList>
          {plantas.length > 0 ? (
            plantas.map((planta) => (
              <IonItem key={planta.id}>
                <IonLabel>
                  <h2>{planta.nombre}</h2>
                  <p>Estado: {planta.estado}</p>
                  <p>Cantidad: {planta.cantidad}</p>
                </IonLabel>

                <IonButton onClick={() => editarPlanta(planta)}>Editar</IonButton>
                <IonButton color="danger" onClick={() => eliminarPlanta(planta.id)}>
                  Eliminar
                </IonButton>
              </IonItem>
            ))
          ) : (
            <p>No hay plantas registradas.</p>
          )}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Plantas;
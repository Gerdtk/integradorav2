//Pagina Plantilla de Plantas (es un backup temporal no hacer mucho caso, puede borrarse sin problema xd).
import { useEffect, useState } from "react";
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonList, IonItem, IonLabel, IonButton, IonInput
} from "@ionic/react";

const API_URL = "http://127.0.0.1:5001/imk2-3c2db/us-central1/api/Plantas";

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

  // Obtener plantas
  const obtenerPlantas = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setPlantas(data);
    } catch (err) {
      console.error("Error al obtener plantas:", err);
    }
  };

  useEffect(() => {
    obtenerPlantas();
  }, []);

  // Agregar o actualizar planta
  const guardarPlanta = async () => {
    if (!nombre || !estado || cantidad <= 0) return;

    const nuevaPlanta = { nombre, estado, cantidad, usuario: "Sistema" };

    try {
      if (editando) {
        await fetch(`${API_URL}/${editando}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(nuevaPlanta),
        });
        setEditando(null);
        setNombre("");
        setEstado("");
        setCantidad(0);
      } else {
        await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(nuevaPlanta),
        });
      }

      setNombre("");
      setEstado("");
      setCantidad(0);
      obtenerPlantas();
    } catch (error) {
      console.error("Error al guardar planta:", error);
    }
  };

  // Eliminar planta
  const eliminarPlanta = async (id: string, nombrePlanta: string) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: nombrePlanta,
          usuario: "Sistema"
        })
      });

      obtenerPlantas();
    } catch (error) {
      console.error("Error al eliminar planta:", error);
    }
  };


  // Cargar datos en el formulario al editar
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
        {/* Formulario */}
        <IonItem>
          <IonLabel position="stacked">Nombre</IonLabel>
          <IonInput
            value={nombre}
            onIonChange={(e) => setNombre(e.detail.value!)}
            placeholder="Ej. Helecho"
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
            onIonChange={(e) => setCantidad(Number(e.detail.value!))}
          />
        </IonItem>

        <IonButton expand="block" onClick={guardarPlanta}>
          {editando ? "Actualizar Planta" : "Agregar Planta"}
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
                <IonButton color="danger" onClick={() => eliminarPlanta(planta.id, planta.nombre)}>
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

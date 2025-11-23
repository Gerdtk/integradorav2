//Pagina Plantilla de Mobiliario (es un backup temporal no hacer mucho caso, puede borrarse sin problema xd).
//import { IonIcon, IonCol, IonRow } from '@ionic/react';
//import { logOutOutline, } from 'ionicons/icons';
import './Mobiliario.css';
import { useEffect, useState } from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonList, IonItem, IonLabel, IonButton, IonInput
} from "@ionic/react";

const API_URL = "http://127.0.0.1:5001/imk2-3c2db/us-central1/api/Mobiliario";

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

  // Obtener Mobiliario
  const obtenerMobiliario = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setMobiliario(data);
    } catch (err) {
      console.error("Error al obtener mobiliario:", err);
    }
  };

  useEffect(() => {
    obtenerMobiliario();
  }, []);

  // Agregar o actualizar planta
  const guardarMobiliario = async () => {
    if (!nombre || !estado || cantidad <= 0) return;

    const nuevoMobiliario = { nombre, estado, cantidad, usuario: "Sistema" };

    try {
      if (editando) {
        await fetch(`${API_URL}/${editando}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(nuevoMobiliario),
        });
        setEditando(null);
        setNombre("");
        setEstado("");
        setCantidad(0);
      } else {
        await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(nuevoMobiliario),
        });
      }

      setNombre("");
      setEstado("");
      setCantidad(0);
      obtenerMobiliario();
    } catch (error) {
      console.error("Error al guardar mobiliario:", error);
    }
  };

  // Eliminar planta
  const eliminarMobiliario = async (id: string, nombreMobiliario: string) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: nombreMobiliario,
          usuario: "Sistema"
        })
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
            onIonChange={(e) => setCantidad(Number(e.detail.value!))}
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
                <IonButton color="danger" onClick={() => eliminarMobiliario(mobiliario.id, mobiliario.nombre)}>
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
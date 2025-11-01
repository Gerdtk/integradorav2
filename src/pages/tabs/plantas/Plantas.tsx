//todo esto me lo dio chat de ejemplo para que se vea que si muestra las plantas dentro de Firestore
import { useEffect, useState } from "react";
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel } from "@ionic/react";

const API_URL = "http://127.0.0.1:5001/integradora2-4b395/us-central1/api/PlantasGeneral";

interface Planta {
  id: string;
  nombre: string;
  tipo: string;
}

const Plantas: React.FC = () => {
  const [plantas, setPlantas] = useState<Planta[]>([]);

  useEffect(() => {
    const obtenerPlantas = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        setPlantas(data);
      } catch (err) {
        console.error("Error al obtener plantas:", err);
      }
    };

    obtenerPlantas();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Listado de plantas</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonList>
          {plantas.length > 0 ? (
            plantas.map((planta) => (
              <IonItem key={planta.id}>
                <IonLabel>
                  <h2>{planta.nombre}</h2>
                  <p>{planta.tipo}</p>
                </IonLabel>
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
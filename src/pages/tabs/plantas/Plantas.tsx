<<<<<<< HEAD
import { useEffect, useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonIcon,
  IonTextarea,
  IonInput,
} from "@ionic/react";
import { logOutOutline, ellipsisVertical } from "ionicons/icons";
import "./Plantas.css";

const API_URL =
  "http://127.0.0.1:5001/integradora2-4b395/us-central1/api/PlantasGeneral";
=======
//todo esto me lo dio chat de ejemplo para que se vea que si muestra las plantas dentro de Firestore
import { useEffect, useState } from "react";
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonButton, IonIcon} from "@ionic/react";
import { logOutOutline} from 'ionicons/icons'; 
import './Plantas.css';

const API_URL = "http://127.0.0.1:5001/integradora2-4b395/us-central1/api/PlantasGeneral";
>>>>>>> 393abd68a4419fd29cddc12ab28ebe56679db230

interface Planta {
  id: string;
  nombre: string;
  tipo: string;
<<<<<<< HEAD
  estado?: string;
  fechaIngreso?: string;
=======
>>>>>>> 393abd68a4419fd29cddc12ab28ebe56679db230
}

const Plantas: React.FC = () => {
  const [plantas, setPlantas] = useState<Planta[]>([]);
<<<<<<< HEAD
  const [fechaApp, setFechaApp] = useState<string>("");
  const [nombreSel, setNombreSel] = useState<string>("--");
  const[showForm, setShowForm] = useState(false);

  // Obtener listado desde el backend
=======

>>>>>>> 393abd68a4419fd29cddc12ab28ebe56679db230
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
<<<<<<< HEAD
    obtenerPlantas();

    // Fecha actual
    const fechaActual = new Date();
    const formato = fechaActual.toLocaleString("es-MX", {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
    setFechaApp(formato);
=======

    obtenerPlantas();
>>>>>>> 393abd68a4419fd29cddc12ab28ebe56679db230
  }, []);

  return (
    <IonPage>
<<<<<<< HEAD
      {/* === Botón Salir === */}
      <IonButton routerLink="./Home" className="btnE">
        <IonIcon icon={logOutOutline}></IonIcon>
      </IonButton>

      {/* === Encabezado === */}
      <IonHeader>
        <IonToolbar>
          <IonTitle>Panel de Plantas</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="vista-plantas">
        <IonGrid>
          <IonRow>
            {/* === Columna Izquierda: Agregar Nueva Planta === */}
            <IonCol size="3" className="col-agregar">
               <h2>Agregar nueva planta</h2>
              <div className={`toggle-triangulo ${showForm ? "activo" : ""}`}
              onClick={()=> setShowForm(!showForm)}></div>
              {showForm && (
              <form className="form-planta">
                <IonInput label="Nombre" labelPlacement="stacked" placeholder="Ej. Lavanda" />
                <IonInput label="Tipo" labelPlacement="stacked" placeholder="Interior / Exterior" />
                <IonButton expand="block" color="success">
                  Guardar
                </IonButton>
              </form>
              )}
            </IonCol>

            {/* === Columna Central === */}
            <IonCol size="6" className="col-central">
              {/* Nombre Planta + Fecha */}
              <IonRow className="fila-header">
                <IonCol size="7">
                  <h3 className="nombre-planta">{nombreSel}</h3>
                </IonCol>
                <IonCol size="5" className="fecha-app">
                  <p>Fecha app: {fechaApp}</p>
                </IonCol>
              </IonRow>

              {/* Asset de humedad */}
              <IonRow className="fila-asset" justify-content="center">
              
                  <div className="asset-humedad">
                    <p>Asset de la planta respecto a su humedad</p>
                    {/* Aquí irá la animación o gráfico dinámico */}
                  </div>
              
              </IonRow>

              {/* Comentarios o recordatorios */}
              <IonRow className="fila-comentarios" justify-content="center">
                  <h4>Comentarios o recordatorios</h4><br/>

                  <IonTextarea
                    placeholder="Escribe una nota o recordatorio..."
                    autoGrow={true}
                  ></IonTextarea>
                
              </IonRow>
            </IonCol>

            {/* === Columna Derecha: Listado de plantas === */}
            <IonCol size="3" className="col-listado">
              <h2>Listado de plantas</h2>
              <IonList>
                {plantas.length > 0 ? (
                  plantas.map((planta) => (
                    <IonItem key={planta.id} button onClick={() => setNombreSel(planta.nombre)}>
                      <IonLabel>
                        <h3>{planta.nombre}</h3>
                        <p>
                          {planta.estado || planta.tipo} | {planta.fechaIngreso || "—"}
                        </p>
                      </IonLabel>
                      <IonButton fill="clear" slot="end">
                        <IonIcon icon={ellipsisVertical} />
                      </IonButton>
                    </IonItem>
                  ))
                ) : (
                  <p>No hay plantas registradas.</p>
                )}
              </IonList>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Plantas;
=======
      <IonButton routerLink='./Home' className='btnE'><IonIcon icon={logOutOutline}></IonIcon></IonButton>
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
>>>>>>> 393abd68a4419fd29cddc12ab28ebe56679db230

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

//esta es la API correcta de la base de datos xd
const API_URL =
  "http://127.0.0.1:5001/imk2-3c2db/us-central1/api/Plantas";

interface Planta {
  id: string;
  nombre: string;
  tipo: string;
  estado?: string;
  fechaIngreso?: string;
}

const Plantas: React.FC = () => {
  const [plantas, setPlantas] = useState<Planta[]>([]);
  const [fechaApp, setFechaApp] = useState<string>("");
  const [nombreSel, setNombreSel] = useState<string>("--");
  const[showForm, setShowForm] = useState(false);

  // Obtener listado desde el backend
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
  }, []);

  return (
    <IonPage>
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

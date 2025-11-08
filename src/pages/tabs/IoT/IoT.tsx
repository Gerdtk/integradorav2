import { IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonIcon,
  IonText,IonPage, IonHeader } from '@ionic/react';
import { logOutOutline, waterOutline, thermometerOutline, bulbOutline} from 'ionicons/icons'; 
import './IoT.css'; 



function Iot() {
  return (
    <IonPage>   
      <IonButton routerLink='./Home' className='btnE'><IonIcon icon={logOutOutline}></IonIcon></IonButton>
      <IonContent fullscreen>

        <IonHeader className="iot-header" translucent={true}>
          <div className="header-title">
           Planta: Orquídea Blanca
          </div>
        </IonHeader>

        <IonGrid className="iot-grid">
        {/* === HUMEDAD === */}
        <IonRow className="iot-row">
          <IonCol size="2" className="iot-icon">
            <IonIcon icon={waterOutline} />
          </IonCol>
          <IonCol size="10" className="iot-display">
            <IonText>Humedad: 72%</IonText>
          </IonCol>
        </IonRow>

        {/* === TEMPERATURA === */}
        <IonRow className="iot-row">
          <IonCol size="2" className="iot-icon">
            <IonIcon icon={thermometerOutline} />
          </IonCol>
          <IonCol size="10" className="iot-display">
            <IonText>Temperatura: 24°C</IonText>
          </IonCol>
        </IonRow>

        {/* === ILUMINACIÓN === */}
        <IonRow className="iot-row">
          <IonCol size="2" className="iot-icon">
            <IonIcon icon={bulbOutline} />
          </IonCol>
          <IonCol size="10" className="iot-display">
            <IonButton
              expand="block"
              className="light-btn"
            >
              Encender Luces
            </IonButton>
          </IonCol>
        </IonRow>
      </IonGrid>
        
        
      </IonContent>
    </IonPage>
  );
}
export default Iot;   
<<<<<<< HEAD
import { IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonIcon,
  IonText,IonPage, IonHeader } from '@ionic/react';
import { logOutOutline, waterOutline, thermometerOutline, bulbOutline} from 'ionicons/icons'; 
=======
import { IonContent, IonIcon, IonPage, IonButton } from '@ionic/react';
import { logoIonic, logOutOutline} from 'ionicons/icons'; 
>>>>>>> 393abd68a4419fd29cddc12ab28ebe56679db230
import './IoT.css'; 



<<<<<<< HEAD
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
=======
function Example() {
  return (
    <IonPage>   
      <IonContent fullscreen>
        
        <IonIcon icon={logoIonic}></IonIcon>
        <IonIcon icon={logoIonic} size="large"></IonIcon>
        <IonIcon icon={logoIonic} color="primary"></IonIcon>
        <IonIcon icon={logoIonic} size="large" color="primary"></IonIcon>
        <IonButton routerLink='./Home' className='btnE'><IonIcon icon={logOutOutline}></IonIcon></IonButton>
>>>>>>> 393abd68a4419fd29cddc12ab28ebe56679db230
        
        
      </IonContent>
    </IonPage>
  );
}
<<<<<<< HEAD
export default Iot;   
=======
export default Example;
>>>>>>> 393abd68a4419fd29cddc12ab28ebe56679db230

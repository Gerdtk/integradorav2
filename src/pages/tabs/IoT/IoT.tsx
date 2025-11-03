import { IonContent, IonIcon, IonPage, IonButton } from '@ionic/react';
import { logoIonic, logOutOutline} from 'ionicons/icons'; 
import './IoT.css'; 



function Example() {
  return (
    <IonPage>   
      <IonContent fullscreen>
        
        <IonIcon icon={logoIonic}></IonIcon>
        <IonIcon icon={logoIonic} size="large"></IonIcon>
        <IonIcon icon={logoIonic} color="primary"></IonIcon>
        <IonIcon icon={logoIonic} size="large" color="primary"></IonIcon>
        <IonButton routerLink='./Home' className='btnE'><IonIcon icon={logOutOutline}></IonIcon></IonButton>
        
        
      </IonContent>
    </IonPage>
  );
}
export default Example;
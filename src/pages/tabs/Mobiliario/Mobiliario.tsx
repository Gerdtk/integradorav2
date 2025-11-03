import { IonContent, IonIcon, IonButton } from '@ionic/react';
import { logoIonic, logOutOutline} from 'ionicons/icons';  



function Example() {
  return (
    <IonContent fullscreen>
      <IonButton routerLink='./Home' className='btnE'><IonIcon icon={logOutOutline}></IonIcon></IonButton>
      <IonIcon icon={logoIonic}></IonIcon>
      <IonIcon icon={logoIonic} size="large"></IonIcon>
      <IonIcon icon={logoIonic} color="primary"></IonIcon>
      <IonIcon icon={logoIonic} size="large" color="primary"></IonIcon>
    </IonContent>
  );
}
export default Example;
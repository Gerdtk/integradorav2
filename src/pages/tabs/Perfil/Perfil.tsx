
import React from 'react';
import { IonContent, IonIcon, IonButton, IonGrid, IonCol, IonRow } from '@ionic/react';
import { logOutOutline, person} from 'ionicons/icons';
import './Perfil.css'; 


function Example() {
  return (
    <IonContent fullscreen>

      <IonButton routerLink='./Home' className='btnE'><IonIcon icon={logOutOutline}></IonIcon></IonButton>

      <IonGrid>
  <IonRow>
    {/* Columna izquierda */}
    <IonCol size="3" className="colPerfil">
      <div className="perfilHeader">
        <IonIcon icon={person} className='iconPerfil'></IonIcon>
        <h2 className="nombrePerfil">Nombre Apellido</h2>
        <p className="rol">Rol del Usuario</p>
        
      </div>
    </IonCol>

    {/* Columna derecha */}
    <IonCol size="8" className="colInfo">
      <div className="infoHeader">
        <h3 className="tituloInfo">Información Adicional</h3>
        <p className="detallesInfo">formita</p>
      </div>

      {/* Bloque separado: plantitas */}
      <div className="plantitas">
        <div className="circuloVerde">d</div>
        <div className="circuloRojo">f</div>
        <div className="circuloAmarillo">g</div>
        <div className="circuloAzul">h</div>
        <div className="circuloNaranja">j</div>
      </div>

      <p className="infoExtra">Información sobre el usuario</p>
    </IonCol>

    <IonCol size="12" className="colVacia">
      {/* Espacio vacío para separación */}
    </IonCol>
  </IonRow>
</IonGrid>

    </IonContent>
  );
}
export default Example;
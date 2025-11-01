import React from 'react';
import {IonPage, IonContent  } from '@ionic/react';
import './Home.css';

function Example() {
  return (
     <IonPage>
      <IonContent fullscreen>
        <div className="main-container">
          <div className="avatar-space">
            {/* aquí irá el avatar */}
          </div>

          <div className="button-grid">
            <button className="btn uno">UNO</button>
            <button className="btn dos">DOS</button>
            <button className="btn tres">TRES</button>
            <button className="btn cuatro">CUATRO</button>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}
export default Example;
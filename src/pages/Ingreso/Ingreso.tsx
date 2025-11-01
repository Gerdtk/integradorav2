import { useState } from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonList, IonItem, IonInput, IonButton, IonLoading, IonToast
} from '@ionic/react';
import { useIonRouter } from '@ionic/react';
<<<<<<< HEAD
import "./Ingreso.css";
=======
>>>>>>> 758f91163bd843217a7092f6fcdaeec7d9ab6784
import {signInWithEmailAndPassword} from 'firebase/auth';
//---------------------//

import { auth} from '../../lib/firebase';

const Ingreso: React.FC = () =>{ // esto es ingreso, tengo que hacer un useEstate?

const [correo, setCorreo] =  useState('');
const [password, setPassword] = useState('');
const [busy, setBusy] = useState(false);
const [toast, setToast] = useState<{open:boolean; msg:string}>({open:false, msg:''});
const ionRouter = useIonRouter();

const handleLogin = async () =>{
  if(!correo || !password){
    setToast({open:true, msg:'Completa el campo'}); return;
  }
  setBusy(true);
  try{
    await signInWithEmailAndPassword(auth, correo, password);
    //
    setToast({open:true, msg:'ingreso exitoso'});
    ionRouter.push('/tab2', 'forward', 'replace');

    setCorreo('');
    setPassword('');
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  catch (e:any){
    const msg = e?.message || 'error';
    setToast({open:true, msg});
  } finally {
    setBusy(false);
  }
};

//-------------------//
return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Ingreso </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonList>
          <IonItem>
            <IonInput
              label="Correo"
              labelPlacement="stacked"
              type="email"
              placeholder="email@domain.com"
              value={correo}
              onIonChange={e => setCorreo(e.detail.value!)}
              required
            />
          </IonItem>

          <IonItem>
            <IonInput
              label="Contraseña"
              labelPlacement="stacked"
              type="password"
              value={password}
              onIonChange={e => setPassword(e.detail.value!)}
              required
            />
          </IonItem>
        </IonList>

        <IonButton expand="block" className="ion-margin-top" onClick={handleLogin}>
          Ingresa a tu perfil
        </IonButton>

        <IonLoading isOpen={busy} message="Creando usuario..." />
        <IonToast isOpen={toast.open} message={toast.msg} duration={2200}
                  onDidDismiss={() => setToast({...toast, open:false})}/>
      </IonContent>
    </IonPage>
  );
};

export default Ingreso;
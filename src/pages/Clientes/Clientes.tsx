import { useState } from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonList, IonItem, IonInput, IonButton, IonLoading, IonToast
} from '@ionic/react';
import { useIonRouter } from '@ionic/react';
import './Clientes.css';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../../lib/firebase';

const Clientes: React.FC = () => {
  const [usuario, setUsuario] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState<{open:boolean; msg:string}>({open:false, msg:''});
  const ionRouter = useIonRouter();

  const handleRegister = async () => {
    if (!usuario || !correo || !password) {
      setToast({open:true, msg:'Completa todos los campos'}); return;
    }
    setBusy(true);
    try {
      // 1) Crea usuario en Auth
      const cred = await createUserWithEmailAndPassword(auth, correo, password);

      // 2) Opcional: nombre para display
      await updateProfile(cred.user, { displayName: usuario });

      // 3) Guarda perfil en Firestore (colección clientes, doc = uid)
      await setDoc(doc(db, 'clientes', cred.user.uid), {
        uid: cred.user.uid,
        usuario,
        correo,
        creadoEn: serverTimestamp(),
        rol: 'cliente'
      });

      setToast({open:true, msg:'Registro exitoso'});
      // 4) Navega a la app (tabs) o dashboard
      ionRouter.push('/ingreso', 'forward', 'replace'); // ajusta ruta destino
    }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catch (e:any) {
      const msg = e?.message?.toString?.() || 'Error al registrar';
      setToast({open:true, msg});
    } finally {
      setBusy(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Registro</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonList>
          <IonItem>
            <IonInput
              label="Usuario"
              labelPlacement="stacked"
              placeholder="Ingresa tu usuario"
              value={usuario}
              onIonChange={e => setUsuario(e.detail.value!)}
              required
            />
          </IonItem>

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

        <IonButton expand="block" className="ion-margin-top" onClick={handleRegister}>
          Crear cuenta
        </IonButton>

        <IonLoading isOpen={busy} message="Creando usuario..." />
        <IonToast isOpen={toast.open} message={toast.msg} duration={2200}
                  onDidDismiss={() => setToast({...toast, open:false})}/>
      </IonContent>
    </IonPage>
  );
};

export default Clientes;

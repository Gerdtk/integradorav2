import { Redirect, Switch, useLocation } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,

} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { person, settings, leaf, hammer } from 'ionicons/icons';

import Perfil from './pages/tabs/Perfil/Perfil';
import Home from './pages/tabs/home/Home';
import Plantas from './pages/tabs/plantas/Plantas';
import Clientes from './pages/Clientes/Clientes';
import Ingreso from './pages/Ingreso/Ingreso';
import Mobiliario from './pages/tabs/Mobiliario/Mobiliario';
import IoT from './pages/tabs/IoT/IoT';

//AuthGuard para proteger las rutas y Reverse para mantener al usuario no logeado en Ingreso
import AuthGuard from './guards/AuthGuard';
import ReverseAuthGuard from './guards/ReverseAuthGuard';

//Imports para verificar si el usuarios esta logeado lo rediriga a home
import { AuthProvider, useAuth } from "./context/AuthContext";


/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';
/* Basic CSS */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
/* Optional utils */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Dark mode (system) */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const AppContent: React.FC = () => {
  const { user } = useAuth();

  const location = useLocation();
  const path = location.pathname.toLowerCase();

  const ShowTab = !user && (path === "/clientes" || path === "/Ingreso");
  const Tabtwo = user && (
    path === "/Home" ||
    path === "/Perfil" ||
    path === "/plantas" ||
    path === "/Mobiliario" ||
    path === "/IoT"
  );

  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Switch>

              {/* 🔓 Ruta pública */}
              <ReverseAuthGuard path="/Ingreso" component={Ingreso} exact />

              {/* 🔒 Rutas protegidas */}
              <AuthGuard path="/Home" component={Home} exact />
              <AuthGuard path="/Perfil" component={Perfil} exact />
              <AuthGuard path="/plantas" component={Plantas} exact />
              <AuthGuard path="/clientes" component={Clientes} exact />
              <AuthGuard path="/Mobiliario" component={Mobiliario} exact />
              <AuthGuard path="/IoT" component={IoT} exact />

              {/* 🔄 Redirección */}
              <Redirect exact from="/" to="/Ingreso" />
            </Switch>

          </IonRouterOutlet>

          {ShowTab && (
            <IonTabBar slot="bottom">
              <IonTabButton tab="ingreso" href="/ingreso">
                <IonIcon icon={person} />
                <IonLabel>Ingreso</IonLabel>
              </IonTabButton>

              <IonTabButton tab="clientes" href="/clientes">
                <IonIcon icon={settings} />
                <IonLabel>Registro</IonLabel>
              </IonTabButton>
            </IonTabBar>
          )};
          {Tabtwo && (
            <IonTabBar slot="bottom" className='semiCirculo'>
              <IonTabButton tab="home" className='btn' href="/Plantas">
                <IonIcon icon={leaf} />
                <IonLabel>Plantas</IonLabel>
              </IonTabButton>
              <IonTabButton tab='Mobiliario' className='btn' href='/Mobiliario'>
                <IonIcon icon={hammer} />
                <IonLabel>Mobiliario</IonLabel>
              </IonTabButton>
              <IonTabButton tab='IoT' className='btn' href='/IoT'>
                <IonIcon icon={settings} />
                <IonLabel>IoT</IonLabel>
              </IonTabButton>
              <IonTabButton tab="perfil" className='btn' href="/Perfil">
                <IonIcon icon={person} />
                <IonLabel>Perfil</IonLabel>
              </IonTabButton>
            </IonTabBar>
          )};
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

const App: React.FC = () => {
  {/*La Ia me dijo que esto esta turbo ilegal aca bien ilegal que no se podia repetir dos IonApp y IonReactRouter*/ }
  return (
    <IonApp>
      <AuthProvider>
        <IonReactRouter>
          <AppContent />
        </IonReactRouter>
      </AuthProvider>
    </IonApp>
  );
};

export default App;

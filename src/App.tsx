import { Route, Redirect, Switch, useLocation} from 'react-router-dom';
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
import { person, settings, leaf,hammer } from 'ionicons/icons';

import Perfil from './pages/tabs/Perfil/Perfil';
import Home from './pages/tabs/home/Home';
import Plantas from './pages/tabs/plantas/Plantas';
import Clientes from './pages/Clientes/Clientes';
import Ingreso from './pages/Ingreso/Ingreso';
import Mobiliario from './pages/tabs/Mobiliario/Mobiliario';
//import IoT from './pages/tabs/IoT/IoT';

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

  const location = useLocation();
  const path = location.pathname.toLowerCase();

  const showIngresoTabs = ['/Clientes', '/Ingreso'].includes(path);
  const showMainTabs = ['/Home', '/Pefil', '/plantas', '/Mobiliario', '/Iot'].includes(path);

  const ShowTab = location.pathname === '/clientes' || location.pathname === '/Ingreso'; 
  const Tabtwo = location.pathname === '/Home' || location.pathname === '/Perfil' || location.pathname === '/plantas' || location.pathname === '/Mobiliario' || location.pathname === '/IoT';
  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Switch>
              <Route path="/Perfil" component={Perfil} exact />
              <Route path="/Home" component={Home} exact />
              <Route path="/plantas" component={Plantas} exact />
              <Route path="/clientes" component={Clientes} exact />
              <Route path="/Mobiliario" component={Mobiliario} exact/>
              <Route path="/IoT" component={IoT} exact/>
              <Route path="/Ingreso" component={Ingreso} exact/>
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

const App: React.FC = () =>{
  return(
    <IonApp>
      <IonReactRouter>
        <AppContent/>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;

import { Route, Redirect, Switch } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, square, triangle, people } from 'ionicons/icons';

import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';
import Clientes from './pages/Clientes/Clientes';
import Ingreso from './pages/Ingreso/Ingreso';
import PlantasPage from './pages/Plantas/PlantasPage';

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

const App: React.FC = () => {
  // Si quieres empujar programáticamente:
  // const ionRouter = useIonRouter();
  // useEffect(() => { ionRouter.push('/clientes', 'forward', 'replace'); }, []);

  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Switch>
              <Route path="/tab1" component={Tab1} exact />
              <Route path="/tab2" component={Tab2} exact />
              <Route path="/tab3" component={Tab3} exact />
              <Route path="/clientes" component={Clientes} exact />
              <Route path="/Ingreso" component={Ingreso} exact />
              <Route path="/plantas" component={PlantasPage} exact />
              <Redirect exact from="/" to="/clientes" />
            </Switch>
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="Registro" href="/clientes">
              <IonIcon icon={people} />
              <IonLabel>Clientes</IonLabel>
            </IonTabButton>
            <IonTabButton tab="Ingreso" href="/Ingreso">
              <IonIcon icon={people} />
              <IonLabel>Ingreso</IonLabel>
            </IonTabButton>
            <IonTabButton tab="Plantas" href="/plantas">
              <IonIcon icon={triangle} />
              <IonLabel>Plantas</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;

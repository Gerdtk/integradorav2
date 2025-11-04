import { IonContent, IonIcon, IonButton, IonCol, IonRow } from '@ionic/react';
import { logoIonic, logOutOutline,} from 'ionicons/icons';  



function Example() {
  return (
    <IonContent fullscreen>
      <IonButton routerLink='./Home' className='btnE'><IonIcon icon={logOutOutline}></IonIcon></IonButton>
    <IonRow>
      <IonCol size="3" className='colNuevo'>
        <form>
          <label>Objeto</label>
          <input type="text" name="Objeto" />
          <br />
          <label>Cantidad: </label>
          <input type="number" name="Cantidad" />
          <br />
          <label>Precio: </label>
          <input type="number" name="Precio" />
        </form>
      </IonCol>

      <IonCol size="9" className='colMobi'>
        <div>
          <h1>Mobiliario</h1>
          <table>
            <thead>
              <tr>
                <th>Objeto</th>
                <th>Cantidad</th>
                <th>Precio</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </IonCol>
    </IonRow>
    </IonContent>
  );
}
export default Example;
import { IonPage, IonContent, IonIcon, IonButton, IonCol, IonRow, IonGrid, IonItem, IonLabel, IonInput } from '@ionic/react';
import { logOutOutline, chevronDown, chevronUp } from 'ionicons/icons';
import { FormEvent, useState } from 'react';
import './Mobiliario.css';

export default function NuevoObj() {
  const [showForm, setShowForm] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    console.log("Formulario enviado correctamente 🚀");
  }

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonButton routerLink="./Home" className="btnE">
          <IonIcon icon={logOutOutline}></IonIcon>
        </IonButton>

        <IonGrid>
          <IonRow>
            {/* === Columna 1–3: Formulario de nuevo objeto === */}
            <IonCol sizeMd="3" sizeSm="12">
              <div className="colNuevo">
                <h3>
                  <em>Nuevo objeto</em>
                  <IonButton
                    fill="clear"
                    size="small"
                    onClick={() => setShowForm(!showForm)}
                    className="toggleBtn"
                  >
                    <IonIcon icon={showForm ? chevronUp : chevronDown}></IonIcon>
                  </IonButton>
                </h3>

                <div className={`slideContainer ${showForm ? "open" : ""}`}>
                  <form onSubmit={handleSubmit}>
                    <IonItem>
                      <IonLabel position="floating">Objeto</IonLabel>
                      <IonInput name="objeto" type="text" required />
                    </IonItem>

                    <IonItem>
                      <IonLabel position="floating">Cantidad</IonLabel>
                      <IonInput name="cantidad" type="number" min="1" required />
                    </IonItem>

                    <IonItem>
                      <IonLabel position="floating">Precio</IonLabel>
                      <IonInput name="precio" type="number" step="0.01" required />
                    </IonItem>

                    <IonButton type="submit" className="BtnS">
                      Agregar
                    </IonButton>
                  </form>
                </div>
              </div>
            </IonCol>

            {/* === Columna 4–12: Tabla o listado de mobiliario === */}
            <IonCol sizeMd="8" sizeSm="8">
              <div className="colMobi">
                <h2>Mobiliario</h2>
              </div>
                <IonGrid>
                  <IonRow class="tabla-header">
                    <IonCol class="tabla-col"><strong>Objeto</strong></IonCol>
              
                  <IonCol class="tabla-col"><strong>Cantidad</strong></IonCol>
                    <IonCol class="tabla-col"><strong>Precio</strong></IonCol>
                  </IonRow>
                  <IonRow class="fila">
                    <IonCol>Silla</IonCol>
                    <IonCol size="auto" class="menuPlaceholder">
                      <div className="menuIcon"><span> ⋮ </span></div>
                    </IonCol>
                  </IonRow>
                </IonGrid>
              
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
}

/* 
====================================================================
 PLANIFICACIÓN V2.6.1 (PARA IMPLEMENTAR EN LA SIGUIENTE ACTUALIZACIÓN)
====================================================================

 1. MENÚ DE OPCIONES (tres puntos)
   - Reemplazar el div.menuIcon por un <IonButton> o <IonIcon> que dispare un <IonPopover> o <IonActionSheet>.
   - Este menú mostrará tres opciones:
       • 🗑️ Eliminar → remover el elemento del listado.
       • ✏️ Editar → abrir un pequeño modal con los campos del objeto seleccionados.
       • ⭐ Destacar → alterna una clase .destacada en el <IonRow> correspondiente.

 2. FUNCIÓN “DESTACAR”
   - Cuando el usuario elija “Destacar”, el <IonRow> se pintará de amarillo:
       -> Añadir/remover la clase .destacada al <IonRow>.
       -> CSS ya preparado:  background: rgba(255, 255, 0, 0.25);

 3. LISTADO DINÁMICO
   - Reemplazar las filas estáticas por un array en estado (useState):
       const [muebles, setMuebles] = useState<Mueble[]>([]);
       - Cada objeto tendrá: { id, nombre, cantidad, precio, destacado }

 4. RENDERIZADO DINÁMICO
   - map(muebles) → renderiza <IonRow> por cada item.
   - El botón “Agregar” del formulario añadirá un nuevo elemento al array.

 5. OPCIONAL (FUTURO)
   - Integrar con almacenamiento local o base de datos (Firebase / Realm).
   - Mostrar totales o estadísticas rápidas (ej. cantidad total de objetos).

====================================================================
*/

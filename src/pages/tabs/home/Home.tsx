import React, { useEffect, useState } from 'react';
import { IonContent, IonButton, IonIcon  } from '@ionic/react';
import './Home.css';
import { logOutOutline } from 'ionicons/icons';

interface TxtPlantas {
  id: number;
  common_name: string;
  scientific_name: string;
  family: string;
  txt: string;
  txt_2: string;
  txt_3: string;
  biblio: string;
  imagen: string;
  imagen_2: string;
  imagen_3: string;
}
const Home : React.FC = () =>{
  const [plantas, setPlantas] = React.useState<TxtPlantas[]>([]);
  const [indice, setIndice] = React.useState<number>(0);
  const [textoActual, setTextoActual] = React.useState<string>("");
  const [imagenActual, setImagenActual] = React.useState<string>("");
  const [visible, setVisible] = useState<boolean>(true);




  useEffect(() => {
    let intervalo: NodeJS.Timeout;

    fetch('/assets/plantas.json')
      .then((res) => res.json())
      .then((data) =>{
        setPlantas(data);
        elegirAleatorio(data[0]);

        intervalo = setInterval(() => {
          setVisible(false);
          setTimeout(() => {
            setIndice((prev) => {
              const nuevo = (prev + 1) % data.length;
              elegirAleatorio(data[nuevo]);
              return nuevo;
            });
            setVisible(true);
          }, 600);
          }, 20000);
      });
    return () => clearInterval(intervalo);
  }, []);

  const elegirAleatorio = (planta: TxtPlantas) => {
    const textos = [planta.txt, planta.txt_2, planta.txt_3];
    const imagenes = [planta.imagen, planta.imagen_2, planta.imagen_3];

    const randomtx = textos[Math.floor(Math.random() * textos.length)];
    const randomimg = imagenes[Math.floor(Math.random() * imagenes.length)];

    setTextoActual(randomtx);
    setImagenActual(randomimg);
  };

  const siguientePlanta = () => {
    if(plantas.length === 0) return;
    const nuevoIndice = (indice + 1) % plantas.length;
    setIndice(nuevoIndice);
    const planta = plantas[nuevoIndice];
    elegirAleatorio(planta);
  }

  if (plantas.length === 0) {
    return <div>Cargando...</div>;
  }
  const plantaActual = plantas[indice];
  
  return (

      <IonContent fullscreen >
        <div className={`container ${visible ? 'fade-in' : 'fade-out'}`} >
          <div className="plant-card">
            <h2 style={{ textAlign: "center" }}><b>{plantaActual.common_name}</b></h2>
            <h3><em>{plantaActual.scientific_name}</em></h3>
            <h3><b>Familia:</b><br/>{plantaActual.family}</h3>
            <h3><b>Descripción:</b></h3>
            <p >{textoActual}</p>
            </div>
          <div className="plant-image">
            <img src={imagenActual} alt={plantaActual.common_name} />
          </div>
        </div>
        <IonButton className="btnE" routerLink='/Ingreso'><IonIcon icon={logOutOutline}></IonIcon></IonButton>
      </IonContent>
  );
}
export default Home;
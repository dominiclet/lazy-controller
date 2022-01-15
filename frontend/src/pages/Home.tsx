import { IonContent, IonIcon, IonPage } from '@ionic/react';
import styles from './Home.module.css';
import { volumeHighOutline, volumeLowOutline, playForwardOutline, playBackOutline } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { io, Socket } from "socket.io-client";

const fadeIn = (elementId: string) => {
  const element = document.getElementById(elementId) as HTMLElement;
  element.style.display = "block";
}

const Home: React.FC = () => {
  const [socket, setSocket] = useState<Socket|null>();

  useEffect(() => {
    const url = process.env.REACT_APP_BACKEND_URL || "http://localhost:8080";
    console.log(url);

    if (process.env.REACT_APP_BACKEND_URL === "undefined")
      console.log("Backend URL not set, defaulting to local host");

    const socket = io(url)
    console.log(socket);

    socket.on("connect", () => {
      console.log("Socket connected");
      setSocket(socket);
      setTimeout(() => {
        (document.getElementById("pause") as HTMLElement).style.animationPlayState = "running"
      }, 500);
      setTimeout(() => fadeIn("volUp"), 2000);
      setTimeout(() => fadeIn("forward"), 2500);
      setTimeout(() => fadeIn("volDown"), 3000);
      setTimeout(() => fadeIn("backward"), 3500);
    })

    return () => {
      socket.disconnect();
    }
  }, []);

  const handlePause = () => {
    (document.getElementById("volUp") as HTMLElement).style.display = "block";
    (document.getElementById("volUp") as HTMLElement).style.opacity = "1";
    socket?.emit("pause");
  }

  const handleVolUp = () => {
    socket?.emit("vol_up");
  }

  const handleVolDown = () => {
    socket?.emit("vol_down");
  }

  const handleForward = () => {
    socket?.emit("forward");
  }
  
  const handleBackward = () => {
    socket?.emit("backward");
  }

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className={styles.background}>
          <div className={styles.buttonsContainer}>
            <IonIcon id="volUp" onClick={handleVolUp} icon={volumeHighOutline} className={styles.volumeUp} />
            <IonIcon id="volDown" onClick={handleVolDown} icon={volumeLowOutline} className={styles.volumeDown} />
            <IonIcon id="forward" onClick={handleForward} icon={playForwardOutline} className={styles.forward} />
            <IonIcon id="backward" onClick={handleBackward} icon={playBackOutline} className={styles.backward} />
            <div id="pause" onClick={handlePause} className={styles.pausePlay} />
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;

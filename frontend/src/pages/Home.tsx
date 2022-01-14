import { IonContent, IonIcon, IonPage } from '@ionic/react';
import styles from './Home.module.css';
import { volumeHighOutline, volumeLowOutline, playForwardOutline, playBackOutline } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { io, Socket } from "socket.io-client";

const Home: React.FC = () => {
  const [socket, setSocket] = useState<Socket|null>();

  useEffect(() => {
    const url = process.env.REACT_APP_BACKEND_URL || "http://localhost:6000";
    console.log(url);

    if (process.env.REACT_APP_BACKEND_URL == "undefined")
      console.log("Backend URL not set, defaulting to local host");

    const socket = io(url)
    console.log(socket);

    socket.on("connect", () => {
      console.log("Socket connected");
      setSocket(socket);
    })
  }, []);

  const handlePause = () => {
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
            <IonIcon onClick={handleVolUp} icon={volumeHighOutline} className={styles.volumeUp} />
            <IonIcon onClick={handleVolDown} icon={volumeLowOutline} className={styles.volumeDown} />
            <IonIcon onClick={handleForward} icon={playForwardOutline} className={styles.forward} />
            <IonIcon onClick={handleBackward} icon={playBackOutline} className={styles.backward} />
            <div onClick={handlePause} className={styles.pausePlay} />
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;

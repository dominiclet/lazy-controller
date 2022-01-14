import { IonContent, IonIcon, IonPage } from '@ionic/react';
import styles from './Home.module.css';
import { volumeHighOutline, volumeLowOutline, playForwardOutline, playBackOutline } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { io, Socket } from "socket.io-client";

const Home: React.FC = () => {
  const [socket, setSocket] = useState<Socket|null>();

  useEffect(() => {
    const socket = io("http://localhost:5000")

    socket.on("connect", () => {
      console.log("Socket connected");
      setSocket(socket);
    })
  }, []);

  const handlePause = () => {
    console.log("pause")
    console.log(socket);
    socket?.emit("pause");
  }

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className={styles.background}>
          <div className={styles.buttonsContainer}>
            <IonIcon icon={volumeHighOutline} className={styles.volumeUp} />
            <IonIcon icon={volumeLowOutline} className={styles.volumeDown} />
            <IonIcon icon={playForwardOutline} className={styles.forward} />
            <IonIcon icon={playBackOutline} className={styles.backward} />
            <div onClick={handlePause} className={styles.pausePlay} />
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;

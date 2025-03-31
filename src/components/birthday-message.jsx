import { useState, useEffect } from "react"
import styles from "./birthday-message.module.css"

export default function BirthdayMessage({ show }) {
  const [personalMessage, setPersonalMessage] = useState("")
  const [typingComplete, setTypingComplete] = useState(false)

  const message =
    `Has estado conmigo en todos los problemas que he tenido (que te conté). Siempre estoy muy agradecida de tenerte, así que aquí tienes un regalo para que te diviertas en casa y no pierdas el tiempo. Espero que te guste. Feliz cumpleaños, Naina ;)`

    useEffect(() => {
        if (show) {
          setTypingComplete(false);
          let currentIndex = 0;
          const typingInterval = setInterval(() => {
            if (currentIndex < message.length) {
              setPersonalMessage(message.substring(0, currentIndex + 1));
              currentIndex++;
            } else {
              clearInterval(typingInterval);
            }
          }, 30);
      
          return () => clearInterval(typingInterval);
        }
      }, [show]);   

  return (
    <div className={`${styles.messageContainer} ${typingComplete ? styles.complete : ""}`}>
      <div className={styles.messageCard}>
        <div className={styles.messageHeader}>
          <div className={styles.diamond}></div>
          <h2>Eres estúpido</h2>
          <div className={styles.diamond}></div>
        </div>
        <div className={styles.messageContent}>
          <h4>{personalMessage}</h4>
          <span className={typingComplete ? styles.cursorHidden : styles.cursor}></span>
        </div>
      </div>
    </div>
  )
}


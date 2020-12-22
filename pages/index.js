import styles from '../styles/Home.module.css'
import { useEffect } from "react"

export default function Home() {

  useEffect(() => {
    let socket = new WebSocket('ws://localhost:8000/ws/pizza/2li6b5cw2q')
    socket.onopen = function (e) {
      console.log('Connection established');
    };

    socket.onmessage = function (e) {
      console.log(e)
    };
    socket.onclose = function (e) {
      console.log('Connection closed');
    };
  }, [])

  return (
    <div className={styles.container}>
      check
    </div>
  )
}

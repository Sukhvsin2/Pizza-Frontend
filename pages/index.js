import styles from '../styles/Home.module.css'
import { useEffect } from "react"

export default function Home() {

  useEffect(() => {
    let socket = new WebSocket('ws://localhost:8000/ws/pizza/2li6b5cw2q')
    socket.onopen = function (e) {
      console.log('Connection established');
    };

    socket.onmessage = function (e) {
      var data = JSON.parse(e.data)
      var value = data.payload.progress
      console.log(data)
      // increaseProgress(value , data.payload.status)

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

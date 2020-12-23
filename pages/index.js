import styles from '../styles/Home.module.css'
import { useEffect, useState } from "react"
import axios from "axios"
import urls from "./api/config"
import { Card, CardContent, Chip } from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import IconButton from '@material-ui/core/IconButton';

export default function Home() {

  const [pizza, setPizza] = useState([])
  const [fetching, setFetching] = useState(true)

  const HomeApi = async () => {
    try {
      const res = await axios.get(urls.URL);
      const data = res.data;
      setPizza(data);
      setFetching(false)
    } catch (error) {
      console.log(error);
      setFetching(false)
    }
  }

  useEffect(() => {
    HomeApi();
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
    <div>
      <h2 className={styles.heading}>Welcome to PizzaHub</h2>
      <div className={styles.container}>
        {
          fetching ? <div>
              <Skeleton variant="text" />
              <Skeleton variant="circle" width={40} height={40} />
              <Skeleton variant="rect" width={210} height={118} />
            </div> : pizza.map((item, index) => (
            <div key={`#pizza${index}`} className={styles.box}>
              <Card>
                <img className={styles.pizzaImage} src={'http://localhost:8000' + item.image} />
                <CardContent>
                    <div className={styles.names}>{item.name}</div>
                    <div className={styles.order}>
                      <Chip label={`Price ${item.price}`} color="secondary" />
                      <IconButton>
                        <ShoppingCartIcon/>
                      </IconButton>
                    </div>
                </CardContent>
              </Card>
            </div>
          ))
        }
      </div>
    </div>
  )
}

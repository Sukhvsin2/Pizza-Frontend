import { Button, Card, CardActions, CardContent, CardHeader, FormControl, IconButton, Input, InputLabel, TextField } from '@material-ui/core'
import axios from 'axios'
import React, {useState} from 'react'
import styles from '../styles/Login.module.css'
import urls from './api/config'
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

function login() {

    const [loginAction, setLoginAction] = useState('Login')
    const [disableAction, setdisableAction] = useState(false)
    const [visible, setVisible] = useState(false)
    const [username, setUsername] = useState('')
    const [usernameCheck, setUsernameCheck] = useState(false)
    const [password, setPassword] = useState('')
    const [passwordCheck, setPasswordCheck] = useState(false)

    const LoginAPI = async () => {
        try {
            if(username == '') setUsernameCheck(true)
            if (password == '') setPasswordCheck(true)
            const data = {
                username,
                password
            }
            const res = await axios.post(urls.URL + 'api/accounts/login', data)
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className={styles.container}>
            <h2 className={styles.heading}>Welcome to PizzaHUB</h2>
            <Card className={styles.loginForm}>
                <CardHeader className={styles.loginHeader} title='Login' />
                <CardContent className={styles.loginBody}>
                    <TextField onChange={props => {
                            setUsernameCheck(false)
                            setUsername(props.target.value)
                        }} color='secondary' label='Username' />
                    {usernameCheck && <p className={styles.error}>Username can't be empty!</p>}
                    <FormControl>
                        <InputLabel color='secondary' htmlFor='standard-adornment-password'>Password</InputLabel>
                        <Input id='standard-adornment-password' type={ !visible ? 'password' : 'text'} onChange={props => {
                                setPasswordCheck(false)
                                setPassword(props.target.value)
                        }} color='secondary' label='Password' endAdornment={
                            <IconButton onClick={() => setVisible(!visible)}>
                                {visible ? <VisibilityIcon/> : <VisibilityOffIcon/>}
                                </IconButton>
                            } />
                    </FormControl>
                    {passwordCheck && <p className={styles.error}>Password can't be empty!</p>}
                </CardContent>
                <CardActions>
                    <div className={styles.loginActions}>
                        <Button onClick={LoginAPI} disabled={disableAction} color='secondary' variant='outlined'>{ loginAction }</Button>
                    </div>
                </CardActions>
            </Card>
        </div>
    )
}

export default login

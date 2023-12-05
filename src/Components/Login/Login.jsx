import { Link, useNavigate } from "react-router-dom";
import norm_style from "../normalize.module.scss"
import logo from '../../../public/logo.png'
import pic from './assets/pic.png'
import { postRequest } from "../../Interfaces/api/constants";
import { useState } from "react";

export const Login = () => {
    let navigate = useNavigate();
    const [password, setPassword] = useState()
    const [policy, setPolicy] = useState()
    const [error, setError] = useState('')

    const handleLogin = () => {
        console.log(
            {
                "policy": `${policy}`,
                "password": `${password}`
            }
        )
        postRequest('https://fd97-93-188-41-71.ngrok-free.app/sign_in',
            {
                "policy": `${policy}`,
                "password": `${password}`
            }
        ).then(
            response => {
                if (response.ok) {
                    response.json().then(res => {
                        console.log(res)
                        navigate(
                            '/online-medical'
                        )
                    })
                } else {
                    response.json().then(res => {
                        console.log(res.message)
                        setError(res.message)
                    })
                }
            })
    }

    return (
        <div className={norm_style.container}>
            <div className={norm_style.container_data}>
                <img className={norm_style.logo} src={logo} alt="logo" />
                <div className={norm_style.container_blank}>
                    <form action="url">
                        <label>Номер полиса</label>
                        <input type="text" onInput={e => setPolicy(e.target.value)}/>
                        <label>Пароль</label>
                        <input type="password" onInput={e => setPassword(e.target.value)}/>
                    </form>
                    <div className={norm_style.container_blank__links}>
                        <Link to="/registration">Зарегистрироваться</Link>
                        <Link>Забыли пароль?</Link>
                    </div>
                    <button type="button" onClick={handleLogin}>Войти</button>
                    {error != '' && <p>{error}</p>}
                </div>
                <p><b>Внимание!</b><br />Никогда не публикуйте нигде свои логины и пароли и не называйте их никому, даже «администрации сайта».</p>
            </div>
            <div className={norm_style.container_image}>
                <img src={pic} alt="pic"/>
            </div>
        </div>
    )
}
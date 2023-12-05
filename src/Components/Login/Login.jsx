import { Link, useNavigate } from "react-router-dom";
import norm_style from "../normalize.module.scss"
import logo from '../../../public/logo.png'
import pic from './assets/pic.png'

export const Login = () => {
    let navigate = useNavigate();
    const handleLogin = () => {
        navigate(
            '/online-medical'
        )
    }
    return (
        <div className={norm_style.container}>
            <div className={norm_style.container_data}>
                <img className={norm_style.logo} src={logo} alt="logo" />
                <div className={norm_style.container_blank}>
                    <form action="url">
                        <label>Номер полиса</label>
                        <input type="text" />
                        <label>Пароль</label>
                        <input type="password" />
                    </form>
                    <div className={norm_style.container_blank__links}>
                        <Link to="/registration">Зарегистрироваться</Link>
                        <Link>Забыли пароль?</Link>
                    </div>
                    <button type="button" onClick={handleLogin}>Войти</button>
                </div>
                <p><b>Внимание!</b><br />Никогда не публикуйте нигде свои логины и пароли и не называйте их никому, даже «администрации сайта».</p>
            </div>
            <div className={norm_style.container_image}>
                <img src={pic} alt="pic"/>
            </div>
        </div>
    )
}
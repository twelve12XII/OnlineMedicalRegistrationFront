import { Link, useNavigate } from "react-router-dom";
import norm_style from "../normalize.module.scss"
import logo from '../../../public/logo.png'
import pic from './assets/pic.png'
import logo_light from '../../../public/logo_light.png'
import background from '../../../public/background_1.png'

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
                <img className={norm_style.logo} src={logo_light} alt="logo" />
                <div className={norm_style.container_blank}>
                    <form action="url">
                        <label>Номер полиса</label>
                        <input id={norm_style.first} type="text"/>
                        <label>Пароль</label>
                        <input type="password" />
                    </form>
                    <div className={norm_style.container_blank__links}>
                        <Link to="/registration">Зарегистрироваться</Link>
                        <Link>Забыли пароль?</Link>
                    </div>
                    <button type="button" onClick={handleLogin}>Войти</button>
                </div>
                <p id={norm_style.def_warning}><b>Внимание!</b><br />Никогда не публикуйте нигде свои логины и пароли и не называйте их никому, даже «администрации сайта».</p>
            </div>
            <div className={norm_style.container_image}>
                <img id={norm_style.logo} src={logo_light} alt="logo"/>
            </div>
        </div>
    )
}
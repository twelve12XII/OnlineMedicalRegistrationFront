import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Modal } from '../../Interfaces/Modal/Modal'
import norm_style from "../normalize.module.scss"
import logo from '../../../public/logo.png'
import pic from './assets/pic.png'
import logo_light from '../../../public/logo_light.png'
import background from '../../../public/background_1.png'

export const SignUp = () => {

    let navigate = useNavigate();

    const handleSignup = () => {
        onClose()
        navigate(
            '/online-medical'
        )
    }
    
    const [isModal, setModal] = useState(false)
    const onClose = () => setModal(false)

    return (
        <div className={norm_style.container}>
            <div className={norm_style.container_data}>
                <img className={norm_style.logo} src={logo_light} alt="logo" />
                <div className={norm_style.container_blank}>
                    <form action="url">
                        <label>Номер полиса</label>
                        <input id={norm_style.first} type="text" />
                        <label>Серия и номер паспорта</label>
                        <input type="text" />
                    </form>
                    <div className={norm_style.container_blank__links}>
                        <Link to="/">Войти в аккаунт</Link>
                    </div>
                    <button type="button" onClick={() => setModal(true)}>Зарегистрироваться</button>
                </div>
                <p id={norm_style.def_warning}><b>Внимание!</b><br />Никогда не публикуйте нигде свои логины и пароли и не называйте их никому, даже «администрации сайта».</p>
            </div>
            <div className={norm_style.container_image}>
                <img id={norm_style.logo} src={logo_light} alt="logo"/>
            </div>
            <Modal
                visible={isModal}
                title='Придумайте пароль'
                content={
                    <>
                        <label>Пароль</label>
                        <input type="password" />
                    </>
                }
                footer={<button type="button" onClick={handleSignup}>Завершить регистрацию</button>}
                onClose={onClose}
            />
        </div>
    )
}
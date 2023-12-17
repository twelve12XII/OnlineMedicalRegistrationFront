import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Modal } from '../../Interfaces/Modal/Modal'
import norm_style from "../normalize.module.scss"
import logo from '../../../public/logo.png'
import pic from './assets/pic.png'
import { postRequestOleg } from "../../Interfaces/api/constants";

export const SignUp = () => {
    const [passport, setPassport] = useState()
    const [policy, setPolicy] = useState()
    const [password, setPassword] = useState()
    const [error, setError] = useState('')

    let navigate = useNavigate();

    const handleVerificate = () => {
        setError('')
        postRequestOleg('verify',
            {
                "passport": `${passport}`,
                "policy": `${policy}`
            }
        ).then(
            response => {
                if (response.ok) {
                    response.json().then(res => {
                        console.log(res)
                        setModal(true)
                    })
                } else {
                    response.json().then(res => {
                        console.log(res.message)
                        setError(res.message)
                    })
                }
            })
    }

    const handleSignup = () => {
        console.log(
            {
                "policy": `${policy}`,
                "password": `${password}`
            }
        )
        postRequestOleg('sign_up',
            {
                "password": `${password}`,
                "policy": `${policy}`
            }
        ).then(
            response => {
                if (response.ok) {
                    response.json().then(res => {
                        console.log(res)
                        onClose()
                        navigate(
                            '/online-medical',
                            { state: { policy } }
                        )
                    })
                } else {
                    console.log("exception " + response);
                }
            })


    }

    const [isModal, setModal] = useState(false)
    const onClose = () => setModal(false)

    return (
        <div className={norm_style.container}>
            <div className={norm_style.container_data}>
                <img className={norm_style.logo} src={logo} alt="logo" />
                <div className={norm_style.container_blank}>
                    <form action="url">
                        <label>Номер полиса</label>
                        <input type="text" onInput={e => setPolicy(e.target.value)} />
                        <label>Серия и номер паспорта</label>
                        <input type="text" onInput={e => setPassport(e.target.value)} />
                    </form>
                    <div className={norm_style.container_links}>
                        <Link to="/">Войти в аккаунт</Link>
                    </div>
                    <button type="button" onClick={handleVerificate}>Зарегистрироваться</button>
                    {error != '' && <p>{error}</p>}
                </div>
                <p><b>Внимание!</b><br />Никогда не публикуйте нигде свои логины и пароли и не называйте их никому, даже «администрации сайта».</p>
            </div>
            <div className={norm_style.container_image}>
                <img src={pic} alt="pic" />
            </div>
            <Modal
                visible={isModal}
                title='Придумайте пароль'
                content={
                    <>
                        <label>Пароль</label>
                        <input type="password" onInput={e => setPassword(e.target.value)} />
                    </>
                }
                footer={<button type="button" onClick={handleSignup}>Завершить регистрацию</button>}
                onClose={onClose}
            />
        </div>
    )
}
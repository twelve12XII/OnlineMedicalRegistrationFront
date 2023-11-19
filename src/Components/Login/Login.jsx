import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
    let navigate = useNavigate();
    const handleLogin = () => {
        navigate(
            '/online-medical'
        )
    }
    return (
        <div>
            <h2>Login</h2>
            <input type="text" placeholder="passport number" />
            <input type="password" placeholder="password" />
            <button onClick={handleLogin}>Log in</button>
            Or, <Link to="/registration">Create a new account</Link>
        </div>
    )
}
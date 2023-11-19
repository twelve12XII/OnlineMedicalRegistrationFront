import {Link, useNavigate} from "react-router-dom";

export const SignUp = () => {

    let navigate = useNavigate();
    const handleSignup = () => {
        navigate(
            '/online-medical'
        )
    }

    return(
        <div>
            <h2>Registration</h2>
            <input type="text" placeholder="passport data"/>
            <input type="text" placeholder="MHI policy number"/>
            <input type="password" placeholder="password"/>
            <button onClick={handleSignup}>Signup</button>
            Or, <Link to='/'>Login</Link>
        </div>
    )
}
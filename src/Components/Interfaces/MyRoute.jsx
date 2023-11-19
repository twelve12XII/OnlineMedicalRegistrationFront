import {BrowserRouter as Router, Route, Routes, useNavigate} from "react-router-dom";
import {Login} from "../Login/Login";
import {Online_medical} from "../Online_medical/Online_medical";
import {SignUp} from "../SignUp/SignUp"

export const  MyRoute = () => {

    return(
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<Login />}/>
                    <Route path="/online-medical" element={<Online_medical/>}/>
                    <Route path="/registration" element={<SignUp/>}/>
                    <Route path="*" element=
                        {
                            <div>
                                <h2>404. Page not found.</h2>
                            </div>
                        } />
                </Routes>
            </div>
        </Router>
    );
}
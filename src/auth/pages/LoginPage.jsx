import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext";

const innitialLoginForm = {
    username: '',
    password: ''
}

export const LoginPage = () => {

    const {handlerLogin} = useContext(AuthContext);
    const [loginForm, setLoginForm] = useState(innitialLoginForm);
    const {username, password} = loginForm;

    const onInputChange = ({ target }) => {
        const {name, value} = target;
        setLoginForm({
            ...loginForm,
            [name]: value,
        })
    }

    const onSubmit = (event) => {
        event.preventDefault();
        if (!username || !password){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Make sure you fill all the fields!'
            })
            return;
        }

        handlerLogin({username, password})
        setLoginForm(innitialLoginForm);
    }

    return(
        <div className="modal" style={ {display: "block"} } tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Login page</h5>
                </div>
                <form onSubmit={onSubmit}>
                    <div className="modal-body">
                        <input className="form-control my-3 w-75" 
                                placeholder="Username" 
                                name="username" 
                                type="text"
                                value={username} 
                                onChange={onInputChange}
                                />

                        <input className="form-control my-3 w-75" 
                                placeholder="Password" 
                                type="password"
                                name="password" 
                                value={password}
                                onChange={onInputChange}
                                />

                    </div>
                    <div className="modal-footer">
                        <button type="submit" 
                                className="btn btn-primary">
                                Login
                        </button>
                    </div>
                </form>
                </div>
            </div>
        </div>
    )
}
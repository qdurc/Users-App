import { useReducer } from "react";
import { loginReducer } from "../reducers/loginReducer";
import Swal from "sweetalert2";
import { loginUser } from "../services/authServices";
import { useNavigate } from "react-router-dom";

const initialLogin = JSON.parse(sessionStorage.getItem('login')) || {
    isAuth: false,
    username: '',
}

export const useAuth = () => {

    const [login, dispatch] = useReducer(loginReducer, initialLogin);
    const navigate = useNavigate();

    const handlerLogin = ({username, password}) => {
        const isLogin = loginUser ({username, password});

        if(isLogin){
            const user = { username: 'admin' }
            dispatch({
                type: 'login',
                payload: user
            })
            sessionStorage.setItem('login', JSON.stringify({
                isAuth: true,
                user
            }));
            navigate('/users');
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Wrong username or password!'
            })
            return;
        }
    }

    const handlerLogOut = () => {
        dispatch({
            type: 'logout'
        });
        sessionStorage.removeItem('login');
    }

    
    return {
        login,
        handlerLogOut,
        handlerLogin
    }
}
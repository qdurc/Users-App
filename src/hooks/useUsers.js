import { useReducer, useState } from "react";
import { usersReducers } from "../reducers/usersReducer";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const initialUsers = [
    {
        id: 1,
        username: "pepe",
        password: "12345",
        email: "pepe@mail.com"
    },
];

const initialUserForm = {
    id: 0,
    username: '',
    password: '',
    email: '',
}

export const useUsers = () => {

    const [users, dispatch] = useReducer(usersReducers, initialUsers);
    const [userSelected, setUserSelected] = useState(initialUserForm);
    const [visibleForm, setVisibleForm] = useState(false);
    const navigate = useNavigate();

    const handlerAddUser = (user) => {
        
        dispatch({
            type: (user.id == 0) ? "addUser" : "updateUser",
            payload: user
        });

        (user.id === 0) ? 
            Swal.fire({
                icon: 'success',
                title: 'User added',
                showConfirmButton: false,
                timer: 1000,
            })
            :
            Swal.fire({
                icon: 'success',
                title: 'User updated',
                showConfirmButton: false,
                timer: 1000,
            });

            handlerCloseForm();
            navigate('/users');
    }

    const handlerDeleteUser = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                dispatch({
                    type: 'removeUser',
                    payload: id
                });

              Swal.fire({
                icon: 'success',
                title: 'Deleted!',
                text: "User have been deleted.",
                showConfirmButton: false,
                timer: 1000,
              });
            }
          })
    }

    const handlerUserSelectedForm = (user) => {
        setVisibleForm(true);
        setUserSelected({...user});
    }

    const handlerOpenForm = () => {
        setVisibleForm(true);
    }

    const handlerCloseForm = () => {
        setVisibleForm(false);
        setUserSelected(initialUserForm);
    }

    return {
        users,
        userSelected,
        initialUserForm,
        visibleForm,
        handlerAddUser,
        handlerDeleteUser,
        handlerUserSelectedForm,
        handlerOpenForm,
        handlerCloseForm
    }
}
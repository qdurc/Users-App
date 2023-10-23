import { NavLink } from "react-router-dom"
import { UserContext } from "../context/userContext";
import { useContext } from "react";

export const UserRow = ({id, username, email}) => {

    const{handlerUserSelectedForm, handlerDeleteUser} = useContext(UserContext);

  return (
    <tr>
        <td>{id}</td>
        <td>{username}</td>
        <td>{email}</td>
        <td> 
            <button 
                type="button" 
                className="btn btn-secondary btn-sm"
                onClick={() => handlerUserSelectedForm({
                    id,
                    username,
                    email,
                })}
                >
                    Update
            </button> 
        </td>
        <td> 
            <NavLink className="btn btn-secondary btn-sm"
                    to={'/users/update/' + id}> 
                    Update route
            </NavLink>
        </td>
        <td> 
            <button 
                type="button" 
                className="btn btn-secondary btn-sm btn-danger"
                onClick={() => handlerDeleteUser(id)}>
                    Remove
            </button> 
        </td>
    </tr>
  )
}

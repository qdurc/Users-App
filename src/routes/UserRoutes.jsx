import { Route, Routes, Navigate } from "react-router-dom";
import { Navbar } from "../components/layout/Navbar";
import { UsersPage } from "../pages/UsersPage";
import { RegisterPage } from "../pages/RegisterPage";
import { useUsers } from "../hooks/useUsers";
import { UserProvider } from "../context/UserProvider";

export const UserRoutes = () => {

    return (
        <>
            <UserProvider>
                <Navbar/>
                <Routes>
                    <Route path='users' element={ <UsersPage/> } />
                    <Route path='users/register' element={ <RegisterPage/> } />
                    <Route path='users/update/:id' element={ <RegisterPage/> } />
                    <Route path='/' element={<Navigate to='/users' />} />
                </Routes>
            </UserProvider>
        </>
    );
};

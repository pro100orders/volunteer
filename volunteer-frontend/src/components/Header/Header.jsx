import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppBar, Container, Toolbar, Typography} from "@mui/material";
import {NavLink} from "react-router-dom";

import './Header.scss';
import MyModal from "../UI/Modal/MyModal";
import Profile from "../../pages/Profile/Profile";
import EditProfileForm from "../Profile/EditProfileForm";

const Header = () => {

    const roles = useSelector(state => state.auth.user.roles);

    const dispatch = useDispatch();

    const logout = () => {
        if (localStorage.getItem("token"))
            localStorage.removeItem("token");
        dispatch({type: "SET_AUTH", payload: {token: '', user: {roles: ['ROLE_GUEST']}}});
    }

    const [modalProfileEdit, setModalProfileEdit] = useState(false);

    return (
        <AppBar position="static" style={{background: "white"}}>
            <Container maxWidth="xl">
                <Toolbar sx={{display: "flex", justifyContent: "space-between"}}>
                    <div>
                        <Typography variant="h5" component="div">
                            <NavLink to={'/'} className={"header-link"}>
                                <b>Робота в тилу</b>
                            </NavLink>
                        </Typography>
                    </div>
                    <div>
                        <Typography variant="h6" component="div">
                            {(roles && roles.includes("ROLE_ADMIN")) && (
                                <>
                                    <NavLink to={'/admin'} className={"header-link"}>
                                        Адмін
                                    </NavLink>
                                </>
                            )}
                        </Typography>
                    </div>
                    <Typography variant="h6" component="div" style={{display: "flex"}}>
                        {((roles && roles.length) >= 1 && !roles.includes("ROLE_GUEST")) ?
                            (
                                <Typography variant="h6" component="div" display={"flex"}>
                                    <NavLink to='/profile' className={"header-link"}>
                                        Профіль
                                    </NavLink>
                                    <NavLink to='/' className="header-link" onClick={logout}>
                                        Вийти
                                    </NavLink>
                                    <MyModal open={modalProfileEdit}
                                             setOpen={setModalProfileEdit} children={
                                            <EditProfileForm setModalProfileEdit={setModalProfileEdit}/>
                                    }/>
                                </Typography>
                            )
                            :
                            (
                                <Typography variant="h6" component="div">
                                    <NavLink to={'/login'} className={"header-link"}>
                                        Авторизація
                                    </NavLink>
                                    <NavLink to={'/registration'} className={"header-link"}>
                                        Реєстрація
                                    </NavLink>
                                </Typography>
                            )
                        }
                    </Typography>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;
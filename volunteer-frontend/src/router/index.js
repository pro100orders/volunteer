import React, {useEffect, useState} from 'react';
import Authorization from "../pages/Authorization/Authorization";
import Profile from "../pages/Profile/Profile";
import {useSelector} from "react-redux";
import Requests from "../pages/Requests/Requests";
import RequestDetails from "../components/Requests/RequestDetails/RequestDetails";
import Admin from '../pages/Admin/Admin';

const AppRoutes = () => {

    const roles = useSelector(state => state.auth.user.roles);

    const [routes, setRoutes] = useState([]);

    useEffect(() => {
        setRoutes([
            {path: "/", component: Requests},
            {path: "/requests", component: Requests},
            {path: "/requests/:id", component: RequestDetails},
        ]);

        if (roles && roles.includes("ROLE_GUEST")) {
            const guestRoutes = [
                {path: '/login', component: Authorization, flag: true},
                {path: '/registration', component: Authorization, flag: false},
            ];

            setRoutes(routes => routes = routes.concat(guestRoutes));
        }

        if (roles && roles.includes("ROLE_USER")) {
            const userRoutes = [
                {path: "/profile", component: Profile},
            ];

            setRoutes(routes => routes = routes.concat(userRoutes));
        }

        if (roles && roles.includes("ROLE_ADMIN")) {
            const adminRoutes = [
                {path: "/admin", component: Admin},
            ];

            setRoutes(routes => routes = routes.concat(adminRoutes));
        }
    }, [roles]);

    return routes;
}

export default AppRoutes;
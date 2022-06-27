import React, {useEffect, useState} from 'react';
import $api from "../../http";
import {toastr} from "react-redux-toastr";
import {Button, Container, Typography} from "@mui/material";
import RequestsList from "../../components/Requests/RequestsList/RequestsList";
import {useNavigate, useParams} from "react-router-dom";
import {useSelector} from "react-redux";

const Profile = ({setModalProfileEdit}) => {

    const [user, setUser] = useState({});
    const [requests, setRequests] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const id = useSelector(state => state.auth.user.id);

    const params = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        $api.get('/user/' + params.id)
            .then(response => {
                setUser(response.data);
            })
            .catch(reason => {
                toastr.error("Робота в тилу", "Виникли технічні проблеми");
            });
    }, []);

    useEffect(() => {
        setLoading(true);
        $api.get('/user/' + params.id + '/requests')
            .then(response => {
                setRequests(response.data);
                setLoading(false);
            })
            .catch(reason => {
                toastr.error("Робота в тилу", "Виникли технічні проблеми");
            });
    }, []);

    if(params.id == id) {
        console.log(1);
        navigate("/profile");
    }

    return (
        <Container maxWidth="xl" sx={{marginTop: "10px", paddingTop: "10px", display: "flex"}}
                   style={{minHeight: "100vh"}}>
            <div style={{width: "70%"}}>
                <RequestsList requests={requests} isLoading={isLoading}/>
            </div>
            <div style={{marginLeft: 10}}>
                <Typography variant="h3" component="div">
                    Профіль
                </Typography>
                <Typography variant="h5" component="div">
                    Прізвище : {user.surname}
                </Typography>
                <Typography variant="h5" component="div">
                    Ім'я : {user.name}
                </Typography>
                <Typography variant="h5" component="div">
                    Пошта : {user.email}
                </Typography>
                <Typography variant="h5" component="div">
                    Номер телефону : {user.phone}
                </Typography>
                {
                    user.address &&
                    <Typography variant="h5" component="div">
                        Адресса : {user.address}
                    </Typography>
                }
                {
                    user.description &&
                    <Typography variant="h5" component="div">
                        Опис : {user.description}
                    </Typography>
                }
            </div>
        </Container>
    );
};

export default Profile;
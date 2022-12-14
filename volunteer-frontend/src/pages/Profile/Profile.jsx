import React, {useEffect, useState} from 'react';
import $api from "../../http";
import {toastr} from "react-redux-toastr";
import {Button, Container, Typography} from "@mui/material";
import RequestsList from "../../components/Requests/RequestsList/RequestsList";
import AddRequestForm from "../../components/Requests/AddRequestForm/AddRequestForm";
import MyModal from "../../components/UI/Modal/MyModal";
import EditProfileForm from "../../components/Profile/EditProfileForm";

const Profile = ({setModalProfileEdit}) => {

    const [user, setUser] = useState({});
    const [requests, setRequests] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const [open, setOpen] = useState(false);

    useEffect(() => {
        $api.get('/user')
            .then(response => {
                setUser(response.data);
            })
            .catch(reason => {
                toastr.error("Робота в тилу", "Виникли технічні проблеми");
            });
    }, []);

    useEffect(() => {
        setLoading(true);
        $api.get('/user/requests')
            .then(response => {
                setRequests(response.data);
                setLoading(false);
            })
            .catch(reason => {
                toastr.error("Робота в тилу", "Виникли технічні проблеми");
            });
    }, []);

    return (
        <Container maxWidth="xl" sx={{marginTop: "10px", paddingTop: "10px", display: "flex"}}
                   style={{minHeight: "100vh"}}>
            <div style={{width: "70%"}}>
                <RequestsList requests={requests} isLoading={isLoading}/>
            </div>
            <div style={{marginLeft: 10}}>
                <Typography variant="h3" component="div">
                    Мій профіль
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
                <div style={{marginTop: 2}}>
                    <Button variant="contained" color="primary" onClick={e => setOpen(true)}>
                        Редагувати профіль
                    </Button>
                </div>
                <MyModal open={open} setOpen={setOpen}
                         children={<EditProfileForm setOpen={setOpen}/>}/>
            </div>
        </Container>
    );
};

export default Profile;
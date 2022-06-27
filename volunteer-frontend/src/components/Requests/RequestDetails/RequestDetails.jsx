import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import $api from "../../../http";
import {Button, Container, TextField, Typography} from "@mui/material";
import {toastr} from "react-redux-toastr";
import {useSelector} from "react-redux";
import EditRequestForm from "../EditRequestForm/EditRequestForm";
import MyModal from "../../UI/Modal/MyModal";

const RequestDetails = () => {

    const [request, setRequest] = useState({});
    const [isLoading, setLoading] = useState(true);

    const params = useParams();

    const user = useSelector(state => state.auth.user);
    const roles = useSelector(state => state.auth.user.roles);

    const [open, setOpen] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        $api.get("/requests/" + params.id)
            .then((response) => {
                setRequest(response.data);
                setLoading(false);
            })
            .catch(reason => {
                toastr.error("Робота в тилу", "Виникли технічні проблеми");
            });
        ;
    }, []);

    const deleteRequest = (id) => {
        $api.delete("/requests/" + id)
            .then(response => {
                if (response.data === true) {
                    toastr.success("Робота в тилу", "Книжка успішно видалена");
                    navigate("/requests");
                }
            })
            .catch(reason => {
                toastr.error("Робота в тилу", "Виникли технічні проблеми");
            });
    }

    const [comment, setComment] = useState();
    const [comments, setComments] = useState([]);

    const sendComment = () => {
        let message = {requestId: request.id, text: comment};
        $api.post("/messages", message)
            .then(response => {
                setComments(prevState => [...prevState, response.data]);
                toastr.success("Робота в тилу", "Коментар успішно доданий");
            })
            .catch(reason => {
                toastr.error("Робота в тилу", "Виникли технічні проблеми");
            });
    }

    console.log(comments)
    return (
        <Container maxWidth="xl" sx={{marginTop: "10px", paddingTop: "10px"}} style={{minHeight: "100vh"}}>
            {
                isLoading ?
                    <div>
                        Даних немає
                    </div>
                    :
                    <div style={{display: "flex"}}>
                        <div style={{width: "70%"}}>
                            {
                                open &&
                                <MyModal open={open} setOpen={setOpen}
                                         children={<EditRequestForm request={request} setOpen={setOpen}/>}/>
                            }
                            <Typography variant="h2" component="div"
                                        style={{background: "url(https://kartinkin.net/uploads/posts/2021-07/1626333725_32-kartinkin-com-p-fon-kamuflyazh-svetlii-krasivo-33.jpg)"}}>
                                {request.title}
                            </Typography>
                            <Typography variant="h6" component="div">
                                {request.description}
                            </Typography>
                            <Typography variant="h6" component="div" style={{background: "#AAE56F"}}>
                                Адреса: {request.address}
                            </Typography>
                            <Typography variant="h6" component="div">
                                Дата публікації:
                                {
                                    " " + request.createdAt[2] + "." + request.createdAt[1] + "." + request.createdAt[0] + " " +
                                    request.createdAt[3] + ":" + request.createdAt[4] + ":" + request.createdAt[5]
                                }
                            </Typography>
                            <div>
                                {
                                    ((roles && roles.includes("ROLE_ADMIN")) || (user && user.email === request.user.email)) &&
                                    <div style={{display: "flex", marginTop: 5}}>
                                        <Button variant="contained" color="warning" onClick={() => setOpen(true)}>
                                            Редагувати
                                        </Button>
                                        <Button variant="contained" color="error"
                                                onClick={() => deleteRequest(request.id)}>
                                            Видалити
                                        </Button>
                                    </div>
                                }
                            </div>
                            <div>
                                <Typography variant="h5" component="div" style={{margin: "10px 0 10px 5px"}}>
                                    Коментарі:
                                </Typography>
                                <div>
                                    <TextField
                                        label="Коментар"
                                        multiline
                                        size="medium"
                                        margin="normal"
                                        fullWidth={true}
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                    />
                                    <Button variant="contained" color="primary"
                                            onClick={() => sendComment()}>
                                        Надіслати коментар
                                    </Button>
                                    {
                                        comments.map(comment =>
                                            <div style={{border: "1px solid black", borderRadius: 10, padding: 10, margin: 2,
                                                display: "flex", justifyContent: "space-between"}}>
                                                <div>
                                                    <div>{comment.user.surname + " " + comment.user.name}</div>
                                                    <div>{comment.text}</div>
                                                </div>
                                                <Typography variant="h6" component="div">
                                                    {
                                                        comment.sentAt[2] + "." + comment.sentAt[1] + "." + comment.sentAt[0] + " " +
                                                        comment.sentAt[3] + ":" + comment.sentAt[4] + ":" + comment.sentAt[5]
                                                    }
                                                </Typography>
                                            </div>
                                        )
                                    }
                                    {
                                        request.comments.map(comment =>
                                            <div style={{border: "1px solid black", borderRadius: 10, padding: 10, margin: 2,
                                                display: "flex", justifyContent: "space-between"}}>
                                                <div>
                                                    <div>{comment.user.surname + " " + comment.user.name}</div>
                                                    <div>{comment.text}</div>
                                                </div>
                                                <Typography variant="h6" component="div">
                                                    {
                                                        comment.sentAt[2] + "." + comment.sentAt[1] + "." + comment.sentAt[0] + " " +
                                                        comment.sentAt[3] + ":" + comment.sentAt[4] + ":" + comment.sentAt[5]
                                                    }
                                                </Typography>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                        <div style={{marginLeft: 5}}>
                            <Typography variant="h4" component="div">
                                Відгукнутися
                            </Typography>
                            <img src="https://filestore.community.support.microsoft.com/api/images/f2e55cbf-8316-4d3a-9412-ecd8194b2a72?upload=true" alt="Фотографія"/>
                            <Typography variant="h6" component="div">
                                Контактні дані:
                            </Typography>
                            <Typography variant="h6" component="div">
                                {request.user.surname + " " + request.user.name}
                            </Typography>
                            <Typography variant="h6" component="div">
                                Пошта: {request.user.email}
                            </Typography>
                            <Typography variant="h6" component="div">
                                Номер телефону: {request.user.phone}
                            </Typography>
                            <Typography variant="h6" component="div">
                                Адрес: {request.user.address}
                            </Typography>
                            <Typography variant="h6" component="div">
                                <div>Опис:</div>
                                <div>{request.user.description}</div>
                            </Typography>
                        </div>
                    </div>
            }
        </Container>
    );
};

export default RequestDetails;
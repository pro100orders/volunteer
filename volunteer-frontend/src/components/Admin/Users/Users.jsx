import React, {useEffect, useState} from 'react';
import $api from "../../../http";
import {toastr} from "react-redux-toastr";
import {Button, Typography} from "@mui/material";
import {Link} from "react-router-dom";

const Users = () => {

    const [users, setUsers] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        $api.get("/admin/users")
            .then(response => {
                setUsers(response.data);
                setLoading(false);
            })
            .catch(reason => {
                toastr.error("Робота в тилу", "Виникли технічні проблеми");
            });
    }, [])

    const toggle = (id) => {
        setLoading(true);
        $api.post("/admin/users/" + id)
            .then(response => {
                setUsers(prevState => prevState.filter(value => value.id !== response.data.id));
                setUsers(prevState => [...prevState, response.data]);
                setLoading(false);
            })
            .catch(reason => {
                toastr.error("Робота в тилу", "Виникли технічні проблеми");
            });
    }

    return (
        <div>
            {
                users.length === 0 ?
                    <Typography variant="h5" component="div">
                        Даних немає
                    </Typography>
                    :
                    <div style={{padding: 10}}>
                        {
                            users.map(user =>
                                <div style={{
                                    border: "1px solid black", borderRadius: 5, padding: 10, margin: "0 0 2px 5px",
                                    display: "flex", justifyContent: "space-between"
                                }}>
                                    <div style={{width: "10%"}}>
                                        <Link to={"/profile/" + user.id}>
                                            <div>{user.surname + " " + user.name}</div>
                                        </Link>
                                    </div>
                                    <div>{user.email}</div>
                                    <div>{user.phone}</div>
                                    <div>{user.address}</div>
                                    <div>{user.description}</div>
                                    <div>
                                        {user.enabled ?
                                            <Button variant="contained" color="error" onClick={e => toggle(user.id)}>
                                                Заблокувати
                                            </Button>
                                            :
                                            <Button variant="contained" color="success" onClick={e => toggle(user.id)}>
                                                Розблокувати
                                            </Button>
                                        }
                                    </div>
                                </div>
                            )
                        }
                    </div>
            }
        </div>
    );
};

export default Users;
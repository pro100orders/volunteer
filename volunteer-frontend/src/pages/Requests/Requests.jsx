import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import $api from "../../http";
import {toastr} from "react-redux-toastr";
import {
    Button,
    ButtonGroup,
    Container,
    FormControl,
    InputLabel,
    MenuItem,
    Pagination,
    Select,
    TextField
} from "@mui/material";
import MyModal from "../../components/UI/Modal/MyModal";
import AddRequestForm from "../../components/Requests/AddRequestForm/AddRequestForm";
import RequestsList from "../../components/Requests/RequestsList/RequestsList";

const Requests = () => {

    const roles = useSelector(state => state.auth.user.roles);

    const [requests, setRequests] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const [open, setOpen] = useState(false);

    const [search, setSearch] = useState('');
    const [sort, setSort] = useState(0);

    useEffect(() => {
        setLoading(true);
        $api.get("/requests?search=" + search + "&sort=" + sort)
            .then(response => {
                setRequests(response.data);
                setLoading(false);
            })
            .catch(reason => {
                toastr.error("Робота в тилу", "Виникли технічні проблеми");
            });
    }, [sort])

    const toSearch = () => {
        $api.get("/requests?search=" + search + "&sort=" + sort)
            .then(response => {
                setRequests(response.data);
            })
            .catch(reason => {
                toastr.error("Робота в тилу", "Виникли технічні проблеми");
            });
    }

    return (
        <Container maxWidth="xl" sx={{marginTop: "10px", paddingTop: "10px"}} style={{minHeight: "100vh"}}>
            <div style={{display: "flex", justifyContent: "space-between", marginBottom: 4}}>
                <div style={{width: "30%"}}>
                    <div>
                        <Button onClick={e => setOpen(true)} sx={{border: "1px solid blue", borderRadius: "2px"}}>
                            Додати запит
                        </Button>
                        <MyModal open={open} setOpen={setOpen}
                                 children={<AddRequestForm setRequests={setRequests} setOpen={setOpen}/>}/>
                    </div>
                </div>
                <div style={{width: "30%"}}>
                    <TextField
                        id="search"
                        label="Пошук"
                        variant="standard"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={{width: 300}}
                    />
                    <Button variant="contained" color="primary" onClick={() => toSearch()}>Пошук</Button>
                </div>
                <div style={{width: "30%"}}>
                    <ButtonGroup variant="contained">
                        <Button onClick={() => setSort(0)}>Всі</Button>
                        <Button onClick={() => setSort(1)}>Запити / Робота</Button>
                        <Button onClick={() => setSort(2)}>Моя допомога</Button>
                    </ButtonGroup>
                </div>
            </div>
            <div>
                <RequestsList requests={requests} isLoading={isLoading}/>
            </div>
        </Container>
    );
};

export default Requests;
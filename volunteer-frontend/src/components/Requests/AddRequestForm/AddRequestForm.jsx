import $api from "../../../http";
import {useState} from "react";
import {Controller, useForm, useFormState} from "react-hook-form";
import {toastr} from "react-redux-toastr";
import {Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField} from "@mui/material";

const AddRequestForm = ({setRequests, setOpen}) => {

    const {handleSubmit, control, setValue} = useForm({
        mode: 'onBlur'
    });
    const {errors} = useFormState({
        control
    });

    const [request1, setRequest1] = useState();
    const [payment, setPayment] = useState();

    const onSubmit = (request) => {
        let newrequest = {...request, payment, request1};
        $api.post("/requests", newrequest)
            .then(response => {
                setRequests(prevState => [...prevState, response.data]);
                setOpen(false);
            })
            .catch(reason => {
                toastr.error("Робота в тилу", "Виникли технічні проблеми");
            });
    };

    return (
        <div className='add-book-form' style={{width: "600px"}}>
            <form className="add-book-form__form" onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    control={control}
                    name="title"
                    render={({field}) => (
                        <TextField
                            label="Заголовок"
                            size="small"
                            margin="normal"
                            className="add-book-form__input"
                            fullWidth={true}
                            value={field.value}
                            onChange={(e) => field.onChange(e)}
                            error={!!errors.title?.message}
                            helperText={errors.title?.message}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="description"
                    render={({field}) => (
                        <TextField
                            label="Опис"
                            multiline
                            size="small"
                            margin="normal"
                            className="add-book-form__input"
                            fullWidth={true}
                            value={field.value}
                            onChange={(e) => field.onChange(e)}
                            error={!!errors.description?.message}
                            helperText={errors.description?.message}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="address"
                    render={({field}) => (
                        <TextField
                            label="Адрес"
                            multiline
                            size="small"
                            margin="normal"
                            className="add-book-form__input"
                            fullWidth={true}
                            value={field.value}
                            onChange={(e) => field.onChange(e)}
                            error={!!errors.address?.message}
                            helperText={errors.address?.message}
                        />
                    )}
                />
                <div>
                    <FormControl>
                        <FormLabel id="demo-controlled-radio-buttons-group">Тип</FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group"
                            value={request1}
                            onChange={(e) => setRequest1(e.target.value)}
                        >
                            <FormControlLabel value="true" control={<Radio/>} label="Потреба / Робота"/>
                            <FormControlLabel value="false" control={<Radio/>} label="Моя допомога"/>
                        </RadioGroup>
                    </FormControl>
                </div>
                <div>
                    <FormControl>
                        <FormLabel id="demo-controlled-radio-buttons-group">Оплата</FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group"
                            value={payment}
                            onChange={(e) => setPayment(e.target.value)}
                        >
                            <FormControlLabel value="true" control={<Radio/>} label="Оплачується"/>
                            <FormControlLabel value="false" control={<Radio/>} label="Не оплачується"/>
                        </RadioGroup>
                    </FormControl>
                </div>
                <Button
                    type="submit"
                    variant="contained"
                    fullWidth={true}
                    disableElevation={true}
                    sx={{
                        marginTop: 2
                    }}
                >
                    Додати запит
                </Button>
            </form>
        </div>
    )
        ;
};

export default AddRequestForm;
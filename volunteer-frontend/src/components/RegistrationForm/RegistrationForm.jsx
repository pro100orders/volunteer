import React from 'react';
import {Controller, useForm, useFormState} from "react-hook-form";
import {NavLink, useNavigate} from "react-router-dom";
import {Button, TextField, Typography} from "@mui/material";
import {emailValidation, passwordValidation} from "./validation";
import {toastr} from "react-redux-toastr";
import $api from "../../http";

import './RegistrationForm.scss';

const RegistrationForm = () => {

    const {handleSubmit, control, setValue, setFocus, setError} = useForm({
        mode: 'onBlur'
    });
    const {errors} = useFormState({
        control
    });

    const navigate = useNavigate();

    const onSubmit = (user) => {
        if (user.password !== user.repeat_password) {
            setValue("password", "");
            setValue("repeat_password", "");
            setError("password", {type: "custom", message: "Паролі не збігаються"});
            setError("repeat_password", {type: "custom", message: "Паролі не збігаються"});
            setFocus("password");
        } else {
            $api.post('/registration', user)
                .then(response => {
                    toastr.success('Робота в тилу', "Реєстрація успішна");
                    navigate('/login');
                })
                .catch(reason => {
                    if (reason.response.status === 400) {
                        setError('email', {type: 'custom', message: reason.response.data.error});
                    } else {
                        toastr.error("Робота в тилу", "Виникли технічні проблеми");
                    }
                });
        }
    }

    return (
        <div className='registration-form'>
            <Typography variant="h4" component="div">
                Реєстрація
            </Typography>
            <form className="registration-form__form" onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    control={control}
                    name="surname"
                    rules={{required: "Прізвище не може бути пустим"}}
                    render={({field}) => (
                        <TextField
                            label="Прізвище"
                            size="small"
                            margin="normal"
                            className="registration-form__input"
                            fullWidth={true}
                            value={field.value}
                            onChange={(e) => field.onChange(e)}
                            error={!!errors.surname?.message}
                            helperText={errors.surname?.message}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="name"
                    rules={{required: "Ім'я не може бути пустим"}}
                    render={({field}) => (
                        <TextField
                            label="Ім'я"
                            size="small"
                            margin="normal"
                            className="registration-form__input"
                            fullWidth={true}
                            value={field.value}
                            onChange={(e) => field.onChange(e)}
                            error={!!errors.name?.message}
                            helperText={errors.name?.message}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="email"
                    rules={emailValidation}
                    render={({field}) => (
                        <TextField
                            label="Пошта"
                            size="small"
                            margin="normal"
                            className="registration-form__input"
                            fullWidth={true}
                            value={field.value}
                            onChange={(e) => field.onChange(e)}
                            error={!!errors.email?.message}
                            helperText={errors.email?.message}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="phone"
                    rules={{required: "Номер телефону не може бути пустим"}}
                    render={({field}) => (
                        <TextField
                            label="Номер телефону"
                            size="small"
                            margin="normal"
                            className="registration-form__input"
                            fullWidth={true}
                            value={field.value}
                            onChange={(e) => field.onChange(e)}
                            error={!!errors.phone?.message}
                            helperText={errors.phone?.message}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="password"
                    rules={passwordValidation}
                    render={({field}) => (
                        <TextField
                            label="Пароль"
                            type="password"
                            size="small"
                            margin="normal"
                            className="registration-form__input"
                            fullWidth={true}
                            value={field.value}
                            onChange={(e) => field.onChange(e)}
                            error={!!errors.password?.message}
                            helperText={errors.password?.message}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="repeat_password"
                    rules={{passwordValidation}}
                    render={({field}) => (
                        <TextField
                            label="Повторіть пароль"
                            type="password"
                            size="small"
                            margin="normal"
                            className="registration-form__input"
                            fullWidth={true}
                            value={field.value}
                            onChange={(e) => field.onChange(e)}
                            error={!!errors.repeat_password?.message}
                            helperText={errors.repeat_password?.message}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="address"
                    render={({field}) => (
                        <TextField
                            label="Адреса"
                            size="small"
                            margin="normal"
                            className="registration-form__input"
                            fullWidth={true}
                            value={field.value}
                            onChange={(e) => field.onChange(e)}
                            error={!!errors.address?.message}
                            helperText={errors.address?.message}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="description"
                    render={({field}) => (
                        <TextField
                            label="Опис"
                            size="small"
                            margin="normal"
                            className="registration-form__input"
                            fullWidth={true}
                            value={field.value}
                            onChange={(e) => field.onChange(e)}
                            error={!!errors.description?.message}
                            helperText={errors.description?.message}
                        />
                    )}
                />
                <Button
                    type="submit"
                    variant="contained"
                    fullWidth={true}
                    disableElevation={true}
                    sx={{
                        marginTop: 2
                    }}
                >
                    Зареєструватись
                </Button>
                <Typography component="div" sx={{marginTop: "5px"}}>
                    <NavLink to='/registration' className="link_login-form">Авторизуватись</NavLink>
                </Typography>
            </form>
        </div>
    );
};

export default RegistrationForm;
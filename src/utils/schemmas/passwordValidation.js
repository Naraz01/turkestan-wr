import * as yup from "yup";

export const PasswordValidation = yup.object().shape({
    password: 
        yup.string('пароль')
        .required('пароль обязательная'),
    password_confirmation: 
        yup.string()
        .required('Требуется подтверждение пароля')
        .oneOf([yup.ref('password')], 'Пароли должны совпадать'),
})
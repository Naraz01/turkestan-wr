import * as yup from "yup";

export const AuthSchema = yup.object().shape({
    email: yup.string().email('Некорректный e mail').required('Email обязательная'),
    password: yup.string(6, 'Длина пароля должно быть более 6 строк').required('Пароль обязательный'),
})
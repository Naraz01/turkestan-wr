import * as yup from "yup";

export const userValidation = yup.object().shape({
    name: yup.string().required('ФИО обязательная'),
    email: yup.string().email('Некорректный e mail').required('Email обязательная'),
})
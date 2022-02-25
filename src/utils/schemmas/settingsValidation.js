import * as yup from "yup";

export const SettingsValidation = yup.object().shape({
    name: yup.string().required('ФИО обязательная'),
    email: yup.string().email('Некорректный e mail').required('Email обязательная'),
})
import * as yup from "yup";

export const objectValidation = yup.object().shape({
    name_ru: 
        yup.string()
        .required('Поле обязательно для заполнения'),
    name_kk: 
        yup.string()
        .required('Поле обязательно для заполнения'),
    name_en: 
        yup.string()
        .required('Поле обязательно для заполнения'),
    type:
        yup.string()
        .nullable(true)
        .required('Поле обязательно для заполнения'),
    status:
        yup.string()
        .nullable(true)
        .required('Поле обязательно для заполнения'),
})
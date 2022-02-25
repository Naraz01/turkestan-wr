import * as yup from "yup";

export const objectValidation = yup.object().shape({
    video1: yup.string().nullable().notRequired(),
    video2: yup.string().nullable().notRequired(),
    video3: yup.string().nullable().notRequired(),
    video4: yup.string().nullable().notRequired(),
    video5: yup.string().nullable().notRequired(),
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
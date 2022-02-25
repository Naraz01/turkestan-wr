import React from "react";
import { useTranslation } from "react-i18next";
import { AuthButton } from './authButton'
import Modal from 'react-modal';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from "react-redux";
import { FetchUser } from '../../store/ducks/user/actionCreators'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { AuthSchema } from '../../utils/schemmas/authValidation';
let img = <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.75 4.25V11.75C13.75 13.8177 12.0677 15.5 10 15.5H7C6.586 15.5 6.25 15.1647 6.25 14.75C6.25 14.3353 6.586 14 7 14H10C11.2405 14 12.25 12.9905 12.25 11.75V4.25C12.25 3.0095 11.2405 2 10 2H7C6.586 2 6.25 1.66475 6.25 1.25C6.25 0.83525 6.586 0.5 7 0.5H10C12.0677 0.5 13.75 2.18225 13.75 4.25ZM9.19225 8.28647C9.268 8.10347 9.268 7.89653 9.19225 7.71353C9.154 7.62128 9.09925 7.53874 9.0295 7.46899L6.03025 4.46973C5.737 4.17648 5.263 4.17648 4.96975 4.46973C4.6765 4.76298 4.6765 5.23702 4.96975 5.53027L6.6895 7.25H1C0.586 7.25 0.25 7.58525 0.25 8C0.25 8.41475 0.586 8.75 1 8.75H6.6895L4.96975 10.4697C4.6765 10.763 4.6765 11.237 4.96975 11.5303C5.116 11.6765 5.308 11.75 5.5 11.75C5.692 11.75 5.884 11.6765 6.03025 11.5303L9.0295 8.53101C9.09925 8.46126 9.154 8.37872 9.19225 8.28647Z" fill="#5584AC"/>
        </svg>

export const Entrance = () => {
    
    const {t} = useTranslation()
    const dispatch = useDispatch();
    let [isOpen, setIsOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false)
        const openModal = () => {
            setIsOpen(true);
        }
      
        const closeModal = () => {
            setIsOpen(false);
        }

        const form = useForm({
            defaultValues: {
                email: '',
                password: ''
            },
            mode: 'onSubmit',
            reValidateMode: 'onChange',
            resolver: yupResolver(AuthSchema)
        })

        const onAuth = (data) => {
            if (data) {
                dispatch(FetchUser(data))
            }
        }
    return (
        <>
            <div onClick={openModal}>
                <AuthButton img = {img} text = {t('toComeIn')}/>
            </div>
            <Modal
                isOpen = {isOpen}
                onRequestClose = {closeModal}
                contentLabel = "Example Modal"
                className={'sdsa'}
                ariaHideApp = {false}
            >
                <div className = "authorization-modal">
                    <CloseIcon style = {{fontSize: '20px'}} onClick = {closeModal} className="authorization-close"/>
                    <p className = "authorization-title"> {t('authorization')} </p>
                    <form onSubmit = {form.handleSubmit(onAuth)}>
                        <div>
                            <p className = "settings-input__text"> e-mail * </p>
                            <input 
                                className = {form.formState.errors.email ? 'forms-input forms-input__error' : "forms-input"}
                                name = "email"
                                {...form.register('email')}
                            />
                            <p> {form.formState.errors.email?.message} </p>
                            <p className = "settings-input__text"> {t('password')} *</p>
                            <input
                                className = {form.formState.errors.password ? 'forms-input forms-input__error' : "forms-input"}
                                name = "password"
                                type = "password"
                                {...form.register('password')}
                            />
                            <p> {form.formState.errors.password?.message} </p>
                       </div>
                        <button className = "authorization-enter btn" type = "submit">
                                {t('toComeIn')}
                        </button>
                    </form>

                </div>
            </Modal>
        </>    
    )
};
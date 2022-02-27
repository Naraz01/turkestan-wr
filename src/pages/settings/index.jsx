import React from "react";
import { useTranslation } from "react-i18next";
import i18next from 'i18next';
import { Helmet } from "react-helmet";
import { Footer } from "../../components/footer";
import { Back } from "../../components/back"
import { useSelector } from "react-redux";
import { UsersApi } from '../../services/api/usersApi';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { SettingsValidation } from '../../utils/schemmas/settingsValidation';
import { PasswordValidation } from '../../utils/schemmas/passwordValidation';
import { Cancel } from '../../components/cancel/index'
import { Saved } from '../../components/saved'
import { Loading } from '../../components/loading/indexx'

export const Settings = () => {
    const {t} = useTranslation()
    const [loading, setLoading] = React.useState(false)
    const [dataLoading, setDataLoading] = React.useState(true)
    const [isPasswordChange, setIsPasswordChange] = React.useState(false)
    const [isSaved, setIsSaved] = React.useState(false)
    const userUpdateForm = useForm({
        defaultValues: {
            name: '',
            email: ''
        },
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        resolver: yupResolver(SettingsValidation)
    })

    const passwordForm = useForm({
        defaultValues: {
            password: '',
            password_confirmation: ''
        },
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        resolver: yupResolver(PasswordValidation)
    })
    const {user} = useSelector((state) => {
        return {
            user: state.user.data,
        }
    });

    const getUser = async () => {
        try {
            setDataLoading(true)
            const obj = await UsersApi.fetchFindOne(user && user.id);
            userUpdateForm.setValue( "name", obj.content.name );
            userUpdateForm.setValue( "email", obj.content.email );
            setDataLoading(false)
        } catch(error) {
            console.log('fetchFindOne', error)
            setDataLoading(true)
        }
    }
    React.useEffect(() => {
        getUser()
    }, [])

    const dataUpdate = async (data) => {
        setLoading(true)
        try {
            await UsersApi.fetchUserUpdate(data);
            setLoading(false)
            setIsSaved(true)
        } catch(error) {
            console.log('dataUpdate', error)
            setLoading(true)
        }
    }

    const updatePassword = async(data) => {
        setIsPasswordChange(true)
        try {
            await UsersApi.updatePassword(data);
            setIsSaved(true)
            setIsPasswordChange(false)
        } catch(error) {
            console.log('dataUpdate', error)
            setIsPasswordChange(false)
        }
    }

    if (dataLoading) {
        return (
            <div className='reservoir'>
                <div className='container'>
                    <Loading />
                </div>
            </div>
        )
    }

    return (
        <>
        <Helmet>
            <html lang = { i18next.language }/>
            <title>
                {t('settings')}
            </title>
        </Helmet>
            <div className = "settings backgroundColor pad-top">
                <div className = "container">
                    <div className="settings-head">
                        <Back />
                        <p>
                            {t('settings')}
                        </p>
                    </div>
                    {isSaved && <Saved />}
                    <div className="settings-data">
                        <p>
                            {t('personalData')}
                        </p>
                        <form onSubmit = {userUpdateForm.handleSubmit(dataUpdate)}>
                            <p className="settings-input__text">{t('fullName')} *</p>
                            <input 
                                name = "name" 
                                className = {userUpdateForm.formState.errors.name ? 'forms-input forms-input__error' : "forms-input"}
                                {...userUpdateForm.register('name')}
                            />
                            <p> {userUpdateForm.formState.errors.name?.message} </p>
                            <p className="settings-input__text">E-mail *</p>
                            <input
                                name = 'email'
                                {...userUpdateForm.register('email')}
                                className = {userUpdateForm.formState.errors.email ? 'forms-input forms-input__error' : "forms-input"}
                            />
                            <p> {userUpdateForm.formState.errors.email?.message} </p>
                            <div className="settings-footer">
                                <Cancel />
                                <button className='save btn' type = "submit">
                                    { loading ? t('preservation') : t('save') }
                                </button>
                            </div>
                        </form>
                    </div>
 
                    <div className="settings-data">
                        <p>
                            {t('changePassword')}
                        </p>
                        <p className="settings-input__text">{t('newPassword')} *</p>
                        <form onSubmit = {passwordForm.handleSubmit(updatePassword)}>
                            <input 
                                name = 'password'
                                {...passwordForm.register('password')}
                                className = {passwordForm.formState.errors.password ? 'forms-input forms-input__error' : "forms-input"}
                            />
                            <p> {passwordForm.formState.errors.password?.message} </p>
                            <p className="settings-input__text">{t('passwordConfirmation')} *</p>
                            <input 
                                name = 'password_confirmation'
                                {...passwordForm.register('password_confirmation')}
                                className = {passwordForm.formState.errors.password_confirmation ? 'forms-input forms-input__error' : "forms-input"}
                            /> 
                            <p> {passwordForm.formState.errors.password_confirmation?.message} </p>
                            <div className="settings-footer">
                                <button className='save btn' type = "submit">
                                    { isPasswordChange ? t('changePassword') : t('passwordChange') }
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        <Footer />
        </>
    )
};
import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from 'react-modal';
import { useTranslation } from "react-i18next";
import CloseIcon from '@mui/icons-material/Close';
import {UsersApi} from '../../services/api/usersApi';

export const UserDelete = ({id, deleteUser}) => {
    const {t} = useTranslation()

    let [isDelete, setIsDelete] = React.useState(false);
    const openModal = () => {
        setIsDelete(true);
    }
    const closeModal = () => {
        setIsDelete(false);
    }

    const onDeleteUser = async () => {
        try {
            await UsersApi.deleteUser(id);
            deleteUser(id)
            setIsDelete(false)
        } catch(error) {
            console.log('fetchUsers', error)
        }
    };

    return (
        <>
            <span className="users-delete" onClick={openModal}>
                <DeleteIcon style={{ color: "#e40404" }}/>
            </span>
            <Modal
                isOpen = {isDelete}
                onRequestClose = {closeModal}
                contentLabel = "Example Modal"
                className={'sdsa'}
                ariaHideApp = {false}
            >
                    <div className="user-delete__modal">
                        <div className="user-delete__modal-head">
                            <CloseIcon style = {{fontSize: '20px'}} onClick = {closeModal} />
                        </div>
                        <p className = "user-delete__modal-content">
                            {t('deleteSelectedEntry')}
                        </p>
                        <div className = "user-delete__modal-footer">
                            <div className = "btn user-delete__modal-yes" onClick = {onDeleteUser}>
                                {t('yes')}
                            </div>
                            <div className = "btn user-delete__modal-no" onClick = {closeModal}>
                                {t('no')}
                            </div>
                        </div>                
                    </div>
            </Modal>
        </>
    )
};
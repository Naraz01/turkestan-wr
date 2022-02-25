import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from 'react-modal';
import { useTranslation } from "react-i18next";
import CloseIcon from '@mui/icons-material/Close';
import {ObjectsApi} from '../../services/api/objectsApi'

export const ObjectDelete = ({id, deleteObject}) => {
    const {t} = useTranslation()

    let [isDelete, setIsDelete] = React.useState(false);
    const openModal = () => {
        setIsDelete(true);
      }
  
    const closeModal = () => {
        setIsDelete(false);
    }

    const onObjectUser = async () => {
        try {
            await ObjectsApi.deleteObjects(id);
            deleteObject(id)
            setIsDelete(false)
        } catch(error) {
            console.log('deleteObjects', error)
        }
    };

    return (
        <>
            <span className="object-delete" onClick={openModal}>
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
                        <p className="user-delete__modal-content">
                            {t('deleteSelectedEntry')}
                        </p>
                        <div className="user-delete__modal-footer">
                            <div className="btn user-delete__modal-yes" onClick = {onObjectUser}>
                                {t('yes')}
                            </div>
                            <div className="btn user-delete__modal-no" onClick = {closeModal}>
                                {t('no')}
                            </div>
                        </div>                
                    </div>
            </Modal>
        </>
    )
};
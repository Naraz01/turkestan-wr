import React from "react";
import {ObjectsApi} from '../../services/api/objectsApi'
import DeleteIcon from '@mui/icons-material/Delete';
import { Loading } from '../../components/loading/indexx';

export const BlogDraft = ({changeDraftProject, title, draftProject}) => {
    const [img, setImg] = React.useState();
    const [loading, setLoading] = React.useState(false)

    const sendFile = async (e) => {
        setLoading(true)
        try {
            let lists = e.target.files[0];
            const data = new FormData();
            data.append('file', lists)
            let obj = await ObjectsApi.uploadImage(data)
            let newImg = []
            const createImg = {
                url: obj.content.value,
                type: lists.type,
                name: lists.name,
            }
            newImg.push(createImg)
            changeDraftProject(newImg)
            setImg(newImg)
            setLoading(false)
        } catch(error) {
            console.log('sendFile', error)
            setLoading(false)
        }
    }
    const deleteImg = () => {
        changeDraftProject(null)
    }
    return (
        <div className = 'objectCreate-draft'>
            <p>{title}</p>
            <>
                {
                    draftProject ?
                    <div className = "objectCreate-draft__blog">
                        <div className = "objectCreate-draft__blog-left">
                            <div className = "objectCreate-draft__img">
                                <img src = {`https://dev14.panama.kz/${draftProject[0].url}`} alt = "#"/>
                            </div>
                            <p className = "objectCreate-draft__text">
                                {draftProject[0].name}
                            </p>
                        </div>
                        <div className = "objectCreate-draft__cursor" onClick = {deleteImg}>
                            <DeleteIcon style = {{ color: '#22577E' }}/>
                        </div>
                    </div>
                    :
                    <div className="objectCreate-draft__input">
                        <label className = "custom-file__upload" htmlFor = 'img'>
                            <input
                                type = "file"
                                className = "forms-input__file"
                                accept = ".jpg, .jpeg, .png"
                                onChange={(e) => sendFile(e)}
                                id = 'img'
                            />
                            <div className = "custom-file__upload-inner">
                                <p>.jpg .png</p>
                                <p> Не более 5МВ </p>
                            </div>
                        </label>
                        {loading && <Loading />}
                    </div>
                }      
            </>
        </div>
    )
};
import React from "react";
import { ObjectsApi } from '../../services/api/objectsApi'
import { Loading } from '../../components/loading/indexx';

export const ImageAdd = ({getImg, img}) => {
    const [loading, setLoading] = React.useState(false)
    const sendFile = async (e) => {
        setLoading(true)
        try {
            let lists = e.target.files;
            const data = new FormData();
            let newImg = []
            for (let i = 0; i < lists.length; i++) {
                data.append('file', lists[i])
                let obj = await ObjectsApi.uploadImage(data)
                console.log(obj)
                const createImg = {
                    url: obj.content.value,
                    type: lists[i].type,
                    name: lists[i].name,
                }
                newImg.push(createImg)
            }
            getImg(img === null ? img.concat(newImg) : newImg)
            setLoading(false)
        } catch(error) {
            console.log('sendFile', error)
            setLoading(false)
        }
    }

    return (
        <>
            <div>
                <label className = "custom-file__upload" htmlFor = 'img'>
                    <input 
                        type = "file"
                        className = "forms-input__file"
                        accept = ".jpg, .jpeg, .png"
                        name = "fileUpload[]"
                        multiple
                        onChange = {(e) => sendFile(e)}
                        id = 'img'
                        disabled = {loading}
                    />
                    <div className = "custom-file__upload-inner">
                        <p>.jpg .png</p>
                        <p> Не более 5МВ </p>
                    </div>
                </label>
                {loading && <Loading />}
            </div>
        </>
    )
};
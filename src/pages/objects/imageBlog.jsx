import React from "react";
import CloseIcon from '@mui/icons-material/Close';

export const ImageBlog = ({getImg, img}) => {

    const deleteImg = (item) => {
        let newImg = img.filter((photo) => {
            return photo !== item;
        })
        getImg(newImg)
    }
    return (
        <>
            {
                img && img.map((item, i) => {
                    return (
                        <div className = 'objectCreate-item__images' key = {i}>
                            <div className = "objectCreate-item__block">
                                <div className = 'objectCreate-item__image'>
                                    <img src = {`https://dev14.panama.kz/${item.url}`} alt = "#"/>
                                </div>
                                    <p className = "objectCreate-item__p">{item.name}</p>
                            </div>
                            <div className = 'objectCreate-item__image-delete' onClick = {() => deleteImg(item)}>
                                <CloseIcon style = {{fontSize: '14px', color: '#22577E'}} />
                            </div>
                        </div>
                    )
                })
            }
        </>
    )
};
import React from "react";
import CloseIcon from '@mui/icons-material/Close';

export const ImageObjects = ({img}) => {
    return (
        <>
            {
                img && img.map((item, i) => {
                    return (
                        <div className = 'objectCreate-item__images' key = {i}>
                            <div>
                                <div className = 'objectCreate-item__image'>
                                    <img src = {`https://dev14.panama.kz/${item.url}`} alt = "#"/>
                                </div>
                                <p></p>
                            </div>
                            <div className = 'objectCreate-item__image-delete' onClick = {(item) => deleteImg(item)}>
                                <CloseIcon style = {{fontSize: '14px', color: '#22577E'}} />
                            </div>
                        </div>
                    )
                })
            }
        </>
    )
};
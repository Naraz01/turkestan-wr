import React from "react";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';

export const Saved = () => {
    const [isOpen, setIsOpen] = React.useState(true)
    return (
        <>
        {
            isOpen &&
            <div className='saved'>
                <div className="saved-left">
                    <CheckCircleIcon style = {{color: '#03cc14'}}/>
                    <p>
                    Успешно сохранено
                    </p>
                </div>
                <div className="saved-right" onClick={() => setIsOpen(!isOpen)}>
                    <CloseIcon style = {{fontSize: '20px', color: '#22577E'}} />
                </div>
            </div> 
        }
        
        </>    
    )
};

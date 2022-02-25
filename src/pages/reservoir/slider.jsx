import React from "react";
import circleLeft from './circleLeft.png';
import circleRight from './circleRight.png';
import Modal from 'react-modal';
import CloseIcon from '@mui/icons-material/Close';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useParams } from "react-router-dom";

export const Slider = ({photos, video, isCard}) => {
    const params = useParams();
    const id = params.id;
    const [current, setCurrnet] = React.useState(0);
    const [img, setImg] = React.useState([]);
    const [isImg, setIsImg] = React.useState(false)
    const [modalCurrent, setModalCurrent] = React.useState(0);
    const [imgModal, setImgModal] = React.useState([]);
    const [isImgModal, setIsImgModal] = React.useState(false)
    const [modalIsOpen, setIsOpen] = React.useState(false);
    
    const openModal = () => {
      setIsOpen(true);
    }

    const closeModal = () => {
      setIsOpen(false);
    }
    React.useEffect(() => {
        setModalCurrent(0)
        setCurrnet(0)
    }, [id])
    React.useEffect(() => {
        console.log(video)
        let zh = []
        let zhModal = []
        if (photos) {
            photos.forEach((item) => {
                const filterPhotos = `https://dev14.panama.kz/${item.url}`;
                zh.push(filterPhotos);
                zhModal.push(filterPhotos)
            })
        }
        video.forEach((str) => {
            let start = str.indexOf('=');
            let end = str.indexOf('&');
            if (str.length) {
                let filterVideo = `https://i3.ytimg.com/vi/${str.slice(start + 1, (end === -1 ? str.length : end))}/maxresdefault.jpg`;
                zh.push(filterVideo);
              //  setImgModal(str.slice(start + 1, end))
                zhModal.push(str.slice(start + 1, end))
            }
        });
        setImg(zh);
        setImgModal(zhModal);
        if (zh[current].indexOf('dev14') !== -1) {
            setIsImg(true)
        } else {
            setIsImg(false)
        }
        if (zhModal[modalCurrent].indexOf('dev14') !== -1) {
            setIsImgModal(true)
        } else {
            setIsImgModal(false)
        }
    }, [photos, video, current, modalCurrent])
    
    const onPrev = () => {
        if (current === 0) {
            setCurrnet(0)
            setModalCurrent(0)
        }
        setCurrnet(current - 1)
        setModalCurrent(current - 1)
    }

    const onNext = () => {
        if (current === img.length - 1) {
            setCurrnet(img.length - 1)
            setModalCurrent(img.length - 1)
        }
        setCurrnet(current + 1)
        setModalCurrent(current + 1)
    }

    const onPrevModal = () => {
        if (modalCurrent === 0) {
            setModalCurrent(0)
        }
        setModalCurrent(modalCurrent - 1)
    }

    const onNextModal = () => {
        if (modalCurrent === imgModal.length-1) {
            setModalCurrent(imgModal.length-1)
        }
        setModalCurrent(modalCurrent + 1)
    }

    return (
        <div className='slider'>
            <div className='slider-item' onClick={openModal}>
                <img src={img[current]} className="slider-item__img" alt='' />

                {
                    !isImg && 
                    <div className="slider-play">
                        <PlayCircleIcon style={{fontSize: '80px', color: '#FFFFFF'}} />
                    </div>
                }
            </div>
            <Modal
                isOpen = {modalIsOpen}
                onRequestClose = {closeModal}
                contentLabel = "Example Modal"
                className = {'slider-modal'}
                ariaHideApp = {false}
            >
            <div className="slider-modal__close" onClick = {closeModal}><CloseIcon style = {{fontSize: '50px', color: '#22577E'}} /></div>
                {

                    isImgModal
                        ?
                    <img src = {imgModal[modalCurrent]} className="slider-modal__img" alt='' />
                        :
                    <iframe 
                        className="slider-modal__img" 
                        src={`https://www.youtube.com/embed/${imgModal[modalCurrent]}`}
                        title="YouTube video player" 
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen>
                    </iframe>                  
                }
                <button className="modal-slider__prev" onClick = {onPrevModal} disabled = {modalCurrent === 0}>
                    <ArrowBackIosNewIcon style = {{fontSize: '50px', color: '#22577E'}} />
                </button>
                <button className="modal-slider__next" onClick = {onNextModal} disabled={modalCurrent === img.length - 1}>
                    <ArrowForwardIosIcon style = {{fontSize: '50px', color: '#22577E'}} />
                </button>
            </Modal>

            <div className={`slider-panel ${isCard ? 'slider-panel__card' : ''}`}>
                <button onClick = {onPrev} disabled = {current === 0} className='slider-panel__icon'>
                    <img src={circleLeft} alt="#"/>
                </button>
                <div className='slider-panel__number'>
                     {current + 1} / {img.length}
                </div>
                <button onClick = {onNext} disabled={current === img.length-1} className='slider-panel__icon'>
                    <img src = {circleRight} alt="#"/>
                </button>
            </div>
        </div>
    )
};
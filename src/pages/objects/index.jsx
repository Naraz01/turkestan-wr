import React from "react";
import { useTranslation } from "react-i18next";
import i18next from 'i18next';
import { Helmet } from "react-helmet";
import { Footer } from "../../components/footer";
import { Pagination } from '../../components/pagination'
import { ObjectDelete } from './objectDelete'
import { StatusObject } from './status'
import { ObjectsApi } from '../../services/api/objectsApi'
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddIcon from '@mui/icons-material/Add';
import { Link } from "react-router-dom";
import { Loading } from '../../components/loading/indexx'

export const Objects = () => {
    const {t} = useTranslation()
    const [data, setData] = React.useState()
    const [currentPage, setCurrentPage] = React.useState(1)
    const [totalPages, setTotalPages] = React.useState()
    const [loading, setLoading] = React.useState(false)

    const onSelectPage = (page) => {
        setCurrentPage(page)
    }

    React.useEffect(() => {
        (async () => {
            try {
                setLoading(true)
                const obj = await ObjectsApi.fetchObjects(currentPage);
                setData(obj.content.items)
                setCurrentPage(obj.content.current_page)
                setTotalPages(obj.content.total_pages)
                setLoading(false)
            } catch(error) {
                console.log('fetchObjects', error)
                setLoading(true)
            }
        })()
    }, [currentPage])

    const deleteObject = (id) => {
        let newData = data.filter((item) => {
            return item.id !== id
        });
        setData(newData)
    }

    return (
        <>
        <Helmet>
            <html lang = { i18next.language }/>
            <title>
                {t('objects')}
            </title>
        </Helmet>
            <div className = "users backgroundColor pad-top">
                <div className = "container">
                    <div className="users-head">
                    <Link to = "/objects/create" className='btn add'>
                        <AddIcon style = {{ color: '#ffffff', fontSize: '20px'}}/>
                        {t('add')}
                    </Link>
                        {t('objects')}
                    </div>
                    <div className="users-content">
                        <div className="users-block">
                            <div className="objects-items">
                                <div className="objects-item tabel-title">ID</div>
                                <div className="objects-item tabel-title"> {t('title')} </div>
                                <div className="objects-item tabel-title"> {t('status')} </div>                                
                                <div className="objects-item tabel-title"> {t('actions')} </div>
                            </div>
                            {   
                                loading ? 
                                <Loading />
                                :
                                data && data.map((item) => {
                                    return (
                                        <div className="objects-items" key = {item.id}>
                                            <div className="objects-item">{item.id}</div>
                                            <div className="objects-item"> {item.name} </div>
                                            <div className="objects-item"> <StatusObject name = {item.status.name} id = {item.status.id}/> </div>                                
                                            <div className="objects-item"> 
                                                <div className="object-actions">
                                                    <Link to = {`/object/${item.id}`} className="object-visibility">
                                                        <VisibilityIcon style={{ color: "#0a5c02e1" }} />
                                                    </Link>
                                                    <Link to = {`/objects/${item.id}`} 
                                                        className = "object-update"
                                                    >
                                                        <EditIcon style = {{ color: "#04e1e1" }}/>
                                                    </Link>
                                                    <ObjectDelete id = {item.id} deleteObject = {deleteObject} />
                                                </div>
                                            </div>
                                        </div>      
                                    )
                                })
                            }
                        </div>
                        <Pagination currentPage = {currentPage} totalPages = {totalPages} onSelectPage = {onSelectPage}/>
                    </div>
                </div>
            </div>
        <Footer />
        </>
    )
};
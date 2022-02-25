import React from "react";
import { useTranslation } from "react-i18next";
import i18next from 'i18next';
import { Helmet } from "react-helmet";
import { Footer } from "../../components/footer";
import { Add } from '../../components/add'
import {Pagination} from '../../components/pagination'
import {UsersApi} from '../../services/api/usersApi';
import { UserItem } from "./userItem";
import { Loading } from '../../components/loading/indexx'

export const Users = () => {
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
            setLoading(true)
            try {
                const obj = await UsersApi.fetchUsers(currentPage);
                setData(obj.content.items)
                setCurrentPage(obj.content.current_page)
                setTotalPages(obj.content.total_pages)
                setLoading(false)
            } catch(error) {
                console.log('fetchUsers', error)
                setLoading(true)
            }
        })()
    }, [currentPage])

    const deleteUser = (id) => {
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
                {t('users')}
            </title>
        </Helmet>
            <div className = "users backgroundColor pad-top">
                <div className = "container">
                    <div className="users-head">
                        <Add />
                        {t('users')}
                    </div>
                    <div className="users-content">
                        <div className="users-block">
                            <div className="users-items">
                                <div className="users-item tabel-title">ID</div>
                                <div className="users-item tabel-title"> {t('title')} </div>
                                <div className="users-item tabel-title"> E-mail </div>
                                <div className="users-item tabel-title"> {t('actions')} </div>
                            </div>
                            {
                                loading ? 
                                <Loading />
                                :
                                data && data.map((item) => {
                                    return (
                                        <div className = "users-items" key = {item.id}>
                                            <UserItem item = {item} deleteUser = {deleteUser}/>
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
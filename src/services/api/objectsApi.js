import axios from "axios";
import i18next from 'i18next';

export const ObjectsApi = {
    fetchObjects(page) {
        return axios.get(`https://dev14.panama.kz/api/admin/objects?page=${page}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'language': i18next.language,
            }
        }).then(({data}) => data);
    },
    deleteObjects(id) {
        return axios.delete(`https://dev14.panama.kz/api/admin/objects/${id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'language': i18next.language,
            }
        }).then(({data}) => data);
    },
    setObject(data) {
        return axios.post(`https://dev14.panama.kz/api/admin/objects/store`, data, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'language': i18next.language,
            }
        }).then(({data}) => data);
    },
    updateObject(id, data) {
        return axios.post(`https://dev14.panama.kz/api/admin/objects/${id}`, data, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'language': i18next.language,
            }
        }).then(({data}) => data);
    },
    uploadImage(data) {
        return axios.post(`https://dev14.panama.kz/api/admin/upload/image`, data, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'language': i18next.language,
            }
        }).then(({data}) => data);
    },
    fetchFindOne(id) {
        return axios.get('https://dev14.panama.kz/api/admin/objects/'+id, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'language': i18next.language,
                'content-type': 'mulpipart/form-data'
            }
        }).then(({data}) => data);
    },
};
import axios from "axios";
import i18next from 'i18next';

export const UsersApi = {
    fetchUsers(page) {
        return axios.get(`https://dev14.panama.kz/api/admin/users?page=${page}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'language': i18next.language,
            }
        }).then(({data}) => data);
    },
    deleteUser(id) {
        return axios.delete(`https://dev14.panama.kz/api/admin/users/${id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'language': i18next.language,
            }
        }).then(({data}) => data);
    },
    fetchFindOne(id) {
        return axios.get('https://dev14.panama.kz/api/admin/users/'+id, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'language': i18next.language
            }
        }).then(({data}) => data);
    },
    fetchUserUpdate(data) {
        return axios.post('https://dev14.panama.kz/api/admin/profile/update', data, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'language': i18next.language
            }
        }).then(({data}) => data);
    },
    setUser(data) {
        return axios.post('https://dev14.panama.kz/api/admin/users/store', data, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'language': i18next.language
            }
        }).then(({data}) => data);
    },
    resetPassword(id, data) {
        return axios.post(`https://dev14.panama.kz/api/admin/users/${id}/resetPassword`, data, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'language': i18next.language
            }
        }).then(({data}) => data);
    },
    updatePassword(data) {
        return axios.post(`https://dev14.panama.kz/api/admin/profile/updatePassword`, data, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'language': i18next.language
            }
        }).then(({data}) => data);
    },
    updateUser(id, data) {
        return axios.post(`https://dev14.panama.kz/api/admin/users/${id}`, data, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'language': i18next.language
            }
        }).then(({data}) => data);
    },
};
//?page=1
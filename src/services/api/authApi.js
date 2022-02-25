import axios from "axios";
import i18next from 'i18next';

export const AuthApi = {
    fetchLogin(data) {
        return axios.post('https://dev14.panama.kz/api/auth/login', data, {
            headers: {
                'language': i18next.language
            }
        }).then(({data}) => data);
    }
};
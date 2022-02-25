import axios from "axios";
import i18next from 'i18next';

export const MenuApi = {
    fetchChannels() {
        return axios.get('https://dev14.panama.kz/api/general/menu/channels', {
            headers: {
                'language': i18next.language
            }
        }).then(({data}) => data);
    },
    fetchReservoirs() {
        return axios.get('https://dev14.panama.kz/api/general/menu/reservoirs', {
            headers: {
                'language': i18next.language
            }
        }).then(({data}) => data);
    },
    fetchCitySystems() {
        return axios.get('https://dev14.panama.kz/api/general/menu/city-systems', {
            headers: {
                'language': i18next.language
            }
        }).then(({data}) => data);
    },
    fetchEnvironmentals() {
        return axios.get('https://dev14.panama.kz/api/general/menu/environmentals', {
            headers: {
                'language': i18next.language
            }
        }).then(({data}) => data);
    },
};
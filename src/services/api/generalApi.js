import axios from "axios";
import i18next from 'i18next';

export const GeneralApi = {
    fetchGeneral() {
        return axios.get('https://dev14.panama.kz/api/general/objects', {
            headers: {
                'language': i18next.language
            }
        }).then(({data}) => data);
    },
    fetchFindOne(id) {
        return axios.get('https://dev14.panama.kz/api/general/objects/'+id, {
            headers: {
                'language': i18next.language
            }
        }).then(({data}) => data);
    },
};
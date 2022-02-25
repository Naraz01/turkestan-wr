import React from 'react';
import { useParams } from 'react-router-dom';
import { GeneralApi } from '../../services/api/generalApi';

export const PDFFile = () => {
  const [data, setData] = React.useState();

    const params = useParams();
    const id = params.id;

    React.useEffect(() => {
        (async () => {
            try {
                const obj = await GeneralApi.fetchFindOne(id);
                setData(obj.content)
            } catch(error) {
                console.log('fetchFindOne', error)
            }
        })()
    }, [id])
    if(!data) {
        return null
    }
    return (
        <div>
            123
        </div>
    )
};

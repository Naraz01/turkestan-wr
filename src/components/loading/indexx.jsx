import React from "react";
import CircularProgress from '@mui/material/CircularProgress';

export const Loading = () => {
    return (
        <div className="loading">
            <CircularProgress size='60px' style={{margin: "20px"}}/>
        </div>
    )
};

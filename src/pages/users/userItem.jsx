import React from "react";
import {UserDelete} from './userDelete'
import EditIcon from '@mui/icons-material/Edit';
import {UsersApi} from '../../services/api/usersApi';
import { Link } from "react-router-dom";

export const UserItem = ({item, deleteUser}) => {
    return (
        <>
            <div className = "users-item"> 
                {item.id} 
            </div>
            <div className = "users-item"> 
                <p> {item.name} </p>
            </div>
            <div className = "users-item"> 
                <p> {item.email} </p>
            </div>
            <div className = "users-item"> 
                <div className = "users-actions">
                    <Link to = {`/users/${item.id}`} className = "users-update">
                        <EditIcon style = {{ color: "#04e1e1" }} />
                    </Link>
                    <UserDelete id = {item.id} deleteUser = {deleteUser} />
                </div>    
            </div>
        </>                                    
    )
};
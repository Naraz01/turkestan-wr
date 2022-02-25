import React from 'react';
import './App.css';
import {Header} from "./components/header";
import { Home } from './pages/home';
import { Reservoir } from './pages/reservoir';
import { Settings } from './pages/settings';
import { Users } from './pages/users';
import { Objects } from './pages/objects';
import { NotFound } from './pages/404'
import { CreateObject } from './pages/objects/createObject';
import { useDispatch } from "react-redux";
import { FetchGeneral } from './store/ducks/general/actionCreators';
import { Route, Routes} from "react-router-dom";
import i18next from 'i18next';
import './fonts/stylesheet.css'
import { CreateUser } from './pages/users/create';
import { UpdateObject } from './pages/objects/updateObject';
import { EditUser } from './pages/users/userEdit';

import { useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(FetchGeneral())
  }, [i18next.language]);

  const {isAuth} = useSelector((state) => {
    return {
        isAuth: state.user.isAuth,
    }
  });
  return (
    <div className = "App">
      <Header/>
        <main className = 'app-main'>
          {isAuth && <Routes>
            <Route path = "/settings" element = { <Settings /> } />
            <Route path = "/users" element = { <Users /> } />
            <Route path = "/users/:id" element = { <EditUser /> } />
            <Route path = "/users/create" element = { <CreateUser />} />
            <Route path = "/objects" element = {<Objects />} />
            <Route path = "/objects/create" element = {<CreateObject />} />
            <Route path = "/objects/:id" element = {<UpdateObject />} />
            <Route path = "/object/:id" element = {<Reservoir />} />
            <Route path = "/" element = {<Home />} />
            <Route path = "*" element = { <NotFound /> } />
          </Routes>}
          {!isAuth && <Routes>
            <Route path = "/object/:id" element = {<Reservoir />} />
            <Route path = "/" element = {<Home />} />
            <Route path = "*" element = { <NotFound /> } />
          </Routes>}
        </main>
    </div>
  );
}

export default App;

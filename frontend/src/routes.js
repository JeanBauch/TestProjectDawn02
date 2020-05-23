import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Logon from './pages/Logon';
import Register from './pages/Register';
import Profile from './pages/Profile';
import NewProject from './pages/NewProject';
import Home from './pages/Home';
import NewProjectImage from './pages/NewProjectImage'
import ProjectPage from './pages/ProjectPage';
import Initial from './pages/Initial';
import TeamEdit from './pages/TeamEdit';
import ProjectEdit from './pages/ProjectEdit';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Initial} />
                <Route path="/home" exact component={Home} />
                <Route path="/login" exact component={Logon} />
                <Route path="/register" component={Register} />
                <Route path="/profile" component={Profile} />
                <Route path="/projects/new" component={NewProject} />
                <Route path="/projects/img" component={NewProjectImage} />
                <Route path="/project/page" component={ProjectPage} />
                <Route path="/team/edit" component={TeamEdit} />
                <Route path="/project/edit" component={ProjectEdit} />

            </Switch>
        </BrowserRouter>
    );
}


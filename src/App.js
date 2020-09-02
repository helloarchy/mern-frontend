import React from 'react';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';

import Users from './user/pages/Users';
import NewPlace from './places/pages/NewPlace';

const App = () => {
    return <Router>
        {/* Switch forces choice of match and skips rest */}
        <Switch>
            <Route path={'/'} exact={true}>
                <Users/>
            </Route>
            <Route path={'/places/new'} exact={true}>
                <NewPlace/>
            </Route>
            <Redirect to={'/'}/>
        </Switch>
    </Router>;
};

export default App;

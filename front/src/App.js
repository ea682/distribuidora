import React from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom';

import Home from './Components/Home';
import Login from './Components/Login/Login';
import AuthComponent from './Components/Login/AuthenticatedComponent';
import Protected from './Components/Login/Protected';

class App extends React.Component {
  render(){
    return (
      <BrowserRouter>
        <Switch>
          <Route path={'/'} exact component={Home} />
          <Route path={'/login'} component={Login} />
          <AuthComponent>
            <Route path={'/protected'} component={Protected} />
          </AuthComponent>
        </Switch>
      </BrowserRouter>
    );
  }
  
}

export default App;

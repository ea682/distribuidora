import React from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom';

import Home from './Components/Home';
import Login from './Components/Login/Login';
import Registro from './Components/Login/Registro';
import AuthComponent from './Components/Login/AuthenticatedComponent';
import Protected from './Components/Login/Protected';

class App extends React.Component {
  render(){
    return (
      <BrowserRouter>
        <Switch>
          <Route path={'/Home'} component={Home} />
          <Route path={'/login'} exact component={Login} />
          <Route path={'/register'} exact component={Registro} />
          <AuthComponent>
            <Route path={'/protected'} component={Protected} />
          </AuthComponent>
        </Switch>
      </BrowserRouter>
    );
  }
  
}

export default App;

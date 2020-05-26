import React from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom';


//Impotamos las paginas para luego llamarlas
import main from './Components/Home/main';
import Login from './Components/Login/Login';
import Registro from './Components/Login/Registro';
import AuthComponent from './Components/Login/AuthenticatedComponent';
import Protected from './Components/Login/Protected';

class App extends React.Component {
  render(){
    //Los routes es como se llamaran en la URL
    return (
      <BrowserRouter>
        <Switch>
          
        
        <Route path={'/login'} exact component={Login} />
        <Route path={'/register'} exact component={Registro} />
        <Route path={'/main'} component={main} />
        <AuthComponent>
          <Route path={'/protected'} component={Protected} />
        </AuthComponent>
          
        </Switch>
      </BrowserRouter>
    );
  }
  
}

export default App;

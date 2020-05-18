import React, { Component } from 'react';
import { getJwt } from '../helpers/jwt';
import { withRouter } from 'react-router-dom';

import Cliente from '../Home/Cliente';
import Factura from '../Home/Factura';
import Producto from '../Home/Producto';
import Home from '../Home/Home';

class AuthenticatedComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: undefined
    };
  }

  componentDidMount() {
    const jwt = getJwt();
    if (!jwt) {
      this.props.history.push('/Login');
    }
    else{
      this.props.history.push('/main');
    }
  }

  render() {
    if (this.state.user === undefined) {
      return (
        <div><h1>Loading...</h1></div>
      );
    }

    return (
      <div>
        {this.props.children}
      </div>
    );
  }

}

export default withRouter(AuthenticatedComponent);
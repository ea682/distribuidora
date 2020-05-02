import React, { Component } from 'react';
import axios from 'axios';
import api from '../config/Api';
import { Link } from 'react-router-dom';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };

    this.change = this.change.bind(this);
    this.submit = this.submit.bind(this);
    
    
  }

  change(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  
  submit(e) {
    
    e.preventDefault();

    axios.post(api+'/api/auth/', {
      email : this.state.email,
      password : this.state.password
    }).then(res => {

      console.log();
      localStorage.setItem('cool-jwt', res.data.access_token);
      this.props.history.push('/Protected');
      
    })
    .catch(err => {
      console.log(err);
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={e => this.submit(e)}>
          <label>email</label><input type="text" name="email" onChange={e => this.change(e)} value={this.state.email} />
          <label>password</label><input type="password" name="password" onChange={e => this.change(e)}
                                        value={this.state.password} />
          <button type="submit">Submit</button>
        </form>
        <div>
          <div><Link to="/register">Registrarce</Link> </div>
        </div>
      </div>
    );
  }
}

export default Login;
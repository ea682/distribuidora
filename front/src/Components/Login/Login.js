import React, { Component } from 'react';
import axios from 'axios';
import api from '../config/Api';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

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
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-6">
            <div>
              <br></br>
              <h4>Login</h4>
              <br></br>
            </div>
            <form onSubmit={e => this.submit(e)}>
              <div className = 'form-group'>
                <label>email</label>
                <input type="text" className= 'form-control' name="email" onChange={e => this.change(e)} value={this.state.email} />
              </div>
              <div className = 'form-group'>
                <label>password</label>
                <input type="password" className= 'form-control' name="password" onChange={e => this.change(e)}value={this.state.password} />
              </div>
              <div className = 'form-group'>
                <button type="submit" className="btn btn-primary btn-lg btn-block">Ingresar</button>
              </div>
            </form>
            <div>
              <div><Link to="/register" className="btn btn-primary btn-lg btn-block">Registrarte</Link> </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
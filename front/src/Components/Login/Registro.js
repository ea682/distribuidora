import React, { Component } from 'react';
import axios from 'axios';
import api from '../config/Api';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

class Registro extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      userName: '',
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

    let email = this.state.email;
    let userName = this.state.userName;
    let password = this.state.password;

    axios.post(api+`/api/users/register/${userName}/${email}/${password}`, {
      email : this.state.email,
      userName : this.state.userName,
      password : this.state.password
    }).then(res => {

      console.log(res.data);
      /*localStorage.setItem('datosUser', { 
            'email' : email, 
            'userName' : userName
        });*/
      this.props.history.push('/Login');
      
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
            <h4>Registro</h4>
            <br></br>
            </div>
            <form onSubmit={e => this.submit(e)}>
              <div className = 'form-group'>
                <label>Email</label>
                <input type="text" className= 'form-control' name="email" onChange={e => this.change(e)} value={this.state.email} />
              </div>
              <div className = 'form-group'>
                <label>Nombre de usuario</label>
                <input type="text" className= 'form-control' name="userName" onChange={e => this.change(e)} value={this.state.userName} />
              </div>
              <div className = 'form-group'>
                <label>Password</label>
                <input type="password" className= 'form-control' name="password" onChange={e => this.change(e)} value={this.state.password} />
              </div>
              <div className = 'form-group'>
                <button type="submit" className = 'btn btn-primary btn-lg btn-block'>Registrar</button>
              </div>
              <div>
                <Link to="/Login" className="btn btn-primary btn-lg btn-block">Volver</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Registro;
import React, { Component } from 'react';
import axios from 'axios';
import api from '../config/Api';

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

    axios.post(api+`/api/users/register/${email}/${userName}/${password}`, {
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
      <div>
        <form onSubmit={e => this.submit(e)}>
            <label>email</label><input type="text" name="email" onChange={e => this.change(e)} value={this.state.email} />
            <label>Nombre de usuario</label><input type="text" name="userName" onChange={e => this.change(e)} value={this.state.userName} />
            <label>password</label><input type="password" name="password" onChange={e => this.change(e)}
                                        value={this.state.password} />
            <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default Registro;
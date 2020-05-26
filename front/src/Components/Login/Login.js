import React, { Component } from 'react';
import axios from 'axios';
import api from '../config/Api';
import { Link } from 'react-router-dom';
import './Login.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import BackgroundSlideshow from 'react-background-slideshow';

import image1 from './img/1.jpg';
import image2 from './img/2.jpg';
import image3 from './img/3.jpg';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };

    this.change = this.change.bind(this);
    //this.submit = this.submit.bind(this);
    
    
  }

  change(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  handleClick =(e)=>{
  //submit(e) {
    
    e.preventDefault();

    axios.post(api+'/api/auth/', {
      email : this.state.email,
      password : this.state.password
    }).then(res => {

      //Validamos que el JSON tenga un token.
      if(res.data.access_token === 'Invalid'){

        //Hacemos focus en los datos incorrectos
        document.getElementsByName("email")[0].style.borderColor = "Red";
        document.getElementsByName("password")[0].style.borderColor = "Red"
      }
      else{
        localStorage.setItem('cool-jwt', res.data.access_token);
        this.props.history.push('/Protected');
      }
      console.log(res.data);
      
      
    })
    .catch(err => {
      console.log(err);
    })
  }

  render() {
    return (
      <div className="container">    
          <div className="row justify-content-center">
            <div className="col-6">
              <div className="containerLogin">
                <div>
                  
                  <br></br>
                  <h1>Sign Up</h1>
                  <br></br>
                </div>
                <form onSubmit={e => this.submit(e)}>
                  <div className = 'form-group'>
                    <label>Email</label>
                    <input type="text" className= 'form-control' name="email" onChange={e => this.change(e)} value={this.state.email} />
                  </div>
                  <div className = 'form-group'>
                    <label>Password</label>
                    <input type="password" className= 'form-control' name="password" onChange={e => this.change(e)}value={this.state.password} />
                  </div>
                  <div className = 'form-group'>
                    <button type="submit" onClick ={this.handleClick} className="btn btn-primary btn-lg btn-block">Ingresar</button>
                  </div>
                </form>
                <div>
                  <div><Link to="/register" className="btn btn-primary btn-lg btn-block">Registrarte</Link> </div>
                </div>
              </div>
            </div>
          </div>
          <BackgroundSlideshow images={
            [ 
              image1, 
              image2, 
              image3
              /*image4, 
              image5, 
              image6*/
            
            ]}/>
          <div>

          </div>
      </div>
    );
  }
}

export default Login;
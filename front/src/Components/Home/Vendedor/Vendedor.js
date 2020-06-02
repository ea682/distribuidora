import React from 'react';
import axios from 'axios';
import api from '../../config/Api';

class Vendedor extends React.Component{
  state = {};
  handleChange =(e)=>{
    this.setState({
      [e.target.name]: e.target.value,
    })
  }
  handleClick =(e)=>{
    let datosCliente = this.state;
    axios.post(`${api}/api/vendedor/${datosCliente.rut}/${datosCliente.nombre}/${datosCliente.direccion}/${datosCliente.comision}/${datosCliente.comuna}`, {})
    .then(res => {
      let result = res.data.messaje;
      console.log(result);

      //Valimos el resultado de la consulta.
      if(result != false){
        alert("Datos ingresados");
      }else{
        alert("El Vendedor ya fue ingresado");
      }
    })
    .catch(err => {
      alert('Error al procesar la solicitudad');
    });
  }
  render(){
    return(
      <div>
        <h1> Nuevo Vendedor</h1>

        <form>
          <div className = 'form-group'>
            <label>Rut</label>
            <input onChange = {this.handleChange} className= 'form-control' type = 'text' name = 'rut' value= {this.state.rut}  />
          </div>
          <div className = 'form-group'>
            <label>Nombre</label>
            <input onChange = {this.handleChange} className= 'form-control' type = 'text' name = 'nombre' value= {this.state.nombre} />
          </div>
          <div className = 'form-group'>
            <label>Dirección</label>
            <input onChange = {this.handleChange} className= 'form-control' type = 'text' name = 'direccion' value= {this.state.direccion}  />
          </div>
          <div className = 'form-group'>
            <label>Comision</label>
            <input onChange = {this.handleChange} className= 'form-control' type = 'text' name = 'comision' value= {this.state.comision}  />
          </div>
          <div className = 'form-group'>
            <label>Comuna</label>
            <input onChange = {this.handleChange} className= 'form-control' type = 'text' name = 'comuna' value= {this.state.comuna}  />
          </div>
          <button type = 'button' onClick ={this.handleClick} className = 'btn btn-primary'> Guardar </button>
        </form>
      </div>
    );
  }
}

export default Vendedor;
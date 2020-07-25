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
    let codigo = document.getElementsByName("codigo")[0].value
    if(codigo !== ""){
      let detalle = document.getElementsByName("detalle")[0].value
      if(detalle !== ""){
        let datos = this.state;
        console.log(datos);
        axios.post(`${api}/api/producto/${datos.codigo}/${datos.nombreProducto}/${datos.detalle}`, {})
        .then(res => {
          console.log(res.data.message);
          return res.data.message;
        })
        .catch(err => {
          console.log(err);
        });
      }else{
        alert("No sea a ingresado informacion en el campo detalle")
      }
    }else{
      alert("No sea a ingresado informacion en el campo codigo")
    }
  }
  render(){
    return(
      <div className="form-page">
        <h1> Nuevo Producto</h1>

        <form>
          <div className = 'form-group'>
            <label>Codigo item</label>
            <input onChange = {this.handleChange} className= 'form-control' type = 'text' name = 'codigo'/>
          </div>
          <div className = 'form-group'>
            <label>Nombre del producto</label>
            <input onChange = {this.handleChange} className= 'form-control' type = 'text' name = 'nombreProducto'/>
          </div>
          <div className='form-group'>
            <label>Detalle</label>
            <input onChange={this.handleChange} className='form-control' type='text' name='detalle'/>
          </div>

          <button type = 'button' onClick ={this.handleClick} className = 'btn btn-primary'> Guardar </button>
        </form>
      </div>
    );
  }
}

export default Vendedor;
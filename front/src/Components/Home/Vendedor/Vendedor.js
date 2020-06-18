import React from 'react';
import axios from 'axios';
import api from '../../config/Api';
import '../form.css';

class Vendedor extends React.Component{
  state = {};
  handleChange =(e)=>{
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  //Eliminamos los elementos emergentes
  deleteElement(id){
    let cantidadElementos = document.getElementsByClassName("divMsj");
    setTimeout(function() {
      for (let i = 0; i < cantidadElementos.length; i++) {
        let elementoContent = document.getElementsByClassName("divMsj")[i];
        try {
          elementoContent.parentNode.removeChild(elementoContent);
        } catch (error) {
          
        }
      }
      
    }, 5000);
    
    
    //divDelete.removeChild(divDelete[]);
  }

  resultOK(){
    //Obtenemos el elemento al cual le agregaremos la validacion.
    let elementoContent = document.getElementById('nuevoVendedor');

    //Creamos el elemento y le damos las propiedades.
    let addDiv = document.createElement("div");
    addDiv.className = "divOK divMsj";
    addDiv.id = "elementoDesplegado";
    addDiv.innerHTML += "<label>Se creo nuevo vendedor</label>";
    
    
    elementoContent.appendChild(addDiv);
    this.deleteElement("elementoDesplegado");
  }

  resultCreado(){
    //Obtenemos el elemento al cual le agregaremos la validacion.
    let elementoContent = document.getElementById('nuevoVendedor');

    //Creamos el elemento y le damos las propiedades.
    let addDiv = document.createElement("div");
    addDiv.className = "divRep divMsj";
    addDiv.id = "elementoDesplegado";
    addDiv.innerHTML += "<label>El vendedor ya existe</label>";
    
    
    elementoContent.appendChild(addDiv);
    this.deleteElement("elementoDesplegado");
  }

  resultError(){
    //Obtenemos el elemento al cual le agregaremos la validacion.
    let elementoContent = document.getElementById('nuevoVendedor');

    //Creamos el elemento y le damos las propiedades.
    let addDiv = document.createElement("div");
    addDiv.className = "divError divMsj";
    addDiv.id = "elementoDesplegado";
    addDiv.innerHTML += "<label>Error para crear Vendedor</label>";
    
    
    elementoContent.appendChild(addDiv);
    this.deleteElement("elementoDesplegado");
  }

  handleClick =(e)=>{
    let datosCliente = this.state;
    axios.post(`${api}/api/vendedor/${datosCliente.rut}/${datosCliente.nombre}/${datosCliente.direccion}/${datosCliente.comision}/${datosCliente.comuna}`, {})
    .then(res => {
      let result = res.data.messaje;
      console.log(result);

      //Valimos el resultado de la consulta.
      if(result != false){
        try {
          this.resultOK();
        } catch (error) {
          this.resultError();
        }
        
      }else{
        this.resultCreado();
      }
    })
    .catch(err => {
      this.resultError();
    });
  }
  render(){
    return(
      <div id='nuevoVendedor' className="form-page">
        <h1> Nuevo Vendedor</h1>

        <form>
          <div className='form-group'>
            <label>codigo</label>
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
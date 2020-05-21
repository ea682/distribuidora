import React from 'react';
import axios from 'axios';
import api from '../../config/Api';

class Cliente extends React.Component{

  constructor(props) {
    super(props);

    this.state = {
      datos : []
    };
  }
  componentDidMount(){
    this.llenarRegions();
  }

  llenarRegions(){
    axios.get(api+'/api/localizacion/', {
    }).then(res => {
      let datos = res.data.regiones;
      console.log(datos);
      let cboRegiones = document.getElementById("cboRegion");
      for (let i = 0; i < datos.length; i++) {
        //Creamos elemento
        let opt = document.createElement("option");
        //Le damos valor
        opt.value = datos[i].id;
        //Le damos el texto
        opt.textContent = datos[i].NombreRegion;
        cboRegiones.options.add(opt);
        //const element = array[index];
        
      }
      return res.data.regiones;
    })
    .catch(err => {
      console.log(err);
    });

  }
  state = {};
  handleChange =(e)=>{
    this.setState({
      [e.target.name]: e.target.value,
    })
  }
  handleClick =(e)=>{
    console.log('button was click')
    console.log(this.state)
  }

  render(){
    return(
      <div className="form-page">
        <h1> Nuevo Cliente</h1>

        <form>
          <div className = 'form-group'>
            <label>Rut</label>
            <input onChange = {this.handleChange} className= 'form-control' type = 'text' name = 'rut' value= {this.state.rut}  />
          </div>
          <div className = 'form-group'>
            <label>Tipo de Cliente</label>
            <select id='Tipo_Cliente' className = 'form-control' name = 'tipo_cliente' value= {this.state.tipo_cliente}  >
            <option value="Empresa">Empresa</option>
            <option value="Empresa">Persona</option>
            </select>
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
            <label>Region</label>
            <select class="form-control" id="cboRegion">
            </select>
          </div>
          <div className = 'form-group'>
            <label>Provincia</label>
            <select class="form-control" id="cboRegion">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
          </div>
          <div className = 'form-group'>
            <label>Comuna</label>
            <select class="form-control" id="cboRegion">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
          </div>
          <div className = 'form-group'>
            <label>Ciudad</label>
            <input onChange = {this.handleChange} className= 'form-control' type = 'text' name = 'ciudad' value= {this.state.ciudad}  />
          </div>
          <div className = 'form-group'>
            <label>Giro</label>
            <input onChange = {this.handleChange} className= 'form-control' type = 'text' name = 'giro' value= {this.state.giro}  />
          </div>

          <button type = 'button' onClick ={this.handleClick} className = 'btn btn-primary'> Guardar </button>
        </form>
      </div>
    );
  }
}

export default Cliente;
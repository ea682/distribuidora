import React from 'react';

class Cliente extends React.Component{
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
      <div>
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
            <label>Comuna</label>
            <input onChange = {this.handleChange} className= 'form-control' type = 'text' name = 'comuna' value= {this.state.comuna}  />
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
import React from 'react';

class Vendedor extends React.Component{
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
        <h1> Nuevo Producto</h1>

        <form>
          <div className = 'form-group'>
            <label>Codigo item</label>
            <input onChange = {this.handleChange} className= 'form-control' type = 'text' name = 'item_cod' value= {this.state.rut}  />
          </div>
          <div className = 'form-group'>
            <label>Nombre del producto</label>
            <input onChange = {this.handleChange} className= 'form-control' type = 'text' name = 'nombre_producto' value= {this.state.nombre} />
          </div>
          <div className = 'form-group'>
            <label>Precio unitario</label>
            <input onChange = {this.handleChange} className= 'form-control' type = 'text' name = 'precio_unitario' value= {this.state.direccion}  />
          </div>

          <button type = 'button' onClick ={this.handleClick} className = 'btn btn-primary'> Guardar </button>
        </form>
      </div>
    );
  }
}

export default Vendedor;
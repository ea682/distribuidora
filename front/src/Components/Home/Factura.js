import React from 'react';

class Factura extends React.Component{
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
        <h1> Nueva Factura</h1>

        <form>
          <div className = 'form-group'>
            <label>Numero de factura</label>
            <input onChange = {this.handleChange} className= 'form-control' type = 'text' name = 'NumFactura' value= {this.state.rut}  />
          </div>
          <div className = 'form-group'>
            <label>Tipo de factura</label>
            <select id='Tipo_factura' className = 'form-control' name = 'tipo_factura' value= {this.state.tipo_cliente}  >
            <option value="factura electronica">Factura electronica</option>
            <option value="boleta electronica">Boleta electronica</option>
            <option value="factura manual">Factura Manual</option>
            <option value="boleta manual">Boleta Manual</option>
            </select>
          </div>
          <div className = 'form-group'>
            <label>Tipo de pago</label>
            <select id='Tipo_factura' className = 'form-control' name = 'tipo_factura' value= {this.state.tipo_cliente}  >
            <option value="efectivo">Efectivo</option>
            <option value="Cheque">Cheque</option>
            <option value="factura manual">Factura Manual</option>
            <option value="boleta manual">Boleta Manual</option>
            </select>
          </div>
          <div className = 'form-group'>
            <label>Tasa de moneda</label>
            <input onChange = {this.handleChange} className= 'form-control' type = 'text' name = 'tipo_moneda' value= {this.state.nombre} />
          </div>
          <div className = 'form-group'>
            <label>Tasa de ingreso</label>
            <input onChange = {this.handleChange} className= 'form-control' type = 'text' name = 'tasa_ingreso' value= {this.state.direccion}  />
          </div>
          <div className = 'form-group'>
            <label>Fecha de documento</label>
            <input onChange = {this.handleChange} className= 'form-control' type = 'date' name = 'fecha_documento' value= {this.state.comuna}  />
          </div>
          <div className = 'form-group'>
            <label>Fecha de vencimiento</label>
            <input onChange = {this.handleChange} className= 'form-control' type = 'date' name = 'fecha?vencimiento' value= {this.state.ciudad}  />
          </div>
          <div className = 'form-group'>
            <label>Afecto</label>
            <input onChange = {this.handleChange} className= 'form-control' type = 'text' name = 'afecto' value= {this.state.giro}  />
          </div>
          <div className = 'form-group'>
            <label>Excente</label>
            <input onChange = {this.handleChange} className= 'form-control' type = 'text' name = 'excente' value= {this.state.giro}  />
          </div>
          <div className = 'form-group'>
            <label>Iva</label>
            <input onChange = {this.handleChange} className= 'form-control' type = 'text' name = 'iva' value= {this.state.giro}  />
          </div>
          <div className = 'form-group'>
            <label>Total a pagar</label>
            <input onChange = {this.handleChange} className= 'form-control' type = 'text' name = 'total_pagar' value= {this.state.giro}  />
          </div>


          <button type = 'button' onClick ={this.handleClick} className = 'btn btn-primary'> Guardar </button>
        </form>
      </div>
    );
  }
}

export default Factura;
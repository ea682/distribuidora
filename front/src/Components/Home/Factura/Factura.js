import React from 'react';
import axios from 'axios';
import api from '../../config/Api';

class Factura extends React.Component{
  state = {};

  //Se ejecutan antes de renderizar el componente.
  componentDidMount(){
    //Validamos Token
    
    this.llenarClientes()
    //Agregamos los datos antes de montar el componente
    
  }

  handleChange =(e)=>{
    this.setState({
      [e.target.name]: e.target.value,
    })
  }
  handleClick =(e)=>{
    console.log('button was click')
    console.log(this.state)
  }
   //Obtenemos los clientes y la agregamos al HTML
   llenarClientes(){
    axios.post(api+'/api/clientes', {
    }).then(res => {
      let datos = res.data.clientes;

      let cboClientes = document.getElementById("cboCliente");

      //Creamos la opcion seleccionar
      let opt = document.createElement("option");
      opt.value = 0;
      opt.textContent = "Select...";
      cboClientes.options.add(opt);

      for (let i = 0; i < datos.length; i++) {
        //Creamos elemento
        opt = document.createElement("option");
        //Le damos valor
        opt.value = datos[i].id;
        //Le damos el texto
        opt.textContent = datos[i].rut;
        cboClientes.options.add(opt);
        //const element = array[index];
        
      }
      return res.data.regiones;
    })
    .catch(err => {
      console.log(err);
    });
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
            <label>cliente</label>
            <select id='cboCliente' className = 'form-control' name = 'tipo_factura' value= {this.state.tipo_cliente}  >
            </select>
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
            <select id='Tipo_Pago' className = 'form-control' name = 'tipo_factura' value= {this.state.tipo_cliente}  >
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
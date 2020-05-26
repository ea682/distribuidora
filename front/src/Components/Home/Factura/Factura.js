import React from 'react';
import axios from 'axios';
import api from '../../config/Api';

class Factura extends React.Component{
  state = {};

  //Se ejecutan antes de renderizar el componente.
  componentDidMount(){
    //Validamos Token
    this.llenarProductos();
    this.llenarClientes();
    this.llenarVendedores();
    this.llenarPagos();
    this.llenarFactura();
    
    //Agregamos los datos antes de montar el componente
    
  }

  //Al ocurrir cambios en los CBO este se guardan
  change(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleChange =(e)=>{
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  //Insertamos los datos.
  handleClick =(e)=>{
    let datos = this.state;
    console.log(datos);
    axios.post(`${api}/api/factura/${datos.NumFactura}/${datos.tasa_ingreso}/${datos.fecha_documento}/${datos.fecha_vencimiento}/${datos.afecto}/${datos.excente}/${datos.iva}/${datos.total_pagar}/${datos.cboFactura}/${datos.tipo_moneda}/${datos.cboTipoPago}/${datos.cboCliente}/${datos.cboVendedor}`, {})
    .then(res => {
      console.log(res.data.message);
      return res.data.message;
    })
    .catch(err => {
      console.log(err);
    })
  }
  //Obtenemos los clientes y la agregamos al HTML
  llenarClientes(){
    axios.get(api+'/api/clientes', {
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
      return res.data.clientes;
    })
    .catch(err => {
      console.log(err);
    });
  }

  //Obtenemos los productos y la agregamos al HTML
  llenarProductos(){
    axios.get(api+'/api/producto', {
    }).then(res => {
      let datos = res.data.producto;
      console.log(datos);
      let cboProductos = document.getElementById("cboProductos");

      //Creamos la opcion seleccionar
      let opt = document.createElement("option");
      opt.value = 0;
      opt.textContent = "Select...";
      cboProductos.options.add(opt);

      for (let i = 0; i < datos.length; i++) {
        //Creamos elemento
        opt = document.createElement("option");
        //Le damos valor
        opt.value = datos[i].id;
        //Le damos el texto
        opt.textContent = datos[i].nombreProducto;
        cboProductos.options.add(opt);
        //const element = array[index];
        
      }
      return res.data.producto;
    })
    .catch(err => {
      console.log(err);
    });
  }

  //Obtenemos los Vendedores y la agregamos al HTML
  llenarVendedores(){
    axios.get(api+'/api/vendedor', {
    }).then(res => {
      let datos = res.data.vendedores;

      let cboVendedores = document.getElementById("cboVendedores");

      //Creamos la opcion seleccionar
      let opt = document.createElement("option");
      opt.value = 0;
      opt.textContent = "Select...";
      cboVendedores.options.add(opt);

      for (let i = 0; i < datos.length; i++) {
        //Creamos elemento
        opt = document.createElement("option");
        //Le damos valor
        opt.value = datos[i].id;
        //Le damos el texto
        opt.textContent = datos[i].rut;
        cboVendedores.options.add(opt);
        //const element = array[index];
        
      }
      return res.data.vendedores;
    })
    .catch(err => {
      console.log(err);
    });
  }

  //Obtenemos los Pagos y la agregamos al HTML
  llenarPagos(){
    axios.get(api+'/api/tipos/tipoPago', {
    }).then(res => {
      let datos = res.data.tipoPago;

      let cboTipoPago = document.getElementById("cboTipoPago");

      //Creamos la opcion seleccionar
      let opt = document.createElement("option");
      opt.value = 0;
      opt.textContent = "Select...";
      cboTipoPago.options.add(opt);

      for (let i = 0; i < datos.length; i++) {
        //Creamos elemento
        opt = document.createElement("option");
        //Le damos valor
        opt.value = datos[i].id;
        //Le damos el texto
        opt.textContent = datos[i].nombreTipoPago;
        cboTipoPago.options.add(opt);
        //const element = array[index];
        
      }
      return res.data.tipoPago;
    })
    .catch(err => {
      console.log(err);
    });
  }

  //Obtenemos los Factura y la agregamos al HTML
  llenarFactura(){
    axios.get(api+'/api/tipos/tipoFactura', {
    }).then(res => {
      let datos = res.data.tipoFactura;

      let cboFactura = document.getElementById("cboFactura");

      //Creamos la opcion seleccionar
      let opt = document.createElement("option");
      opt.value = 0;
      opt.textContent = "Select...";
      cboFactura.options.add(opt);

      for (let i = 0; i < datos.length; i++) {
        //Creamos elemento
        opt = document.createElement("option");
        //Le damos valor
        opt.value = datos[i].id;
        //Le damos el texto
        opt.textContent = datos[i].nombreTipoFactura;
        cboFactura.options.add(opt);
        //const element = array[index];
        
      }
      return res.data.tipoFactura;
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
            <label>Clientes</label>
            <select id='cboCliente' className = 'form-control' name = 'cboCliente' onChange={e => this.change(e)}>
            </select>
          </div>
          <div className = 'form-group'>
            <label>Vendedores</label>
            <select id='cboVendedores' className = 'form-control' name = 'cboVendedor' onChange={e => this.change(e)}>
            </select>
          </div>
          <div className = 'form-group'>
            <label>Productos</label>
            <select id='cboProductos' className = 'form-control' name = 'cboProducto' onChange={e => this.change(e)}  >
            </select>
          </div>
          
          <div className = 'form-group'>
            <label>Tipo de factura</label>
            <select id='cboFactura' className = 'form-control' name='cboFactura' onChange={e => this.change(e)}  >
            </select>
          </div>
          <div className = 'form-group'>
            <label>Tipo de pago</label>
            <select id='cboTipoPago' className='form-control' name='cboTipoPago' onChange={e => this.change(e)}  >
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
            <input onChange = {this.handleChange} className= 'form-control' type = 'date' name = 'fecha_vencimiento' value= {this.state.ciudad}  />
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
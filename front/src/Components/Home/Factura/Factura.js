import React from 'react';
import axios from 'axios';
import api from '../../config/Api';

import deleteCbo from '../../img/eliminar.svg';
import addCbo from '../../img/check.svg';

import './style.css';

class Factura extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      iva : 19,
      productos : '',
      detalle : '',
      ckeckIva : false,
      fechaDocumento : '',
      fechaVencimiento : '',
      arrayProductos: '',
      arrayProductos2: ''
    };
  }

  //Se ejecutan antes de renderizar el componente.
  componentDidMount(){
    //Validamos Token
    this.llenarProductos();
    this.llenarClientes();
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

  cambiarValores(){
    let getProductosSelect = this.state.arrayProductos;
    let listProductos = this.state.productos;
    let idGetProducto = 0;
    let idProducto = 0;
    let cantidad = 0;
    let precioUni = 0;
    let totalBruto = 0;
    let totalNeto = 0;
    for (let i = 0; i < getProductosSelect.length; i++) {
      
      idGetProducto = getProductosSelect[i].selectValue;
      cantidad = getProductosSelect[i].valor;
      if(cantidad > -1){

      }else{
        cantidad = 0
      }
      for (let u = 0; u < listProductos.length; u++) {
        idProducto = listProductos[u].id;
        if(idGetProducto == idProducto){

          precioUni = listProductos[u].precioUnitario;
          totalBruto += precioUni*cantidad;
          break;
        }
      }
    }
    document.getElementById('txtBruto').value = `$${totalBruto}`;
    let iva = document.getElementById("txtIva").value;

    

    //Validaciones
    if(iva.length == 0){
      iva = 19;
    }else{
      try {
        iva = parseInt(iva.replace('%',''));
        
        
      } catch (error) {
        
      }
      if(iva.toString().length == 1){
        iva = `0${iva}`;
        document.getElementById("txtIva").value = iva;
      }else{
        document.getElementById("txtIva").value = iva;
      }
    }
    iva =  `1.${iva}`;
    totalNeto = totalBruto*iva;
    
    document.getElementById('txtNeto').value= `$${totalNeto}`;
  }

  getProductos(){
    let elementsProductos = document.getElementById('divProductos');
    let getSelects = elementsProductos.getElementsByTagName('select');
    let getTxt = elementsProductos.getElementsByTagName('input');
    let arrayDatos = [];
    let arrayDatos2 = [];

    for (let i = 0; i < getSelects.length; i++){
      let datoSelect = getSelects[i].value;
      let datoInput = getTxt[i].value;

      let newArray = [];
      newArray.push(datoSelect);
      newArray.push(datoInput);
      arrayDatos2.push(newArray);

      let concatenar = {selectValue : datoSelect, valor : datoInput }
      arrayDatos.push(concatenar);

    }
    this.setState({ arrayProductos : arrayDatos});
    this.setState({ arrayProductos2 : arrayDatos2});
    this.cambiarValores();
  }

  objetToArray(obj) {
    for (let prop of Object.keys(obj)) // own properties, you might use
                                       // for (let prop in obj)
        return obj[prop];
  }
  //Insertamos los datos.
  handleClick =(e)=>{
    let datos = this.state;
    console.log(this.state)
    axios.post(`${api}/api/factura/${datos.NumFactura}/${datos.detalle}/${datos.cboFactura}/${datos.cboTipoPago}/${datos.fechaDocumento}/${datos.fechaVencimiento}/${datos.cboClientes}/${this.state.arrayProductos2}/${datos.iva}`)
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

      let cboClientes = document.getElementById("cboClientes");

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
        opt.textContent = datos[i].nombreCliente;
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
      this.setState({productos : datos});
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
        opt.textContent = datos[i].nombreVendedor;
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
    })
    .catch(err => {
      console.log(err);
    });
  }

  //Habilitar y desabilitar Imput IVA
  handleChangeChk = () => {

    //Cambiamos el estado de Input IVA
    if(this.state.ckeckIva == false){
      //Cuando es false, la habilitamos
      document.getElementById("txtIva").disabled = false;
      this.setState({ ckeckIva: true});
    }else{
      document.getElementById("txtIva").disabled = true;
      this.setState({ ckeckIva: false});
    }
  }

  addProducto(){
    //Obtenemos el div contenedor
    let getDiv = document.getElementById('divProductos');
    //Contamos la cantidad de select que existen.
    let contadorElementos = getDiv.getElementsByTagName('select').length+1;
    
    //Creamos los elementos que usaremos.
    let addDiv = document.createElement("div");
    let nameNewDiv = `conProducto${contadorElementos}`
    addDiv.id = nameNewDiv;
    addDiv.className = "elementProducts";
    
    //Lo concatenamos.
    addDiv.innerHTML += `<div id='conSelect${contadorElementos}'><label>Producto ${contadorElementos} </label></div><div id='txtProducto${contadorElementos}'><label>Cantidad</label></div>`;
    //Lo insertamos
    getDiv.appendChild(addDiv)

    //Creamos el select
    let getDivSelect = document.getElementById(`conSelect${contadorElementos}`);
    let newSelect = document.createElement("select");
    newSelect.name= `cboProducto${contadorElementos}`
    newSelect.id = `cboProducto${contadorElementos}`
    newSelect.className = "form-control"
    newSelect.onchange = this.getProductos.bind(this);

    getDivSelect.appendChild(newSelect)

    //Creamos el Input
    let getDivInput = document.getElementById(`txtProducto${contadorElementos}`);
    let newInput = document.createElement("input");
    newInput.name= `txtProducto${contadorElementos}`
    newInput.id = `txtProducto${contadorElementos}`
    newInput.className = "form-control"
    newInput.onchange = this.getProductos.bind(this);

    getDivInput.appendChild(newInput)

    //Obtenemos los productos.
    let datosProductos = this.state.productos;

    //Obtenemos el elemento a actualizar
    let cboProducto = document.getElementById(`cboProducto${contadorElementos}`);
    //Le creamos la primera validacion y campo.
    let opt = document.createElement("option");
    opt.value = 0;
    opt.textContent = "Select...";
    cboProducto.options.add(opt);

    for (let i = 0; i < datosProductos.length; i++) {
      let opt = document.createElement("option");
      opt.value = datosProductos[i].id;
      opt.textContent = datosProductos[i].nombreProducto;
      cboProducto.options.add(opt);
    }

  }

  deleteProducto(){
    //Obtenemos el id del div
    
    let getDelete = document.getElementById("divProductos");

    //Obtenemos el ultimo select con el largo
    let contadorElementos = getDelete.getElementsByTagName('select').length;
    //Validamos que existan elementos.
    if(contadorElementos > 0){
      //Concatenamos el ID del div que contiene los elementos.
      let concatNombreId = `conProducto${contadorElementos}`;
      //Eliminalos el div
      document.getElementById(concatNombreId).remove();
    }
    
  }

  render(){
    return(
      <div className="form-page">
        <h1> Nueva Factura</h1>
        <form>
          <div className = 'form-group'>
            <label>Numero de factura</label>
            <input onChange={e => this.change(e)} className='form-control' type='text' name='NumFactura'/>
          </div>
          <div className = 'form-group'>
            <label>Detalle</label>
            <textarea onChange={e => this.change(e)} name='detalle' className='form-control' id='txtDetalle' rows='3' aria-label="With textarea"/>
          </div>

          <div className = 'form-group'>
            <label>Tipo de factura</label>
            <select id='cboFactura' className='form-control' name='cboFactura' onChange={e => this.change(e)}  >
            </select>
          </div>
          <div className='form-group'>
            <label>Tipo de pago</label>
            <select id='cboTipoPago' className='form-control' name='cboTipoPago' onChange={e => this.change(e)}  >
            </select>
          </div>
          <div className = 'form-group'>
            <label>Fecha de documento</label>
            <input onChange={e => this.change(e)} className= 'form-control' type = 'date' name='fechaDocumento' value= {this.state.comuna}  />
          </div>
          <div className = 'form-group'>
            <label>Fecha de vencimiento</label>
            <input onChange={e => this.change(e)} className= 'form-control' type = 'date' name='fechaVencimiento' value= {this.state.ciudad}  />
          </div>
          <div className = 'form-group'>
            <label>Clientes</label>
            <select id='cboClientes' className = 'form-control' name='cboClientes' onChange={e => this.change(e)}>
            </select>
          </div>
          <div className='form-group'>
            <label>Productos</label>
            <div style={{height: "60px"}}>
               <div>
                  <img  className='img-options' src={deleteCbo} onClick={this.deleteProducto.bind(this)}/>
               </div>
               <div>
                  <img  className='img-options' src={addCbo} onClick={this.addProducto.bind(this)} />
               </div>
            </div>
            <div>
              <div id='divProductos'>

              </div>
            </div>
            <div>

            </div>
          </div>
          <div className='form-group'>
            <label>Total Bruto</label>
            <input className='form-control' type='text' name ='totalBruto' id='txtBruto' disabled/>
          </div>
          <div className = 'form-group'>
            <div style= {{width : '50%', display: 'inline-block'}}>
              <label>Iva</label>
              <input onChange={this.cambiarValores.bind(this)} className='form-control' id='txtIva' type='text' name='iva' placeholder="19%" disabled/>
            </div>
            <div className="form-check" style={{maxWidth : '50%', display: 'inline-block', marginLeft: '5%'}}>
              <input type="checkbox" onChange={this.handleChangeChk} />
              <label className="form-check-label">Cambiar IVA</label>
            </div>
          </div>
          <div className='form-group'>
            <label>Total Neto</label>
            <input className='form-control' type ='text' name='totalNeto' id='txtNeto' disabled/>
          </div>
          <button type='button' onClick={this.handleClick} className='btn btn-primary'> Guardar </button>
        </form>
      </div>
    );
  }
}

export default Factura;
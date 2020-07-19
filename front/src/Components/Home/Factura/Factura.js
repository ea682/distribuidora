import React from 'react';
import axios from 'axios';
import api from '../../config/Api';

import deleteCbo from '../../img/eliminar.svg';
import addCbo from '../../img/check.svg';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import './style.css';
import '../form.css';

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
      arrayProductos2: '',
      jsonClientes: ''
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
    //Obtenemos el array de los productos
    let getProductosSelect = this.state.arrayProductos;
    let listProductos = this.state.productos;
    let idGetProducto = 0;
    let idProducto = 0;
    let cantidad = 0;
    let precioUni = 0;
    let totalBruto = 0;
    let totalNeto = 0;
    for (let i = 0; i < getProductosSelect.length; i++) {
      //Obtenemos los valores del array de los prodcutos
      idGetProducto = getProductosSelect[i].selectValue;
      //Limpiamos la variables en caso de que se agrege el signo $
      cantidad = getProductosSelect[i].cantidad.replace('$','');
      precioUni = getProductosSelect[i].precio.replace('$','');
      if(cantidad > -1){

      }else{
        cantidad = 0
      }
      for (let u = 0; u < listProductos.length; u++) {
        idProducto = listProductos[u].id;
        if(idGetProducto == idProducto){

          //precioUni = listProductos[u].precioUnitario;
          totalNeto += precioUni*cantidad;
          break;
        }
      }
    }
    //Le enviamos el total neto al usuario.
    document.getElementById('txtNeto').value = `$${totalNeto}`;

    //Obtenemos el IVA
    let iva = document.getElementById("txtIva").value;

    //Validaciones que el iva no este vacio.
    if(iva.length == 0){
      iva = 19;
    }else{
      try {
        iva = parseInt(iva.replace('%',''));
      } catch (error) {
        
      }
      //validamos que el usuario ingreso un puro digito, esto represneta numeros menor al 9
      if(iva.toString().length == 1){
        iva = `0${iva}`;
        document.getElementById("txtIva").value = iva;
      }else{
        document.getElementById("txtIva").value = iva;
      }
    }
    iva =  `1.${iva}`;
    totalBruto = totalNeto*iva;
    //Entregamos el bruto al usuario para visualizar.
    document.getElementById('txtBruto').value= `$${totalBruto}`;
  }

  getProductos(){
    //Obtenemos los elementos dentro del divProductos
    let elementsProductos = document.getElementById('divProductos');
    //Obtenemos los elementos a usar
    let getSelects = elementsProductos.getElementsByTagName('select');
    let getTxt = elementsProductos.getElementsByTagName('input');
    
    let arrayDatos = [];
    let arrayDatos2 = [];

    //Al obtener el los input, obtenemos 2 por elemento creado, le indicamos que haga un contador para poder tomar cada uno de los elementos.
    let contadorCantidad = 0;
    let contadorPrecio = 1;

    //Recorremos todo los productos.
    for (let i = 0; i < getSelects.length; i++){

      //Obtenemos los datos de los productos agregados
      let datoSelect = getSelects[i].value;
      let datoInput = getTxt[contadorCantidad].value;
      let datoPrecio = getTxt[contadorPrecio].value;
      
      let newArray = [];

      //Guardamos en 2 array, uno se guardara para uso de de los datos a mostrar total neto y bruto y el otro se enviara a la BD.
      newArray.push(datoSelect);
      newArray.push(datoInput);
      newArray.push(datoPrecio);
      arrayDatos2.push(newArray);

      //Se concatenan los productos.
      let concatenar = {selectValue : datoSelect, cantidad : datoInput, precio : datoPrecio }
      arrayDatos.push(concatenar);

      contadorCantidad = contadorCantidad+2;
      contadorPrecio = contadorPrecio +2;
    }
    //Guardamos en la state y les damos sus usos.
    this.setState({ arrayProductos : arrayDatos});
    this.setState({ arrayProductos2 : arrayDatos2});
    this.cambiarValores();
  }

  //Insertamos los datos.
  handleClick =(e)=>{
    let datos = this.state;
    
    axios.post(`${api}/api/factura/${datos.NumFactura}/${datos.cboFactura}/${datos.cboTipoPago}/${datos.fechaDocumento}/${datos.fechaVencimiento}/${datos.cboClientes}/${this.state.arrayProductos2}/${datos.iva}`)
    .then(res => {
      let data = res.data.data;
      console.log(data.data);
      console.log(data);
      if(data != false && data != "error"){
        this.resultOK();
      }else{
        if(data != false){
          this.resultCreado();
        }else{
          this.resultError();
        }
      }
    })
    .catch(err => {
      this.resultError();
    })
  }
  //Obtenemos los clientes y la agregamos al HTML
  llenarClientes(){
    axios.get(api+'/api/clientes', {
    }).then(res => {
      let clientes = res.data.clientes;
      this.setState({ jsonClientes : clientes});
      console.log(this.state.jsonClientes);
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
      document.getElementById("txtIva").value = "19%";
      this.cambiarValores();
      document.getElementById("txtIva").disabled = true;
      this.setState({ ckeckIva: false});
    }
  }

  //Actualizamos el precio por cambios en el CBO de los productos.
  updatePrecio(e){
    let idCbo = e.target.id;
    let indicadorTxt = e.target.name;
    //Obetenmos la option elegida.
    let valorOption = document.getElementById(idCbo).selectedIndex;
    let valor = document.getElementById("cboProducto1").options[valorOption].value

    //Recorremos dentor de los productos y buscamos el ID elegido
    for (let i = 0; i < this.state.productos.length; i++) {
      let datos = this.state.productos;
      if(datos[i].id == valor){
        //Obtenemos el valor y se lo enviamos al usuario.
        document.getElementById(`txtPrecio${indicadorTxt}`).value= `$${datos[i].precioUnitario}`;
        console.log(datos[i].precioUnitario);
        console.log(`precio${indicadorTxt}`);
      }
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
    addDiv.innerHTML += `<div id='conSelect${contadorElementos}'><label>Producto ${contadorElementos} </label></div><div id='txtProducto${contadorElementos}'><label>Cantidad</label></div><div id='precio${contadorElementos}'><label>Precio Producto ${contadorElementos}</label></div>`;
    //Lo insertamos
    getDiv.appendChild(addDiv)

    //Creamos el select
    let getDivSelect = document.getElementById(`conSelect${contadorElementos}`);
    let newSelect = document.createElement("select");
    //newSelect.name= `cboProducto${contadorElementos}`
    newSelect.name= `${contadorElementos}`
    newSelect.id = `cboProducto${contadorElementos}`
    newSelect.className = "form-control"
    newSelect.onchange = this.getProductos.bind(this);
    newSelect.onchange = this.updatePrecio.bind(this);

    getDivSelect.appendChild(newSelect)

    //Creamos el Input del producto
    let getDivInput = document.getElementById(`txtProducto${contadorElementos}`);
    let newInput = document.createElement("input");
    newInput.name= `txtProducto${contadorElementos}`
    newInput.id = `txtProducto${contadorElementos}`
    newInput.className = "form-control"
    newInput.value=0
    newInput.onchange = this.getProductos.bind(this);

    getDivInput.appendChild(newInput)

    //Creamos el Input del precio
    let getDivInput2 = document.getElementById(`precio${contadorElementos}`);
    let newInputPrecio = document.createElement("input");
    newInputPrecio.name= `txtPrecio${contadorElementos}`
    newInputPrecio.id = `txtPrecio${contadorElementos}`
    newInputPrecio.className = "form-control"
    newInputPrecio.onchange = this.getProductos.bind(this);

    getDivInput2.appendChild(newInputPrecio)

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
    let elementoContent = document.getElementById('nuevaFactura');

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
    let elementoContent = document.getElementById('nuevaFactura');

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
    let elementoContent = document.getElementById('nuevaFactura');

    //Creamos el elemento y le damos las propiedades.
    let addDiv = document.createElement("div");
    addDiv.className = "divError divMsj";
    addDiv.id = "elementoDesplegado";
    addDiv.innerHTML += "<label>Error para crear Vendedor</label>";
    
    
    elementoContent.appendChild(addDiv);
    this.deleteElement("elementoDesplegado");
  }

  render(){
    return(
      <div id="nuevaFactura" className="form-page">
        <h1> Nueva Factura</h1>
        <form>
          <table>
            <tr>
              <td>
                <font>
                  <div className = 'form-group'>
                    <label>Numero de factura</label>
                    <input onChange={e => this.change(e)} className='form-control' type='text' name='NumFactura'/>
                  </div>
                </font>
              </td>
              <td></td><td></td><td></td><td></td>
              <td>
                <font>
                  <div className = 'form-group'>
                    <label>Tipo de factura</label>
                    <select id='cboFactura' className='form-control' name='cboFactura' onChange={e => this.change(e)}  >
                    </select>
                  </div>
                </font>
              </td>
              <td></td><td></td><td></td><td></td>
              <td>
                <font>
                  <div className='form-group'>
                    <label>Tipo de pago</label>
                    <select id='cboTipoPago' className='form-control' name='cboTipoPago' onChange={e => this.change(e)}  >
                    </select>
                  </div>
                </font>
              </td>
            </tr>
            <tr>
              <td>
                <font>
                  <div className = 'form-group'>
                    <label>Fecha de documento</label>
                    <input onChange={e => this.change(e)} className= 'form-control' type = 'date' name='fechaDocumento' value= {this.state.comuna}  />
                  </div>
                </font>
              </td>
              <td></td><td></td><td></td><td></td>
              <td>
                <font>
                  <div className = 'form-group'>
                    <label>Fecha de vencimiento</label>
                    <input onChange={e => this.change(e)} className= 'form-control' type = 'date' name='fechaVencimiento' value= {this.state.ciudad}  />
                  </div>
                </font>
              </td>
              <td></td><td></td><td></td><td></td>
              <td>
                <font>
                  <div className = 'form-group'>
                    <label>Clientes</label>
                    <Autocomplete
                      id="cboClientes"
                      name="cboClientes"
                      options={this.state.jsonClientes}
                      getOptionLabel={(option) => option.nombreCliente}
                      style={{ width: 300 }}
                      renderInput={(params) => <TextField {...params} label="Combo box" variant="outlined" 
                      onChange={e => this.change(e)}/>}
                    />
              </div>
                </font>
              </td>
            </tr>
          </table>
         
          
          
          
          
          
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
            <label>Total Neto</label>
            <input className='form-control' type='text' name ='totalNeto' id='txtNeto' disabled/>
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
            <label>Total Bruto</label>
            <input className='form-control' type ='text' name='totalBruto' id='txtBruto' disabled/>
          </div>
          <button type='button' onClick={this.handleClick} className='btn btn-primary'> Guardar </button>
        </form>
      </div>
    );
  }
}

export default Factura;
import React from 'react';
import axios from 'axios';
import api from '../../config/Api';


class Vendedor extends React.Component{
  state = {};

  //Se ejecutan antes de renderizar el componente.
  componentDidMount(){
    //Validamos Token
    this.cboBancos();
    
    //Agregamos los datos antes de montar el componente
    
  }


  change(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  handleClick =(e)=>{
    let datos = this.state;
    let url = "";
    if(datos.length === 4){
      url = `${api}/api/pagos/${datos.fecha}/ /${datos.monto}/1/${datos.idFa}/${datos.total}`
    }else{
      url = `${api}/api/pagos/${datos.fecha}/ /${datos.monto}/2/${datos.idFa}/${datos.total}`
    }
    console.log(datos)
    axios.post(url)
    .then(res => {
      console.log(res.data.message);
      return res.data.message;
    })
    .catch(err => {
      console.log(err);
    })
  }

  llenarDatos(razonSocial, bruto, numeroFactura, tipoFactua){
    //Llenamos los datos input con los datos de la cuenta
    //document.getElementsByName("numeroFactura")[0].value = numeroFactura;
    document.getElementsByName("razonSocial")[0].value = razonSocial;
    document.getElementsByName("total")[0].value = bruto;
    
    let cboProducto = document.getElementsByName(`cboTipoPago`)[0];

    for (let i = 0; i < 1; i++) {
      let opt = document.createElement("option");
      opt.value = i;
      opt.textContent = tipoFactua;
      cboProducto.options.add(opt);
    }
  }

  cboBancos(){
    let status = document.getElementById("cboTipoDocumento").selectedIndex;
    console.log(status);
    if(status === 0){
      document.getElementById("contenedorCboBanco").style.display = "none";
    }else{
      document.getElementById("contenedorCboBanco").style.display = "block";
    }
    //document.getElementsByName("numeroFactura")[0].style.display = "none";
  }

  getFactura =(e)=>{
    let numeroCuentaBuscar = e.target.value;
    axios.post(`${api}/api/factura/buscarFactura/${numeroCuentaBuscar}`)
    .then(res => {
      let datos = res.data.data;
      if(datos.length === 1){
        this.setState({cuenta : datos[0].numeroFactura});
        let razonSocial = datos[0].nombreCliente;
        let bruto = datos[0].totalBruto;
        let numeroFactura = datos[0].nFactura;
        let tipoFactua = datos[0].nombreTipoFactura;
        this.setState({total : datos[0].totalBruto})
        this.setState({idFa : datos[0].idFactura});
        console.log(datos);
        this.llenarDatos(razonSocial, bruto, numeroFactura, tipoFactua);
        return res.data;
      }else{
        console.log("muchos datos");
      }
      
    })
    .catch(err => {
      console.log(err);
    })
  }
  render(){
    return(
        <div className="form-page" id="newPagos">
        <h1> Nuevo Pagos</h1>
        <form>
          <div className = 'form-group'>
            <label>numero de Factura</label>
            <input className='form-control' type='text' name='numeroFactura' onChange = {this.getFactura}/>
          </div>
          <div className='form-group'>
            <label>Tipo de factura</label>
            <select id='cboTipoPago' className='form-control' name='cboTipoPago'>
            </select>
          </div>
          <div className='form-group'>
            <label>Tipo de Documento</label>
            <select id='cboTipoDocumento' className='form-control' name='cboTipoDocumeto' onChange = {this.cboBancos}>
              <option value="0">Pago Manual</option>
              <option value="1">Checke</option>
            </select>
          </div>
          <div className='form-group' id="contenedorCboBanco">
            <label>Banco</label>
            <select id='cboBanco' className='form-control' name='cboBanco' onChange={e => this.change(e)}>
              <option value="">Selecionar</option>
              <option value="Banco de Chile">Banco de Chile</option>
              <option value="Banco Internacional">Banco Internacional</option>
              <option value="Scotiabank Chile">Scotiabank Chile</option>
              <option value="Banco de Crédito e Inversiones">Banco de Crédito e Inversiones</option>
              <option value="Corpbanca">Corpbanca</option>
              <option value="Banco Bice">Banco Bice</option>
              <option value="HSBC Bank (Chile)">HSBC Bank (Chile)</option>
              <option value="Banco Santander">Banco Santander</option>
              <option value="Banco Itaú Chile">Banco Itaú Chile</option>
              <option value="Banco Security">Banco Security</option>
              <option value="Deutsche Bank">Deutsche Bank</option>
              <option value="Banco RIpley">Banco Ripley</option>
              <option value="Rabobank Chile">Rabobank Chile</option>
              <option value="Banco Consorcio">Banco Consorcio</option>
              <option value="Banco Penta">Banco Penta</option>
              <option value="Banco Paris">Banco Paris</option>
              <option value="Banco BTG Pactual Chile">Banco BTG Pactual Chile</option>
            </select>
          </div>
          <div className = 'form-group'>
            <label>Razon social</label>
            <input className= 'form-control' type = 'text' name = 'razonSocial' readonly="readonly" />
          </div>
          <div className = 'form-group'>
            <label>Total</label>
            <input className= 'form-control' type = 'text' name = 'total' readonly="readonly" onChange={e => this.change(e)} />
          </div>
          <div className = 'form-group'>
            <label>Monto</label>
            <input className= 'form-control' type = 'text' name = 'monto' onChange={e => this.change(e)}/>
          </div>
          <div className = 'form-group'>
            <label>Fecha</label>
            <input className= 'form-control' type = 'date' name = 'fecha' onChange={e => this.change(e)}/>
          </div>
          <div className = 'form-group'>
            <label>id hoja de ruta</label>
            <input className= 'form-control' type = 'number' name = 'hojaRuta' onChange={e => this.change(e)}/>
          </div>
          <button type = 'button' onClick ={this.handleClick} className = 'btn btn-primary'> Guardar </button>
        </form>
      </div>
    );
  }
}

export default Vendedor;
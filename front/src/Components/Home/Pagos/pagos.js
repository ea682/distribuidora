import React from 'react';
import axios from 'axios';
import api from '../../config/Api';


class pagos extends React.Component{
  
  constructor(props) {
    super(props);
    this.change = this.change.bind(this);
    this.llenarDatos = this.llenarDatos.bind(this);
    this.consultaCuenta = this.consultaCuenta.bind(this);
    this.validarMontoYbruto = this.validarMontoYbruto.bind(this);
    this.addMonto = this.addMonto.bind(this);
  }

  change(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  //Se ejecutan antes de renderizar el componente.
  componentDidMount(){
    //Validamos Token
    
    this.validateToken()
    //Agregamos los datos antes de montar el componente
    
  }

  validateToken(){

    //Obtenemos el token del storage
    let token = localStorage.getItem('cool-jwt');
    axios.post(`${api}/api/auth/${token}`, {
      //Obciones axios o http
    })
    .then(res => {

      //Obtenemos el resultado.
      let valToken = res.data.access_token;

      //Validamos.
      if(valToken === true){
        this.llenarRegiones();
        this.getVendedor();
      }
      else{
        //Limpiamos el storage y redirecinamos
        localStorage.clear();
        window.location.href = "/Login";
        
      }
    })
    .catch(err => {
      console.log(err);
    })
  }

  llenarDatos(razonSocial, bruto){
    document.getElementsByName("razonSocial")[0].value = razonSocial;
    document.getElementsByName("totalBruto")[0].value = bruto;
  }

  validarMontoYbruto(bruto){
    document.getElementsByName("monto")[0].value = bruto;
    document.getElementsByName("saldoDocumento")[0].value = 0;
  }

  addMonto(e){

    this.setState({
      [e.target.name]: e.target.value
    });
    let monto = e.target.value;
    let bruto = document.getElementsByName("totalBruto")[0].value;

    let subTotal = bruto - monto;
    document.getElementsByName("saldoDocumento")[0].value = subTotal;

    if(subTotal < 0){
      alert("No se puede guardar por que es negativo");
    }
  }
  
  consultaCuenta(e){
    let numeroCuentaBuscar = e.target.value;

    fetch(`${api}/api/factura/buscarFactura/${numeroCuentaBuscar}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(datos => datos.json())
    .then((result) => {
      try {
        console.log(result.data[0]);
        let datosR = result.data[0];
        let rz = datosR['nombrecliente'];
        let bruto = datosR['totalBruto'];
        let tipoFactura = datosR['nombretipofactura'];
        let codigoFactura = datosR['idFactura'];

        this.setState({
          totalBruto : bruto,
          codigoFactura : codigoFactura
        });
        console.log(tipoFactura + 'hola');
        this.llenarDatos(rz, bruto);

        let cboVendedores = document.getElementById("cboTipoPago");
        let opt = document.createElement("option");
        opt.value = 0;
        opt.id = "cbopTipo";
        opt.textContent = tipoFactura;
        cboVendedores.options.add(opt);

      } catch (error) {
        this.llenarDatos("", "");
        //let concatNombreId = `conProducto${contadorElementos}`;
        //Eliminalos el div
        //document.getElementById('cbopTipo').remove();
      }
    },
    (error) => {
      
    })
    this.llenarDatos("", "");
    //document.getElementById('cbopTipo').remove();
  }

  handleClick =(e)=>{
    let numeroFactura = document.getElementsByName("numeroFactura")[0].value
    if(numeroFactura !== ""){
      let monto = document.getElementsByName("monto")[0].value
      if(monto !== ""){
        if(monto >= 0){
          let Fecha = document.getElementsByName("fecha")[0].value;
          if(Fecha !== ""){
            let subTotal = document.getElementsByName("saldoDocumento")[0].value;
            if(subTotal >= 0 ){
              let hojaRuta = document.getElementsByName("hojaRuta")[0].value
              if(hojaRuta !== ""){
                let datos = this.state;
                console.log(datos);
                axios.post(`${api}/api/pagos/${datos.fecha}/${datos.monto}/${datos.codigoFactura}/${datos.totalBruto}`)
                .then(res => {
                  console.log(datos);
                })
                .catch(err => {
                  this.resultError();
                });
              }else{
                alert("No sea a ingresado informacion en el campo Id hoja Ruta");
              }
            }else{
              alert("El saldo del documento no puede ser negativo");
            }
          }else{
            alert("No sea a ingresado informacion en el campo Fecha");
          }
        }else{
          alert("No se puede ingresar el campo monto menor a 0")
        }
      }else{
        alert("No sea a ingresado informacion en el campo monto");
      }
    }else{
      alert("No sea a ingresado informacion en el campo Numero de Factura");
    }
  }

  render(){
    return(
      <div className="form-page" id="newPagos">
        <h1> Nuevo Pagos</h1>
        <form>
          <table>
            <tbody>
              <tr>
                <td>
                  <div className = 'form-group'>
                    <font>
                      <label>numero de Factura</label>
                      <input className='form-control' type='text' name='numeroFactura' onChange={this.consultaCuenta}/>
                    </font>
                  </div>
                </td>
                <td></td><td></td><td></td><td></td>
                <td>
                  <div className='form-group'>
                    <font>
                      <label>Tipo de Factura</label>
                      <select id='cboTipoPago' className='form-control' name='cboTipoPago'>
                      </select>
                    </font>
                  </div>
                </td>
                <td></td><td></td><td></td><td></td>
                <td>
                  <font>
                    <div className = 'form-group'>
                    <label>Razon social</label>
                    <input className='form-control' type='text' name='razonSocial' readOnly="readonly" />
                    </div>
                  </font>
                </td>
              </tr>
              <tr>
                <td>
                  <font>
                    <div className = 'form-group'>
                      <label>Total Bruto</label>
                      <input className='form-control' type='text' name='totalBruto' readOnly="readonly" />
                    </div>
                  </font>
                </td>
                <td></td><td></td><td></td><td></td>
                <td>
                  <font>
                    <div className = 'form-group'>
                      <label>Monto</label>
                      <input className='form-control' type='number' name='monto' onChange={this.addMonto}/>
                    </div>
                  </font>
                </td>
                <td></td><td></td><td></td><td></td>
                <td>
                  <font>
                    <div className = 'form-group'>
                      <label>Fecha</label>
                      <input className='form-control' type='date' name='fecha' onChange={this.change}/>
                    </div>
                  </font>
                </td>
              </tr>
              <tr>
                <td>
                  <font>
                    <div className = 'form-group'>
                      <label>Saldo documento</label>
                      <input className= 'form-control' type='text' name='saldoDocumento' readOnly="readonly"/>
                    </div>
                  </font>
                </td>
                <td></td><td></td><td></td><td></td>
                <td>
                  <font>
                    <div className = 'form-group'>
                      <label>id hoja de ruta</label>
                      <input className='form-control' type='number' name = 'hojaRuta' onChange={this.change}/>
                    </div>
                  </font>
                </td>
                <td></td><td></td><td></td><td></td>
              </tr>
            </tbody>
          </table>
          <button type = 'button' onClick ={this.handleClick} className = 'btn btn-primary'> Guardar </button>
        </form>
      </div>
    );
  }
}

export default pagos;

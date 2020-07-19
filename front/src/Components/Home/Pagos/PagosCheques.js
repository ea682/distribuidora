import React from 'react';
import axios from 'axios';
import api from '../../config/Api';


class PagosCheques extends React.Component{
  
  constructor(props) {
    super(props);
    this.change = this.change.bind(this);
    this.consultaCuenta = this.consultaCuenta.bind(this);
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
        let tipoFactura = datosR['nombreTipoFactura'];
        let codigoFactura2 = datosR['idFactura'];
        

        this.setState({
          codigoFactura : codigoFactura2
        });

        let cboVendedores = document.getElementById("cboTipoPago");
        let opt = document.createElement("option");
        opt.value = 0;
        opt.id = "cbopTipo";
        opt.textContent = tipoFactura;
        cboVendedores.options.add(opt);

      } catch (error) {
        //let concatNombreId = `conProducto${contadorElementos}`;
        //Eliminalos el div
        //document.getElementById('cbopTipo').remove();
      }
    },
    (error) => {
      
    })
    //document.getElementById('cbopTipo').remove();
  }

  handleClick =(e)=>{
    let datos = this.state;
    let banco = document.getElementById("cboBanco").value;
    console.log(datos);
    axios.post(`${api}/api/pagos/cheques/${datos.fecha}/${banco}/${datos.hojaRuta}/${datos.monto}/${datos.codigoFactura}`)
    .then(res => {
      console.log(datos);
    })
    .catch(err => {
      console.log(err);
    })
  }

  render(){
    return(
      <div className="form-page" id="newPagos">
        <h1> Nuevo Pagos Cheques</h1>
        <form>
            <table>
                <tr>
                    <td>
                        <div className = 'form-group'>
                        <font>
                            <label>numero de cheque</label>
                            <input className= 'form-control' type = 'text' name = 'numeroFactura' onChange={this.change}/>
                        </font>
                        </div>
                    </td>
                    <td></td><td></td><td></td><td></td>
                    <td>
                        <div className='form-group'>
                            <font>
                            <label>Banco</label>
                            <select id='cboBanco' className='form-control' name='banco'>
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
                            <option value="Banco Falabella">Banco Falabella</option>
                            <option value="Banco BTG Pactual Chile">Banco BTG Pactual Chile</option>
                            </select>
                            </font>
                        </div>
                    </td>
                    <td></td><td></td><td></td><td></td>
                    <td>
                        <font>
                        <div className = 'form-group'>
                            <label>numero de factura</label>
                            <input className='form-control' type='text' name='numero de factura' onChange={this.consultaCuenta}/>
                        </div>
                        </font>
                    </td>
                </tr>
                <tr>
                    <td>
                        <font>
                            <div className = 'form-group'>
                                <label>Tipo de Factura</label>
                                <select id='cboTipoPago' className='form-control' name='cboTipoPago'>
                                </select>
                            </div>
                        </font>
                    </td>
                    <td></td><td></td><td></td><td></td>
                    <td>
                        <font>
                            <div className = 'form-group'>
                                <label>Fecha vencimiento</label>
                                <input className= 'form-control' type = 'date' name = 'fecha' onChange={this.change}/>
                            </div>
                        </font>
                    </td>
                    <td></td><td></td><td></td><td></td>
                    <td>
                        <font>
                        <div className = 'form-group'>
                            <label>Monto a pagar</label>
                            <input className= 'form-control' type = 'number' name = 'monto' onChange={this.change}/>
                        </div>
                        </font>
                    </td>
                </tr>
                <tr>
                    <td>
                        <font>
                        <div className = 'form-group'>
                            <label>hoja de ruta</label>
                            <input className= 'form-control' type = 'number' name = 'hojaRuta' onChange={this.change}/>
                        </div>
                        </font>
                    </td>
                    <td></td><td></td><td></td><td></td>
                </tr>
            </table>
            <button type = 'button' onClick ={this.handleClick} className = 'btn btn-primary'> Guardar </button>
        </form>
      </div>
    );
  }
}

export default PagosCheques;

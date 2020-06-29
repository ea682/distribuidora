import React from 'react';
import axios from 'axios';
import api from '../../config/Api';


class pagos extends React.Component{
  
  constructor(props) {
    super(props);
    this.change = this.change.bind(this);
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
  
  render(){
    return(
      <div className="form-page" id="newPagos">
        <h1> Nuevo Pagos</h1>
        <form>
          <div className = 'form-group'>
            <label>numero de Factura</label>
            <input className= 'form-control' type = 'text' name = 'numeroFactura'/>
          </div>
          <div className='form-group'>
            <label>Tipo de factura</label>
            <select id='cboTipoPago' className='form-control' name='cboTipoPago'>
            </select>
          </div>
          <div className='form-group'>
            <label>Banco</label>
            <select id='cboTipoPago' className='form-control' name='cboTipoPago'>
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
            <input className= 'form-control' type = 'text' name = 'total' readonly="readonly" />
          </div>
          <div className = 'form-group'>
            <label>Monto</label>
            <input className= 'form-control' type = 'text' name = 'monto'/>
          </div>
          <div className = 'form-group'>
            <label>Fecha</label>
            <input className= 'form-control' type = 'date' name = 'monto'/>
          </div>
          <div className = 'form-group'>
            <label>id hoja de ruta</label>
            <input className= 'form-control' type = 'number' name = 'monto'/>
          </div>
          <button type = 'button' onClick ={this.handleClick} className = 'btn btn-primary'> Guardar </button>
        </form>
      </div>
    );
  }
}

export default pagos;

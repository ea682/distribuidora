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
          <table>
            <tr>
              <td>
                <div className = 'form-group'>
                  <font>
                    <label>numero de Factura</label>
                    <input className= 'form-control' type = 'text' name = 'numeroFactura'/>
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
                  <input className= 'form-control' type = 'text' name = 'razonSocial' readonly="readonly" />
                  </div>
                </font>
              </td>
            </tr>
            <tr>
              <td>
                <font>
                  <div className = 'form-group'>
                    <label>Total Bruto</label>
                    <input className= 'form-control' type = 'text' name = 'total' readonly="readonly" />
                  </div>
                </font>
              </td>
              <td></td><td></td><td></td><td></td>
              <td>
                <font>
                  <div className = 'form-group'>
                    <label>Monto</label>
                    <input className= 'form-control' type = 'number' name = 'monto'/>
                  </div>
                </font>
              </td>
              <td></td><td></td><td></td><td></td>
              <td>
                <font>
                  <div className = 'form-group'>
                    <label>Fecha</label>
                    <input className= 'form-control' type = 'date' name = 'fecha'/>
                  </div>
                </font>
              </td>
            </tr>
            <tr>
              <td>
                <font>
                  <div className = 'form-group'>
                    <label>Saldo documento</label>
                    <input className= 'form-control' type = 'text' name = 'monto' readonly="readonly"/>
                  </div>
                </font>
              </td>
              <td></td><td></td><td></td><td></td>
              <td>
                <font>
                  <div className = 'form-group'>
                    <label>id hoja de ruta</label>
                    <input className= 'form-control' type = 'number' name = 'monto'/>
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

export default pagos;

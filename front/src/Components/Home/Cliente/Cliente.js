import React from 'react';
import axios from 'axios';
import api from '../../config/Api';


class Cliente extends React.Component{
  
  constructor(props) {
    super(props);

    this.state = {
      rut : '',
      nombre : '',
      direccion : '',
      telefono : '',
      giro : '',
      comunas : '',
      idVendedor : ''
    };

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
  //Obtenemos las regiones y la agregamos al HTML
  llenarRegiones(){
    axios.get(api+'/api/localizacion/', {
    }).then(res => {
      let datos = res.data.regiones;

      let cboRegiones = document.getElementById("cboRegion");

      //Creamos la optcion seleccionar
      let opt = document.createElement("option");
      opt.value = 0;
      opt.textContent = "Select...";
      cboRegiones.options.add(opt);

      for (let i = 0; i < datos.length; i++) {
        //Creamos elemento
        opt = document.createElement("option");
        //Le damos valor
        opt.value = datos[i].id;
        //Le damos el texto
        opt.textContent = datos[i].NombreRegion;
        cboRegiones.options.add(opt);
        //const element = array[index];
        
      }
      return res.data.regiones;
    })
    .catch(err => {
      console.log(err);
    });
  }

  getProvincias = (e) =>{

    let idRegion = e.target.value;
    axios.post(api+`/api/localizacion/${idRegion}`, {
    }).then(res => {
      

      //Eliminamos la comuna por nuevas consultas.
      let cboComunas = document.getElementById("cboComuna");
      //Eliminamos los elementos antiguos
      let cantidadComunas = cboComunas.options.length;
      for (let e = 0; e < cantidadComunas; e++) {
        cboComunas.remove(cboComunas.selectedIndex);
      }

      let datos = res.data.provincias;
      let cboProvincias = document.getElementById("cboProvincia");

      //Eliminamos los elementos antiguos
      let cantidadDatos = cboProvincias.options.length;
      for (let e = 0; e < cantidadDatos; e++) {
        cboProvincias.remove(cboProvincias.selectedIndex);
      }

      //Creamos primer campo
      let opt = document.createElement("option");
      opt.value = 0;
      opt.textContent = "Select...";
      cboProvincias.options.add(opt);

      for (let i = 0; i < datos.length; i++) {
        //Creamos elemento
        opt = document.createElement("option");
        //Le damos valor
        opt.value = datos[i].id;
        //Le damos el texto
        opt.textContent = datos[i].NombreProvincia;
        //Agregamos los elementos
        cboProvincias.options.add(opt);
        //const element = array[index];
        
      }
      return res.data.regiones;
    })
    .catch(err => {
      console.log(err);
    });
  }
  
  getComunas = (e) =>{
    
    let idProvincia = e.target.value;
    axios.post(api+`/api/localizacion/comunas/${idProvincia}`, {
    }).then(res => {
      let cboComunas = document.getElementById("cboComuna");
      //Eliminamos los elementos antiguos
      let cantidadDatos = cboComunas.options.length;
      for (let e = 0; e < cantidadDatos; e++) {
        cboComunas.remove(cboComunas.selectedIndex);
      }

      let datos = res.data.comunas;
      

      //Creamos primer campo
      let opt = document.createElement("option");
      opt.value = 0;
      opt.textContent = "Select...";
      cboComunas.options.add(opt);

      
      for (let i = 0; i < datos.length; i++) {
        //Creamos elemento
        opt = document.createElement("option");
        //Le damos valor
        opt.value = datos[i].id;
        //Le damos el texto
        opt.textContent = datos[i].NombreComunas;
        //Agregamos los elementos

        cboComunas.options.add(opt);
        //const element = array[index];
        
      }

      //Guardamos al tipoCliente
      let idCliente = document.getElementById('Tipo_Cliente').value;
      this.setState({
        tipoClientes : idCliente
      });
      return res.data.regiones;
    })
    .catch(err => {
      console.log(err);
    });
  }
  
  //Guardamos la comuna
  saveComuna = (e) => {

    let idComuna = e.target.value;
    this.setState({
      comunas : idComuna
    });
  }

  //Guardamos el vendedor
  setVendedor = (e) => {

    let idVendedor = e.target.value;
    this.setState({
      idVendedor : idVendedor
    });

  }

  getVendedor(){
    axios.get(api+'/api/vendedor/', {
    }).then(res => {
      let datos = res.data.vendedores;

      let cboVendedor = document.getElementById("cboVendedor");

      //Creamos la optcion seleccionar
      let opt = document.createElement("option");
      opt.value = 0;
      opt.textContent = "Select...";
      cboVendedor.options.add(opt);

      for (let i = 0; i < datos.length; i++) {
        //Creamos elemento
        opt = document.createElement("option");
        //Le damos valor
        opt.value = datos[i].id;
        //Le damos el texto
        opt.textContent = datos[i].nombreVendedor;
        cboVendedor.options.add(opt);
        //const element = array[index];
        
      }
    })
    .catch(err => {
      console.log(err);
    });
  }

  handleClick =(e)=>{
    let rut = document.getElementsByName("rut")[0].value
    if(rut !== ""){
      let nombre = document.getElementsByName("nombre")[0].value
      if(nombre !== ""){
        let direccion = document.getElementsByName("direccion")[0].value
        if(direccion !== ""){
          let giro = document.getElementsByName("giro")[0].value
          if(giro !== ""){
            let datosCliente = this.state;
            console.log(datosCliente);
            axios.post(`${api}/api/clientes/${datosCliente.rut}/${datosCliente.nombre}/${datosCliente.direccion}/${datosCliente.telefono}/${datosCliente.giro}/${datosCliente.comunas}/${datosCliente.idVendedor}`, {})
            .then(res => {
              let result = res.data.messaje;
              console.log(result);

              //Valimos el resultado de la consulta.
              if(result !== false){
                alert("Datos ingresados");
              }else{
                alert("El Cliente ya fue ingresado");
              }
            })
            .catch(err => {
              alert('Error al procesar la solicitudad');
            });
          }else{
            alert("No sea a ingresado informacion en el campo Giro")
          }
        }else{
          alert("No sea a ingresado informacion en el campo Direccion")
        }
      }else{
        alert("No sea a ingresado informacion en el campo Nombre")
      }
    }else{
      alert("No sea a ingresado informacion en el campo Rut")
    }
  }

  render(){
    return(
      <div className="form-page" id="newClient">
        <h1> Nuevo Cliente</h1>

        <form>
          <div className = 'form-group'>
            <label>Rut</label>
            <input onChange={e => this.change(e)} className= 'form-control' type = 'text' name = 'rut' value= {this.state.rut}  />
          </div>
          <div className = 'form-group'>
            <label>Nombre</label>
            <input onChange={e => this.change(e)} className= 'form-control' type = 'text' name = 'nombre' value= {this.state.nombre} />
          </div>
          <div className = 'form-group'>
            <label>Dirección</label>
            <input onChange={e => this.change(e)} className= 'form-control' type = 'text' name = 'direccion' value= {this.state.direccion}  />
          </div>
          <div className='form-group'>
            <label>Telefono</label>
            <input onChange={e => this.change(e)} className='form-control' type='text' name ='telefono' value= {this.state.telefono}  />
          </div>
          <div className = 'form-group' >
            <label>Vendedor</label>
            <select className="form-control" id="cboVendedor" onChange = {this.setVendedor} value= {this.state.idVendedor}>
            </select>
          </div>
          <div className = 'form-group' >
            <label>Region</label>
            <select className="form-control" id="cboRegion" onChange = {this.getProvincias} value= {this.state.region}>
            </select>
          </div>
          <div className = 'form-group'>
            <label>Provincia</label>
            <select className="form-control" id="cboProvincia" onChange = {this.getComunas}> 
            </select>
          </div>
          <div className = 'form-group'>
            <label>Comuna</label>
            <select className="form-control" id="cboComuna" onChange = {e => this.saveComuna(e)}>
            </select>
          </div>
          <div className = 'form-group'>
            <label>Giro</label>
            <input onChange={e => this.change(e)} className= 'form-control' type = 'text' name = 'giro' value= {this.state.giro}  />
          </div>
          

          <button type = 'button' onClick ={this.handleClick} className = 'btn btn-primary'> Guardar </button>
        </form>
      </div>
    );
  }
}

export default Cliente;
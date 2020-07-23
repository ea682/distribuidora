import React from "react";
import api from '../../config/Api';
// import "react-tabulator/lib/styles.css"; // default theme
import "react-tabulator/lib/css/bootstrap/tabulator_bootstrap.min.css"; // use Theme(s)
import { React15Tabulator } from "react-tabulator"; // for React 15.x
import './clientes.css';




class ListClientes extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: ''}
  }

  //Cargamos los datos de la tabla.
  componentDidMount(){
    
    fetch(api+'/api/clientes/getTablaCliente')
      .then((response) => {
        return response.json()
      })
      .then((datos) => {
        datos = datos.clientes;
        let row = [];
        for (let i = 0; i < datos.length; i++) {
            //Guardamos los datos en un array
            row.push({ 
                id: datos[i]['id'],
                rut: datos[i]['rut'],
                nombreCliente: datos[i]['nombreCliente'],
                direccion: datos[i]['direccion'],
                telefono: datos[i]['telefono'],
                giro: datos[i]['giro'],
                nombreVendedor: datos[i]['nombreVendedor']
            });
        }
        this.setState({ data: row })
      });
    
  }
  render() {
    //Agregamos las columnas a la tabla.
    const columns = [
      { title: "Acciones", field: "id", width: "15%", align:"center", formatter:function(cell){
        let value = cell.getValue();
        console.log(value);
        return "<button  type='button' class='btn btn-danger btn-sm'>Eliminar</button>  <button  type='button' class='btn btn-success btn-sm'>Guardar</button>";
      }},
      { title: "RUT", field: "rut", color: "red", editor:true, headerFilter:"input"},
      { title: "Nombre Cliente", field: "nombreCliente", editor:true, headerFilter:"input"},
      { title: "Direccion", field: "direccion", editor:true, headerFilter:"input"},
      { title: "Telefono", field: "telefono", editor:true},
      { title: "Giro", field: "giro", editor:true, headerFilter:"input"},
      { title: "Nombre Vendedor", field: "nombreVendedor", editor:true, headerFilter:"input"}
    ];
    //Opciones de data table
    const options = {
      layout:"fitColumns",
      pagination:"local",
      paginationSize:10,
      movableColumns:true,
      responsiveLayout:"hide",
      persistence:{
        sort:true,
        filter:true,
        columns:true,
      },
      persistenceID:"dataSave"
    };
    try {
      return (
        <div>
          <React15Tabulator columns={columns} data={this.state.data} options={options}/>
        </div>
      );
    } catch (error) {
      console.log("------------------------------------------------------");
      console.log(error);
    }
  }
}

export default ListClientes;

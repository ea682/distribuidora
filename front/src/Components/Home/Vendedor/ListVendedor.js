import React from "react";
import api from '../../config/Api';
// import "react-tabulator/lib/styles.css"; // default theme
import "react-tabulator/lib/css/bootstrap/tabulator_bootstrap.min.css"; // use Theme(s)
import { React15Tabulator } from "react-tabulator"; // for React 15.x




class ListVendedor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: ''}
  }

  //Cargamos los datos de la tabla.
  componentDidMount(){
    
    fetch(api+'/api/vendedor')
      .then((response) => {
        return response.json()
      })
      .then((datos) => {
        datos = datos.vendedores;
        let row = [];
        for (let i = 0; i < datos.length; i++) {
            //Guardamos los datos en un array
            row.push({ 
                id: datos[i]['id'],
                rut: datos[i]['rut'],
                nombreVendedor: datos[i]['nombreVendedor'],
                direccion: datos[i]['direccion'],
                comision: datos[i]['comision']
            });
        }
        this.setState({ data: row })
      });
    
  }
  render() {
    //Agregamos las columnas a la tabla.
    const columns = [
      { title: "Acciones", field: "id", width: "20%", align:"center", formatter:function(cell){
        let value = cell.getValue();
        console.log(value);
        return "<button  type='button' class='btn btn-danger btn-sm'>Eliminar</button>  <button  type='button' class='btn btn-success btn-sm'>Guardar</button>";
      }},
      { title: "RUT", field: "rut", width: "20%", color: "red", editor:true},
      { title: "Nombre Vendedor", width: "20%", field: "nombreVendedor", editor:true},
      { title: "Direccion", field: "direccion", width: "20%", editor:true},
      { title: "Comision", field: "comision", width: "20%", editor:true}
    ];
    //Opciones de data table
    const options = {
      layout:"id",
      width: "100%",
      pagination:"local",
      paginationSize:10,
      movableColumns:true,
      persistence:{
        sort:true,
        filter:true,
        columns:true,
      },
      persistenceID:"dataSave"
    };
    return (
      <div>
        <div>
          <div>
            <button id="print-table">Print Table</button>
        </div>
        </div>
        <React15Tabulator columns={columns} data={this.state.data} options={options}/>
      </div>
    );
  }
}

export default ListVendedor;

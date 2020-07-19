import React from "react";
import api from '../../config/Api';
import "react-tabulator/lib/css/bootstrap/tabulator_bootstrap.min.css";
import { React15Tabulator } from "react-tabulator";




class ListaPagos extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: ''}
  }

  //Cargamos los datos de la tabla.
  componentDidMount(){
    
    fetch(api+'/api/pagos')
      .then((response) => {
        return response.json()
      })
      .then((datos) => {
        datos = datos.producto;
        console.log(datos);
        let row = [];
        for (let i = 0; i < datos.length; i++) {
            //Guardamos los datos en un array
            row.push({ 
                id: datos[i]['id'],
                Fecha: datos[i]['Fecha'],
                monto: datos[i]['monto'],
                IdTipoDocumentoPago: datos[i]['IdTipoDocumentoPago'],
                IdFactura: datos[i]['IdFactura']
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
        return "<button  type='button' class='btn btn-danger btn-sm'>Eliminar</button>  <button  type='button' class='btn btn-success btn-sm'>Guardar</button>";
      }},
      { title: "Fecha Ingreso", field: "Fecha", width: "9%", headerFilter:"input"},
      { title: "Monto", field: "monto", width: "15%", editor:true, headerFilter:"input"},
      { title: "Tipo documento", field: "IdTipoDocumentoPago", width: "15%", editor:true, headerFilter:"input"}
    ];
    //Opciones de data table
    const options = {
      layout:"id",
      width: "100%",
      pagination:"local",
      paginationSize:30,
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
            <h1>Listar Pagos</h1>
        </div>
        <React15Tabulator columns={columns} data={this.state.data} options={options}/>
      </div>
    );
  }
}

export default ListaPagos;

import React from "react";
import api from '../../config/Api';
import "react-tabulator/lib/css/bootstrap/tabulator_bootstrap.min.css";
import { React15Tabulator } from "react-tabulator";
import moment from 'moment';



class ListaFactura extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: ''}
  }

  //Cargamos los datos de la tabla.
  componentDidMount(){
    
    fetch(api+'/api/factura')
      .then((response) => {
        return response.json()
      })
      .then((datos) => {
        datos = datos.factura;
        let row = [];
        for (let i = 0; i < datos.length; i++) {

            let newFecha = new Date(datos[i]['fechadocumento']);
            newFecha = moment(newFecha).format('DD/MM/YYYY');
            //Guardamos los datos en un array
            row.push({ 
                id: datos[i]['id'],
                rut: datos[i]['rut'],
                nombreCliente: datos[i]['nombrecliente'],
                direccion: datos[i]['direccion'],
                giro: datos[i]['giro'],
                rutVendedor: datos[i]['rutVendedor'],
                telefono: datos[i]['telefono'],
                nombreTipoFactura: datos[i]['nombretipofactura'],
                nFactura: datos[i]['nFactura'],
                fechaDocumento: newFecha,
                codigo: datos[i]['codigo'],
                descripcion: datos[i]['descripcion'],
                cantidad: datos[i]['cantidad'],
                precioUnitario: datos[i]['preciounitario'],
                totalUnitario: datos[i]['totalUnitario'],
                totalBruto: datos[i]['totalBruto']
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
      { title: "RUT", field: "rut", width: "9%", headerFilter:"input"},
      { title: "Nombre Cliente", field: "nombreCliente", width: "15%", editor:true, headerFilter:"input"},
      { title: "Direccion Cliente", field: "direccion", width: "15%", editor:true},
      { title: "GIRO", field: "giro", width: "7%", editor:true, headerFilter:"input"},
      { title: "Codigo Vendedor", field: "rutVendedor", width: "7%", editor:true, headerFilter:"input"},
      { title: "Telefono", field: "telefono", width: "10%", editor:true},
      { title: "Nombre DOC", field: "nombreTipoFactura", width: "10%", editor:true, headerFilter:"input"},
      { title: "Numero DOC", field: "nFactura", width: "10%", editor:true, headerFilter:"input"},
      { title: "Fecha Documento", field: "fechaDocumento", width: "10%", editor:true, headerFilter:"input"},
      { title: "COD. Producto", field: "codigo", width: "10%", editor:true, headerFilter:"input"},
      { title: "Desc. Producto", field: "descripcion", width: "10%", editor:true, headerFilter:"input"},
      { title: "Cantidad", field: "cantidad", width: "8%", editor:true, headerFilter:"input"},
      { title: "Precio Unitario", field: "precioUnitario", width: "10%", editor:true, headerFilter:"input"},
      { title: "Total Linea", field: "totalUnitario", width: "10%", editor:true},
      { title: "Total Bruto", field: "totalBruto", width: "10%", editor:true}
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

export default ListaFactura;

import React from "react";
import ReactDOM from 'react-dom';
import api from '../../config/Api';
import "react-tabulator/lib/css/bootstrap/tabulator_bootstrap.min.css";
import { React15Tabulator } from "react-tabulator";
import axios from 'axios';
import moment from 'moment';

import ExcelDownload from './exportExcel';

const data = [];
class ListaPagos extends React.Component {
  constructor(props) {
    super(props);
    this.consultaVentas = this.consultaVentas.bind(this);
    this.exExcelTes = this.exExcelTes.bind(this);
    this.state = { 
        data: '',
        inicio : null,
        final : null
    }
  }

  change(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  //Cargamos los datos de la tabla.
  componentDidMount(){
  }

  //Insertamos los datos.
  consultaVentas(){
    let inicio = this.state.inicio;
    let final = this.state.final;

    const data = 1
    this.setState({ data });

    //Realizamos la consulta con las fehcas
    axios.post(`${api}/api/informes/ventas/${inicio}/${final}`)
    .then(res => {
        //Validamos que el status de la respuesta de 200.
        if(res.status === 200){
            let dataVentas = res.data.ventas;
            let newArrayDatosGrilla = [];
            let newArrayDatosExcel2 = [];

            //Creamos los titulos.
            let arrayTitulos = ['Fecha Documento','N Factura','Nombre Cliente','Tipo Factura','Codigo','Rut','Total Neto','IVA','Total'];

            for (let i = 0; i < dataVentas.length; i++) {

              //Convertimos la fecha 
              let newFecha = new Date(dataVentas[i]['fechaDocumento']);
              newFecha = moment(newFecha).format('DD/MM/YYYY');

              let newArrayDatosExcel = [];

              //Array para grilla
              newArrayDatosGrilla.push({
                
                fechaDocumento : newFecha,
                numeroFactura : dataVentas[i]['numeroFactura'],
                nombreCliente : dataVentas[i]['nombreCliente'],
                nombreTipoFactura : dataVentas[i]['nombreTipoFactura'],
                codigo : dataVentas[i]['codigo'],
                rut : dataVentas[i]['rut'],
                totalNeto : dataVentas[i]['totalNeto'],
                IVA : dataVentas[i]['IVA'],
                total : dataVentas[i]['total']
              });
              //array para excel.
              newArrayDatosExcel.push(newFecha);
              newArrayDatosExcel.push(dataVentas[i]['numeroFactura']);
              newArrayDatosExcel.push(dataVentas[i]['nombreCliente']);
              newArrayDatosExcel.push(dataVentas[i]['nombreTipoFactura']);
              newArrayDatosExcel.push(dataVentas[i]['codigo']);
              newArrayDatosExcel.push(dataVentas[i]['rut']);
              newArrayDatosExcel.push(dataVentas[i]['totalNeto']);
              newArrayDatosExcel.push(dataVentas[i]['IVA']);
              newArrayDatosExcel.push(dataVentas[i]['total']);

              newArrayDatosExcel2.push(newArrayDatosExcel);
            }
            //Guardamos los datos para la grilla
            this.setState({ data : newArrayDatosGrilla });

            //Validamos que tenga datos.
            console.log(newArrayDatosExcel2.length);
            if(newArrayDatosExcel2.length >= 1){
              //Guardamos los datos para exportacion de excel.
              let exportaDataExcel = [{
                columns: arrayTitulos,
                data: newArrayDatosExcel2
              }]
              this.exExcelTes(exportaDataExcel, "Ventas");
            }
            
        }else{
            
        }
    })
  }

  exExcelTes(datosExport, name){
    ReactDOM.render(
      <ExcelDownload data={datosExport} nombreDocument={name}/>,
      document.getElementById('callExcel')
    );
  }

  
  render() {

    let filteredData = this.state.data;

    //Agregamos las columnas a la tabla.
    
    const columns = [
      { title: "Fecha Documento", field: "fechaDocumento", width: "9%"},
      { title: "N Factura", field: "numeroFactura", width: "15%"},
      { title: "Nombre Cliente", field: "nombreCliente", width: "15%"},
      { title: "Tipo Factura", field: "nombreTipoFactura", width: "15%"},
      { title: "Codigo", field: "codigo", width: "15%"},
      { title: "Rut", field: "rut", width: "15%"},
      { title: "Total Neto", field: "totalNeto", width: "15%"},
      { title: "IVA", field: "IVA", width: "15%"},
      { title: "Total", field: "total", width: "15%"}
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
        <div className="form-page">
            <div className = 'form-group'>
                <div className = 'form-group'>
                    <label>Fecha de Inico</label>
                    <input onChange={e => this.change(e)} className= 'form-control' type = 'date' name='inicio' value= {this.state.ciudad}  />
                </div>
                <div className = 'form-group'>
                    <label>Fecha de vencimiento</label>
                    <input onChange={e => this.change(e)} className= 'form-control' type = 'date' name='final' value= {this.state.ciudad}  />
                </div>
                <div>
                <button type = 'button' onClick ={this.consultaVentas} className = 'btn btn-primary'> Guardar </button>
                </div>
            </div>
            <div>
                <React15Tabulator columns={columns} data={filteredData} options={options}/>
            </div>
            <div id="callExcel">
              
            </div>
        </div>
    );
  }
}

export default ListaPagos;
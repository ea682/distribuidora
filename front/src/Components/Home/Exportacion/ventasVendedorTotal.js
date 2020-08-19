import React from "react";
import ReactDOM from 'react-dom';
import api from '../../config/Api';
import "react-tabulator/lib/css/bootstrap/tabulator_bootstrap.min.css";
import { React15Tabulator } from "react-tabulator";
import axios from 'axios';
import moment from 'moment';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

import ExcelDownload from './exportExcel';


const top100Films = [
    { title: 'Ventas', codigo: 0, codigoCp : 'cpVentas' },
    { title: 'Venta de productos por fecha', codigo: 1, codigoCp : 'cpVentaProductos'},
    { title: 'Ventas del vendedor', codigo: 2, codigoCp : 'cpVentaVendedor'},
    { title: 'Ventas del vendedor pagadas', codigo: 3, codigoCp : 'cpVentaVendedorPagadas'},
    { title: 'Ventas del vendedor inpagadas', codigo: 4, codigoCp : 'cpVentaVendedorInpagadas'},
    { title: 'Ventas por producto', codigo: 5, codigoCp : 'cpVentaProducto'},
    { title: 'Comisiones pagadas', codigo: 6, codigoCp : 'cpComisionPagadas'},
    { title: 'Resumen ventas', codigo: 6, codigoCp : 'cpResuemenVentas'}
  ];


const data = [];
class ListaPagos extends React.Component {
  constructor(props) {
    super(props);
    this.consultaVentasProducto = this.consultaVentasProducto.bind(this);
    this.exExcelTes = this.exExcelTes.bind(this);
    this.getOptionsSelect = this.getOptionsSelect.bind(this);
    this.state = { 
        data: '',
        inicio : null,
        final : null,
        dataSelect : [],
        arrayIdProductos : []
    }
  }

  change(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  //Cargamos los datos de la tabla.
  componentDidMount(){
      this.getProductos();
  }

  getProductos(){
    axios.get(`${api}/api/vendedor`)
    .then(res => {
        //Validamos que el status de la respuesta de 200.
        if(res.status === 200){
            let data = res.data.vendedores;
            //console.log();
            this.setState({ dataSelect : data});
        }
    });
  }

  getOptionsSelect(e){
    let idVendedores = [];
    e.forEach(element => {
        idVendedores.push(element.id);
    });
    this.setState({ arrayIdVendedores : idVendedores});
  }

  //Insertamos los datos.
  consultaVentasProducto(){
    let inicio = this.state.inicio;
    let final = this.state.final;
    let idVendedores = this.state.arrayIdVendedores;

    //console.log(idProductos);
    const data = 1
    this.setState({ data });

    //Realizamos la consulta con las fehcas
    axios.post(`${api}/api/informes/ventasVendedorTotal/${inicio}/${final}/${idVendedores}`)
    .then(res => {
        //Validamos que el status de la respuesta de 200.
        if(res.status === 200){
            let dataVentas = res.data.ventas;
            let newArrayDatosGrilla = [];
            let newArrayDatosExcel2 = [];

            //Creamos los titulos.
            let arrayTitulos = ['Fecha Documento','N Factura','Nombre Cliente','Codigo Vendedor','Rut', 'Tipo Factura','Producto', 'cantidad', 'Total Neto','IVA','Total'];
            let totalNeto = 0;
            let totalIvav  = 0;
            let totalTotal = 0;
            let cantidadDatos = 0;
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
                codigo : dataVentas[i]['codigo'],
                rut : dataVentas[i]['rut'],
                nombreTipoFactura : dataVentas[i]['nombreTipoFactura'],
                Producto : dataVentas[i]['Producto'],
                Cantidad : dataVentas[i]['cantidad'],
                totalNeto : "$"+dataVentas[i]['totalNeto'],
                IVA : "$"+dataVentas[i]['IVA'],
                total : "$"+dataVentas[i]['total']
              });
              //array para excel.
              newArrayDatosExcel.push(newFecha);
              newArrayDatosExcel.push(dataVentas[i]['numeroFactura']);
              newArrayDatosExcel.push(dataVentas[i]['nombreCliente']);
              newArrayDatosExcel.push(dataVentas[i]['codigo']);
              newArrayDatosExcel.push(dataVentas[i]['rut']);
              newArrayDatosExcel.push(dataVentas[i]['nombreTipoFactura']);
              newArrayDatosExcel.push(dataVentas[i]['Producto']);
              newArrayDatosExcel.push(dataVentas[i]['cantidad']);
              newArrayDatosExcel.push("$"+dataVentas[i]['totalNeto']);
              newArrayDatosExcel.push("$"+dataVentas[i]['IVA']);
              newArrayDatosExcel.push("$"+dataVentas[i]['total']);

              cantidadDatos += dataVentas[i]['cantidad'];
              totalNeto += dataVentas[i]['totalNeto'];
              totalIvav += dataVentas[i]['IVA'];
              totalTotal += dataVentas[i]['total'];
              newArrayDatosExcel2.push(newArrayDatosExcel);
            }
            
            totalNeto = '$'+totalNeto;
            totalIvav = '$'+totalIvav;
            totalTotal = '$'+totalTotal;
            //Guardamos los datos para la grilla
            this.setState({ data : newArrayDatosGrilla });

            //Validamos que tenga datos.
            //console.log(newArrayDatosExcel2.length);
            let largoExcel = newArrayDatosExcel2.length;
            console.log(largoExcel);
            if(newArrayDatosExcel2.length >= 1){
              //Guardamos los datos para exportacion de excel.
              let exportaDataExcel = [{
                columns: arrayTitulos,
                data: newArrayDatosExcel2
              },
              {
                  xSteps: 6,  //Columna
                  ySteps: 0, //Lineo o posicion
                  columns: ["Total", `${cantidadDatos}`,`${totalNeto}`, `${totalIvav}`, `${totalTotal}`],
                  data : ['', '', '', '',]
                }
            ];
              console.log(exportaDataExcel);
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
    let dataSelect = this.state.dataSelect;
    //Agregamos las columnas a la tabla.
    
    const columns = [
      { title: "Fecha Documento", field: "fechaDocumento", width: "9%"},
      { title: "N Factura", field: "numeroFactura", width: "15%"},
      { title: "Nombre Cliente", field: "nombreCliente", width: "15%"},
      { title: "Codigo Vendedor", field: "codigo", width: "15%"},
      { title: "Rut", field: "rut", width: "15%"},
      { title: "Tipo Factura", field: "nombreTipoFactura", width: "15%"},
      { title: "Producto", field: "Producto", width: "15%"},
      { title: "Cantidad", field: "Cantidad", width: "15%"},
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
        <div>
            <h1>Ventas totales del Vendedor</h1>
            <div className = 'form-group'>
                <div className = 'form-group'>
                    <label>Fecha de Inico</label>
                    <input onChange={e => this.change(e)} className= 'form-control' type = 'date' name='inicio' value= {this.state.ciudad}  />
                </div>
                <div className = 'form-group'>
                    <label>Fecha de vencimiento</label>
                    <input onChange={e => this.change(e)} className= 'form-control' type = 'date' name='final' value= {this.state.ciudad}  />
                </div>
                <div className = 'form-group'>
                    
                    <Autocomplete
                    multiple
                    id="tags-outlined"
                    options={dataSelect}
                    getOptionLabel={(option) => option.codigo}
                    filterSelectedOptions
                    renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="outlined"
                        label="Productos"
                    />
                    )}
                    onChange={(event, val) => this.getOptionsSelect(val)}
                    />
                </div>
                <div className = 'form-group'>
                    <button type = 'button' onClick ={this.consultaVentasProducto} className = 'btn btn-primary'> Consultar </button>
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



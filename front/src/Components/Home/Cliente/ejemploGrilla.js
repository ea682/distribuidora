// ES6
import React, { Component } from "react";
import { Datatable } from "@o2xp/react-datatable";
import { CallSplit as CallSplitIcon} from "@material-ui/icons";
import { chunk } from "lodash";
import axios from 'axios';
import api from '../../config/Api';

function llenarTabla(){
        axios.get(api+'/api/clientes/getTablaCliente', {
        }).then(res => {
            //Obtenemos los datos.
            let datos = res.data.clientes;
            //Creamos una variable para guardarlos
            let row = [];
            for (let i = 0; i < datos.length; i++) {
                //Guardamos los datos en un array
                row.push({ 
                    id: <p>{datos[i]['id']}</p>,
                    rut: datos[i]['rut'],
                    nombreCliente: datos[i]['nombreCliente'],
                    direccion: datos[i]['direccion'],
                    telefono: datos[i]['telefono'],
                    giro: datos[i]['giro'],
                    nombreVendedor: datos[i]['nombreVendedor']
                });
            }
            //Concatenamos todo.
            this.llenarDatosTabla(row);
            
        })
        .catch(err => {
        console.log(err);
        });
    }
// Advanced Example
const options = {
  title: "My super datatable",
  dimensions: {
    datatable: {
      width: "100%",
      height: "40%"
    },
    row: {
      height: "5%"
    }
  },
  keyColumn: "id",
  font: "Arial",
  data: {
    columns: [
      {
        id: "rut",
        label: "rut",
        colSize: "100px",
        editable: true,
        dataType: "text",
        inputType: "input"
      },
      {
        id: "nombreCliente",
        label: "nombreCliente",
        colSize: "100px",
        editable: true,
        dataType: "text",
        inputType: "input"
      },
      {
        id: "direccion",
        label: "direccion",
        colSize: "50px",
        editable: true,
        dataType: "text",
        inputType: "input"
      },
      {
        id: "telefono",
        label: "telefono",
        colSize: "120px",
        editable: true,
        dataType: "text",
        inputType: "input"
      },
      {
        id: "giro",
        label: "giro",
        colSize: "100px",
        editable: true,
        inputType: "input"
      },
      {
        id: "nombreVendedor",
        label: "nombreVendedor",
        colSize: "150px",
        editable: true,
        inputType: "input"
      }
    ],
    rows: [
      {
        rut: 28,
        nombreCliente: "Kerr Mayo",
        direccion: true,
        telefono: "1972-09-04T11:09:59",
        giro: "green",
        nombreVendedor: "4478 7842 2486 8743"
      },
      {
        rut: 34,
        nombreCliente: "Freda Bowman",
        direccion: true,
        telefono: "1988-03-14T09:03:19",
        giro: "blue",
        nombreVendedor: "7845 5789 4236 7861"
      },
      {
        rut: 14,
        nombreCliente: "Becky Lawrence",
        direccion: false,
        telefono: "1969-02-10T04:02:44",
        giro: "green",
        nombreVendedor: ""
      }
    ]
  },
  features: {
    canEdit: true,
    canDelete: true,
    canDownload: true,
    canSearch: true,
    canRefreshRows: true,
    canOrderColumns: true,
    userConfiguration: {
      columnsOrder: ["rut", "nombreCliente", "direccion", "telefono", "giro", "nombreVendedor"],
      copyToClipboard: true
    },
    rowsPerPage: {
      available: [10, 25, 50, 100],
      selected: 50
    },
    selectionIcons: [
      {
        title: "Selected Rows",
        icon: <CallSplitIcon color="primary" />,
        onClick: rows => console.log(rows)
      }
    ]
  }
};

class ListCLiente extends Component {
  actionsRow = ({ type, payload }) => {
    console.log(type);
    console.log(payload);
  };

  refreshRows = () => {
    const { rows } = options.data;
    const randomRows = Math.floor(Math.random() * rows.length) + 1;
    const randomTime = Math.floor(Math.random() * 4000) + 1000;
    const randomResolve = Math.floor(Math.random() * 10) + 1;
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (randomResolve > 3) {
          resolve(chunk(rows, randomRows)[0]);
        }
        reject(new Error("err"));
      }, randomTime);
    });
  };

  render() {
    return (
      <Datatable
        options={options}
        refreshRows={this.refreshRows}
        actions={this.actionsRow}
      />
    );
  }
}

export default ListCLiente;
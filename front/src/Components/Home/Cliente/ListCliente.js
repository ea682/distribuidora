// ES6
import React, { Component } from "react";
import { Datatable } from "@o2xp/react-datatable";
import { CallSplit as CallSplitIcon} from "@material-ui/icons";
import { chunk } from "lodash";
import axios from 'axios';
import api from '../../config/Api';


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
    rows: [],
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
    constructor(props) {
        super(props);
        this.state = {
            datos : ''
        };
        
    }


    componentDidMount(){
        
        this.llenarTabla();
    }

    componentWillUnmount(){
        
    }

    llenarTabla(){
        axios.get(api+'/api/clientes/getTablaCliente', {
        }).then(res => {
            //Obtenemos los datos.
            let datos = res.data.clientes;
            //Creamos una variable para guardarlos
            let row = [];
            for (let i = 0; i < datos.length; i++) {
                //Guardamos los datos en un array
                row.push({
                    rut: datos[i]['rut'],
                    nombreCliente: datos[i]['nombreCliente'],
                    direccion: datos[i]['direccion'],
                    telefono: datos[i]['telefono'],
                    giro: datos[i]['giro'],
                    nombreVendedor: datos[i]['nombreVendedor']
                });
            }
            this.setState({datos : row});
        })
        .catch(err => {
        console.log(err);
        });
    }
    actionsRow = ({ type, payload }) => {
        console.log(type);
        console.log(payload);
    };

    refreshRows = () => {
        const rows = this.state.datos;
        console.log(rows);
        const randomRows = rows.length;
        console.log(randomRows);
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
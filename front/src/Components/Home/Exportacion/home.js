/* eslint-disable no-use-before-define */
import React from 'react';
import ReactDOM from 'react-dom';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';


import Ventas from './ventas';
import VentasProductos from './VentaProductosFecha';
import VentasVendedorTotal from './ventasVendedorTotal';

class home extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            cpVentas : null,
            cpVentaProductos : null,
            cpVentaVendedor : null,
            cpVentaVendedorPagadas : null,
            cpVentaVendedorInpagadas : null,
            cpVentaProducto : null,
            cpComisionPagadas : null,
            cpResuemenVentas : null
        }
        this.getOptions = this.getOptions.bind(this);
    }

    //Mostramos los componentes que cumplan con la condicion.
    viewComponentes(codigo){
        if(codigo === 0){
            this.setState({ cpVentas : true});
        }
        if(codigo === 1){
            this.setState({ cpVentaProductos : true});
        }
        if(codigo === 2){
            this.setState({ cpVentaVendedor : true});
        }
        if(codigo === 3){
            this.setState({ cpVentaVendedorPagadas : true});
        }
        if(codigo === 4){
            this.setState({ cpVentaVendedorInpagadas : true});
        }
        if(codigo === 5){
            this.setState({ cpVentaProducto : true});
        }
        if(codigo === 6){
            this.setState({ cpComisionPagadas : true});
        }
        if(codigo === 7){
            this.setState({ cpResuemenVentas : true});
        }
    }

    //Ocultamos o no mostramos los componentes que no se soliciten.
    ocultarComponentes(codigo){
        if(codigo === 0){
            this.setState({ cpVentas : null});
        }
        if(codigo === 1){
            this.setState({ cpVentaProductos : null});
        }
        if(codigo === 2){
            this.setState({ cpVentaVendedor : null});
        }
        if(codigo === 3){
            this.setState({ cpVentaVendedorPagadas : null});
        }
        if(codigo === 4){
            this.setState({ cpVentaVendedorInpagadas : null});
        }
        if(codigo === 5){
            this.setState({ cpVentaProducto : null});
        }
        if(codigo === 6){
            this.setState({ cpComisionPagadas : null});
        }
        if(codigo === 7){
            this.setState({ cpResuemenVentas : null});
        }
    }

    getOptions(e){
        let cpCodigoAdd = [];
        e.forEach(element => {
            cpCodigoAdd.push(element.codigo);
        });

        for (let i = 0; i <= 7; i++) {
            //let codigo = e[i]['codigo'];
            if(cpCodigoAdd.indexOf(i) >= 0){
                this.viewComponentes(i);
            }else{
                this.ocultarComponentes(i);
            }
        }
    }

    render() {
        return (
            <div className="form-page">
                <div className = 'form-group'>
                    <Autocomplete
                    multiple
                    id="tags-outlined"
                    options={top100Films}
                    getOptionLabel={(option) => option.title}
                    filterSelectedOptions
                    renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="outlined"
                        label="Opciones"
                    />
                    )}
                    onChange={(event, val) => this.getOptions(val)}
                    />
                </div>
                <div id="Exportaciones" className = 'form-group'>
                        {this.state.cpVentas ? <Ventas/> : null}
                        {this.state.cpVentaProductos ? <VentasProductos/> : null}
                        {this.state.cpVentaVendedor ? <VentasVendedorTotal/> : null}
                        {this.state.cpVentaVendedorPagadas ? <VentasProductos/> : null}
                        {this.state.cpVentaVendedorInpagadas ? <VentasProductos/> : null}
                        {this.state.cpVentaProducto ? <VentasProductos/> : null}
                        {this.state.cpComisionPagadas ? <VentasProductos/> : null}
                        {this.state.cpResuemenVentas ? <VentasProductos/> : null}
                </div>
            </div>
          );
    }
}

export default home;

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
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

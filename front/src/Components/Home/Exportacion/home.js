/* eslint-disable no-use-before-define */
import React from 'react';
import ReactDOM from 'react-dom';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';


import Ventas from './ventas';

class home extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
        }
        this.getOptions = this.getOptions.bind(this);
    }
    

    viewVentas(){
        ReactDOM.render(
            <Ventas/>,
            document.getElementById('ventas')
        );
    }

    getOptions(e){
        for (let i = 0; i < e.length; i++) {
            let codigo = e[i]['codigo'];
            
        }
    }

    render() {
        return (
            <div className="form-page">
                <div>
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
                <div id="ventas">

                </div>
            </div>
          );
    }
}

export default home;

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
  { title: 'Ventas', codigo: 0 },
  { title: 'Venta de productos por fecha', codigo: 1 },
  { title: 'Ventas del vendedor', codigo: 2 },
  { title: 'Ventas del vendedor pagadas', codigo: 3 },
  { title: 'Ventas del vendedor inpagadas', codigo: 4 },
  { title: 'Ventas por producto', codigo: 5 },
  { title: 'Comisiones pagadas', codigo: 6 },
  { title: 'Resumen ventas', codigo: 6 },
];

import React from 'react';
import DataGrid from 'react-data-grid';
import 'react-data-grid/dist/react-data-grid.css';
import axios from 'axios';
import api from '../../config/Api';


const columns = [
  { key: 'id', name: 'ID' },
  { key: 'title', name: 'Title' }
];
 
const rows = [
  { id: 0, title: 'Example' },
  { id: 1, title: 'Demo' }
];
 
class Cliente extends React.Component{
    render(){
        return(
            <DataGrid
            columns={columns}
            rows={rows}
            />
        );
    }
}
export default Cliente;
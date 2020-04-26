import React from 'react';
import './App.css';
import Categorias from './Components/Categorias.js';

class App extends React.Component {
  render(){
    return (
      <div className= 'app'>
        <ul class="list-group">
          <Categorias name = 'Home'/>
          <Categorias name = 'Cliente' item = {['Listar','Agregar','Modificar','Eliminar']} />
          <Categorias name = 'Vendedor' item = {['Listar','Agregar','Modificar','Eliminar']} />
          <Categorias name = 'Producto' item = {['Listar','Agregar','Modificar','Eliminar']} />
          <Categorias name = 'Factura' item = {['Listar','Agregar','Modificar','Eliminar']} />
        </ul>
      </div>
    );
  }
  
}

export default App;

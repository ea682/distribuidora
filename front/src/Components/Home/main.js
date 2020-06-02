import React, { Component } from "react";
import { NavLink, HashRouter, Route } from 'react-router-dom';
import {Navbar,Nav,NavDropdown} from 'react-bootstrap'; 
import './form.css';

import Cliente from './Cliente/Cliente';
import ListClientes from './Cliente/ListCliente';
import Factura from './Factura/Factura';
import Producto from './Producto/Producto';
import Vendedor from './Vendedor/Vendedor';
import Home from '../Home/Home';

class Main extends Component {
    render() {
      return (
          <HashRouter>
              <div>
                  <Navbar bg="primary" variant="dark">
                      <Navbar.Brand>Distribuidora</Navbar.Brand>
                      <Nav className="mr-auto">
                      <Nav.Link href="#home">Home</Nav.Link>
                      <NavDropdown title="Cliente" id="basic-nav-dropdown">
                      <NavDropdown.Item href="#/newCliente">Nuevo Cliente</NavDropdown.Item>
                      <NavDropdown.Item href="#/listCliente">Listar Cliente</NavDropdown.Item>
                      </NavDropdown>
                      <NavDropdown title="Factura" id="basic-nav-dropdown">
                      <NavDropdown.Item href="#/newFactura">Nueva Factura</NavDropdown.Item>
                      <NavDropdown.Item href="#/listFactura">Listar Factura</NavDropdown.Item>
                      </NavDropdown>
                      <NavDropdown title="Producto" id="basic-nav-dropdown">
                      <NavDropdown.Item href="#/producto">Nuevo Producto</NavDropdown.Item>
                      <NavDropdown.Item href="#/">Listar Producto</NavDropdown.Item>
                      </NavDropdown>
                      <NavDropdown title="Vendedor" id="basic-nav-dropdown">
                      <NavDropdown.Item href="#/newVendedor">Nuevo Vendedor</NavDropdown.Item>
                      <NavDropdown.Item href="#/">Listar Vendedor</NavDropdown.Item>
                      </NavDropdown>
                      </Nav>
                  </Navbar>
                  <div className="content">
                      <Route path="/home" component={Home}/>
                      <Route path="/newCliente" component={Cliente}/>
                      <Route path="/listCliente" component={ListClientes}/>
                      <Route path="/producto" component={Producto}/>
                      <Route path="/newFactura" component={Factura}/>
                      <Route path="/newVendedor" component={Vendedor}/>
                      
                  </div>
                  <div className="footer-page">
                      < footer className = 'footer mt-auto py-3 bg-primary text-white border-bottom"'>
                          < div  className = 'container' >Distribuidora Carne clc </div>
                          < div  className = 'container' >Portal creado 2020 </div>
                      </footer >
                  </div>
              </div>
          </HashRouter>
      );
    }
  }
   
  export default Main;
import React, { Component } from "react";
import { NavLink, HashRouter, Route } from 'react-router-dom';
import {Navbar,Nav,NavDropdown} from 'react-bootstrap'; 
import './form.css';

import Cliente from './Cliente/Cliente';
import ListClientes from './Cliente/ListCliente';

import Factura from './Factura/Factura';
import ListFactura from './Factura/ListFactura';

import Producto from './Producto/Producto';
import ListProducto from './Producto/ListProducto';

import Vendedor from './Vendedor/Vendedor';
import ListVendedor from './Vendedor/ListVendedor';

import Home from '../Home/Home';
import insert from './Carga/insertDatos';
import pagos from "./Pagos/pagos";
import listarPagos from './Pagos/ListarPagos'
import PagoCheque from'./Pagos/PagosCheques'

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
                        <NavDropdown.Item href="#/listProducto">Listar Producto</NavDropdown.Item>
                      </NavDropdown>
                        <NavDropdown title="Vendedor" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#/newVendedor">Nuevo Vendedor</NavDropdown.Item>
                        <NavDropdown.Item href="#/listVendedor">Listar Vendedor</NavDropdown.Item>
                      </NavDropdown>
                      <NavDropdown title="Pagos" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#/newPagos">Nuevo Pago</NavDropdown.Item>
                        <NavDropdown.Item href="#/newPagosCheque">Nuevo Pago cheque</NavDropdown.Item>
                        <NavDropdown.Item href="#/listarPagos">Listar Pagos</NavDropdown.Item>
                      </NavDropdown>
                      <Nav.Link href="#/carga">Carga Datos</Nav.Link>
                      </Nav>
                  </Navbar>
                  <div className="content">
                      <Route path="/home" component={Home}/>
                      <Route path="/newCliente" component={Cliente}/>
                      <Route path="/listCliente" component={ListClientes}/>

                      <Route path="/producto" component={Producto}/>
                      <Route path="/listProducto" component={ListProducto}/>

                      <Route path="/newFactura" component={Factura}/>
                      <Route path="/listFactura" component={ListFactura}/>

                      <Route path="/newVendedor" component={Vendedor}/>
                      <Route path="/listVendedor" component={ListVendedor}/>
                      
                      <Route path="/carga" component={insert}/>

                      <Route path="/newPagos" component={pagos}/>
                      <Route path="/newPagosCheque" component={PagoCheque}/>
                      <Route path="/listarPagos" component={listarPagos}/>
                  </div>
              </div>
            <div className="footer-copyright text-center py-5">
              < footer className = 'footer mt-auto py-2 bg-primary text-white border-bottom'>
                < div  className = 'container' >Distribuidora Carne clc </div>
                < div  className = 'container' >Portal creado 2020 </div>
              </footer >
            </div>
          </HashRouter>
      );
    }
  }
   
  export default Main;
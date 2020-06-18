const { conn } = require('../lib/mariadb');
const XLSX = require('xlsx');

//Servicio del producto
const ProductoServices = require('./producto');
const productoServices = new ProductoServices();

//Servicio del vendedor
const VendedorServices = require('./vendedor');
const vendedorServices = new VendedorServices();

//Servicio del cliente
const ClientesServices = require('./clientes');
const clientesServices = new ClientesServices();

//Servicio del factura
const FacturaServices = require('./factura');
const facturaServices = new FacturaServices();

class UploadService{
    validarFile(fileName){
        let ext = "";
        //Obtenemos solamente el nombre del archivo
        let group = fileName.split("/");
        //dividimos los puntos y obtenemos el ultimo que es la extension.
        ext = ((group.pop()).split(".")).pop();
        //Validamos extension
        if(ext == 'xlsx' || ext == 'xls'){
            return true;
        }else{
            return false;
        }
    }

    //Leemos el excel.
    readExcel(fileName){
        let datos = [];
        //Obtenemos el archivo
        let workbook = XLSX.readFile(`./archivos/carga/${fileName}`);
        //Recorremos las hojas
        let sheet_name_list = workbook.SheetNames;
        //Leemos toda la informacion.
        datos = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);

        //Agregamos los productos que no tengamos en la BD
        for (let i = 0; i < datos.length; i++) {

            //Validamos que este sea mayor a 1
            if(datos[i]["Cantidad"] >= 1){
                //Agregamos los productos
                productoServices.newProductoCarga(datos[i]["Cod. Producto"], datos[i]["Desc. Producto"], datos[i]["Precio Unitario"]);

                //vendedorServices.newVendedor(datos[i]["Cod. Vendedor"], '', '', 0);
                
                //Validamos el numero cuando no contenga el mismo
                let telefonoCliente = datos[i]["Teléfono del Cliente"];
                if(telefonoCliente === undefined){
                    telefonoCliente = "";
                }

                clientesServices.newClienteCarga(datos[i]["RUT Cliente"], datos[i]["Nombre del Cliente"], datos[i]["Dirección del Cliente"], datos[i]["Giro del Cliente"], datos[i]["Cod. Vendedor"], telefonoCliente);

                facturaServices.newFacturaCarga(datos[i]["Nombre Doc"], datos[i]["Número del Documento"], datos[i]["Fecha"], datos[i]["Fecha Vencimiento"], datos[i]["RUT Cliente"], datos[i]["Cantidad"], datos[i]["Precio Unitario"], datos[i]["Cod. Producto"]);

                
            }    
        }
        return datos;
    }
}

module.exports = UploadService;
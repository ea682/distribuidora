import React from "react";
import api from '../../config/Api';



const rutaSubir = `${api}/api/upload`

class IsertDatos extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: ''}
  }
  retornar(e){
    let file = e.target.value;
    document.getElementsByName('ruta')[0].innerHTML = file;
  }

  //Cargamos los datos de la tabla.
  componentDidMount(){
  }

  handleClick = async e=>{
    let file = document.getElementsByName('file')[0].value
    if(file!== '')
    {
      alert('se ha cargado el archivo');

    }else{
      alert('Ingrese una ruta');
    }

  }
  
  render() {
    
    return (
      <div className="form-page">
        <form action={rutaSubir} method="POST" encType="multipart/form-data">
          <br></br>
          <div className='form-group'>
            <label>Importar Datos</label>
          </div>
          <div className='form-group'>
            <div className = 'custom-file mb-3'>
              <input type="file" name="file" className='custom-file-input' id="inputGroupFile" onChange={this.retornar}/>
              <label className="custom-file-label" name='ruta'>Selecionar archivo</label>
            </div>
          </div>
          <div className='form-group'>
            <input type="submit" value="Subir" className = 'btn btn-primary'  onClick={this.handleClick} />
          </div>
            
        </form>
      </div>
    );
  }
}

export default IsertDatos;

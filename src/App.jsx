
import { useEffect, useState } from "react";
import { CargandoScreen } from "./components/CargandoScreen";
import { TableRow } from "./components/TableRow";


import { Alert, Button, FormControl, InputGroup, Table } from "react-bootstrap";

import "./styles/app.css";
import { useApi } from "./hooks/useApi";



function App() {

  
  
  const [dataFiltrado, setDataFiltrado] = useState([]);
  
  //GET ALL DATA WITH HOOK
  const { getAll ,getByQuery , data , checking } = useApi()
  
  useEffect(() => {
    
    getAll("/domain-csv")
    
  }, [])
  
 
  

  const [fileName, setFileName] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  
  
  const filtrarPorFileName = async(e) =>{
    
    try {
      const resp =await getByQuery("/domain-csv",fileName || "fileName")
      
      return setDataFiltrado(resp.data.data)
    } catch (error) {
      setShowAlert(true)
      return setTimeout(() => {
        setShowAlert(false)
      }, 2500);
      
      
    }
   
  }

  const deshacerCambios = (e)=>{
    setDataFiltrado([]);
  }

  if( checking ){
    return <CargandoScreen/>
  } 
  

  return (
    <div>
      <Alert className={`${showAlert ? "app_mostrar" : "app_ocultar"}`} variant="primary">
        No se pudo encontrar un documento con ese nombre o hubo un error en el servidor  
      </Alert>
      <div>
        <h2 style={{background:"#ff6666",color:"white"}}>React Test App</h2>

        <div style={{width:"600px"}}> 

          <InputGroup className="mb-3">
            <FormControl
              placeholder="Filtrar Por Nombre"
              value={fileName}
              onChange={(e)=>setFileName(e.target.value)}
            />
            <Button onClick={filtrarPorFileName} variant="outline-primary" id="button-addon2">
              Filtrar
            </Button>
            <Button onClick={deshacerCambios} variant="outline-secondary" id="button-addon2">
              Deshacer
            </Button>
          </InputGroup>
        </div>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>File Name</th>
            <th>Text</th>
            <th>Number</th>
            <th>Hex</th>
            
          </tr>
        </thead>
        <tbody>

          {
            dataFiltrado.length ===0 
            ? 
              data.map((e,index)=>(
                e.lines.map(i=>{
                  return <TableRow key={i.hex} fileName={e.file} line={i}/>
                  
                })
                
              ))
            :
            dataFiltrado.map((e,index)=>(
              e.lines.map(i=>{
                return <TableRow key={i.hex} fileName={e.file} line={i}/>
              })
            ))
          }
        </tbody>
      </Table>

     
    </div>
  )
}

export default App;

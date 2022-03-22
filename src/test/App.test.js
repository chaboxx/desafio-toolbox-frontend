import React from "react";
import { fireEvent, render ,waitFor ,waitForElementToBeRemoved } from "@testing-library/react";
import App from "../App";
import "@testing-library/jest-dom/extend-expect";

jest.setTimeout(10000)

describe("<App />",()=>{
    let component;

    beforeEach(()=>{
       component=render( <App /> )
    })
    test("El componente se renderizo correctamente",async()=>{
        
        
        expect(component.getByText("Cargando..."))
        
        await waitForElementToBeRemoved(()=>component.queryByText("Cargando..."),{
            timeout:5000
        })
        expect(component.getByText("File Name"))
        expect(component.getByText("Text"))
        expect(component.getByText("Number"))
        expect(component.getByText("Hex"))

    })
            
    test("La alerta se muestra correctamente cuando falla la busqueda de un archivo",async()=>{
        
        await waitForElementToBeRemoved(()=>component.queryByText("Cargando..."),{
            timeout:5000
        })

        const alerta = component.getByText("No se pudo encontrar un documento con ese nombre o hubo un error en el servidor")
        
        expect(alerta).toHaveClass("app_ocultar")
        
        const botonFiltrar = component.getByText("Filtrar")
        fireEvent.click(botonFiltrar);
        
        await waitFor(()=>{
            expect(alerta).toHaveClass("app_mostrar")

        })
    }) 


        


    

})

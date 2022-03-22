import React from 'react'

export const TableRow = ({fileName , line}) => {
    
    return (
        
        
        <tr>
            <td>
                {fileName}
            </td>
            <td>
                {line.text}
            </td>
            <td>
                {line.number}
            </td>
            <td >
                {line.hex}
            </td>
    
        </tr>        
    )   

      
    
}

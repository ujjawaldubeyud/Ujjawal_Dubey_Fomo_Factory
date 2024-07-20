import React from 'react'
import { IRowComponentsProps } from './component.model'
import './global.css'

const RowComponent = ({code, rate, volume, cap, isHeader} : IRowComponentsProps) => {
return (
   <div className={`table-row ${isHeader ? 'table-header' : 'table-content'}`}>
    <div>{code}</div>
    <div>INR {rate}</div>
    <div>{volume}</div>
    <div>{cap}</div>
   </div>
)

}
export default RowComponent
import React from 'react'
import TablePrime from './TablePrime'

export default function Sales() {
    const sales = require('../sales_date.json');
    const Columns=[
        {field:"id",header:"Reference"},
        {field:"id-product",header:"Product"},
        {field:"Quantity",header:"Quantity"},
        {field:"Unit Price",header:"Unit Price"},
        {field:"Total Price",header:"Total Price"},
        {field:"Date",header:"Date"},
        {field:"Client Name",header:"Client Name"},
        {field:"CC",header:"Identification"},
        {field:"Salesman",header:"Salesman"},
    ]
    return (
        <div>
            <span>sales</span>
            <div className="table" >
                <TablePrime ColumnsName={Columns} Data={sales} />
            </div>
        </div>
    )
}

import React from "react";
import ReactExport from 'react-export-excel';
import { relativeTimeThreshold } from "moment";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

//Es un ejemplo de la estructura que puede tener
const multiDataSet = [
    {
        columns: ["Name", "Salary", "Sex"],
        data: [
            ["Johnson", 30000, "Male"],
            ["Monika", 355000, "Female"],
            ["Konstantina", 20000, "Female"],
            ["John", 250000, "Male"],
            ["Josef", 450500, "Male"],
        ]
    },
    {
        xSteps: 1, // Will start putting cell with 1 empty cell on left most
        ySteps: 5, //will put space of 5 rows,
        columns: ["Name", "Department"],
        data: [
            ["Johnson", "Finance"],
            ["Monika", "IT"],
            ["Konstantina", "IT Billing"],
            ["John", "HR"],
            ["Josef", "Testing"],
        ]
    }
];

class ExcelDownload extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
        }
    }
    //Se general el excel con los datos cargados.
    render() {
        return(
            <ExcelFile>
                <ExcelSheet dataSet={this.props.data} name={this.props.nombreDocument}/>
            </ExcelFile>
        );
    }
}

export default ExcelDownload;
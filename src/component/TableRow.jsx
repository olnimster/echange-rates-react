import React from 'react';
import TableCell from "./TableCell";
import styles from './TableRow.module.scss'


const TableRow = ({ratesRow, clickHandler, feature}) => {
    const {Value, CharCode, Name, Previous, date} = ratesRow

    let percent = ((Value / Previous - 1) * 100).toFixed(4)
    let arrows;
    if (Value > Previous) {
        arrows = 'blue'
    } else {
        arrows = 'red'
    }

    return (
        <div className={styles.table_row} onClick={(e) => clickHandler(e)} id={CharCode}>
            <TableCell props={feature === 'CharCode' ? CharCode : date} name={Name}/>
            <TableCell props={Value} name={Name}/>
            <TableCell props={percent} name={Name} arrows={arrows}/>
        </div>
    );
};

export default TableRow;
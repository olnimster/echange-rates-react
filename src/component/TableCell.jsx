import React from 'react';
import styles from './TableCell.module.scss'
const TableCell = ({props, name, arrows='black'}) => {

    return (
        <div className={styles.table_cell}>
            <div className={styles.tooltip} style={{color: arrows}}>{props}
                <span className={styles.tooltiptext}>{name}</span>
            </div>
        </div>
    );
};

export default TableCell;
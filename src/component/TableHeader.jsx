import React from 'react';
import styles from './TableHeader.module.scss'
import {useSelector} from "react-redux";

const TableHeader = () => {
    const {first, second, third} = useSelector(state => state.valuate.head)

    return (
        <div className={styles.table_row }>
            <div className={styles.table_cell}>{first}</div>
            <div className={styles.table_cell}>{second}</div>
            <div className={styles.table_cell}>{third}</div>
        </div>
    );
};

export default TableHeader;
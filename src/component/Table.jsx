import React, {useEffect, useState} from 'react';
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
import styles from "./Table.module.scss"
import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import {daily, tenDays} from "../Api/Api";
import Spinner from "./spinner/Spinner";

const Table = () => {
    const [firstRow, setFirstRow] = useState()
    const dispatch = useDispatch()

    useEffect(() => {
        setFirstRow('CharCode')
        dispatch(daily());
    }, [dispatch])

    const clickHandler = (e) => {
        const el = e.target.parentElement.parentNode.id || e.target.parentElement.id
        if (el && firstRow === 'CharCode') {
            setFirstRow('date')
            dispatch(tenDays({CharCode: el, date: rates[0].date}))
        }
        if (el && firstRow === 'date') {
            setFirstRow('CharCode')
            dispatch(daily());
        }
    }

    const data = useSelector(state => state.valuate);

    const rates = data.data

    return (
        <div className={styles.table}>
            <TableHeader/>

            {(data.status === 'resolved')
                ? (Object.keys(rates).map((element) => (
                <TableRow
                    key={element}
                    ratesRow={rates[element]}
                    clickHandler={clickHandler}
                    feature={firstRow}
                />)))
                : <Spinner/>}
        </div>
    );
};

export default Table;
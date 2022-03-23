import React from 'react';

import styles from "./Main.module.scss"
import Table from "./Table";

const Main = () => {
    return (
        <div className={styles.main}>
            Курс валют
            <Table/>
     </div>
    );
};

export default Main;
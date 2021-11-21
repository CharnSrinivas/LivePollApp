import React from "react";
import styles from './styles.module.css';

export default class Logo extends React.Component {
    
    render(): React.ReactNode {
        return (
            <div className={styles['logo']}>
                <div className={styles['container']}>
                    <div className={styles['bar-1']} ></div>
                    <div className={styles['bar-2']} ></div>
                    <div className={styles['bar-3']} ></div>
                </div>
            </div>
        )
    }
}

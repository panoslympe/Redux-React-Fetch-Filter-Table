import React from "react";
import classes from './Table.module.css';


const Table = ({ displayData }) => {
    return (
        displayData.length ? <table className={classes.Table}>
            <thead>
                <tr>
                    <th>API</th>
                    <th>Category</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                {displayData.map((entry, index) => <tr key={`${index}-${entry.desc}`}>
                    <td>{entry.API}</td>
                    <td>{entry.Category}</td>
                    <td>{entry.Description}</td>
                </tr>)}
            </tbody>
        </table> : <div className={classes.Sad}><div>:(</div></div>
    )
}

export default Table;


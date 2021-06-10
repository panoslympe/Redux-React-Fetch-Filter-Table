import React, { useEffect, useState } from "react";
import axios from 'axios';
import classes from './Main.module.css';

const Main = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilterData] = useState([]);
    const [search, setSearch] = useState();
    const [selectedCategory, setSelectedCategory] = useState();
    const [categories, setCategories] = useState([]);


    //fetch data from public API
    useEffect(() => {
        axios.get('https://api.publicapis.org/entries')
            .then(res => {
                setData(res.data.entries);

                //remove duplicates and set Caregories
                const categories = [...new Set(res.data.entries.map(entry => entry.Category))];
                setCategories(categories);

            })
            .catch(err => console.log(err))
    }, []);

    //filter effect for both inputs
    useEffect(() => {
        let filtersResult = data;

        if (selectedCategory) {
            filtersResult = data.filter(each => each.Category === selectedCategory);
        }

        if (search) {
            filtersResult = filtersResult.filter(each => each.API.toLowerCase().includes(search.toLowerCase()) || each.Description.toLowerCase().includes(search.toLowerCase()));
                    }

        setFilterData(filtersResult);
    }, [selectedCategory, search, data]);


    //display constant depending on if there are filters or not
    const displayData = filteredData.length ? filteredData : (search ? [] : data);

    //report elements found
    const found =  <h1 style={{ textAlign: 'center' }}>Found: {displayData.length} elements for your search!</h1> ;

    const table = displayData.length ? <>{displayData.map((entry, index) => <tr key={`${index}-${entry.desc}`}>
    <td>{entry.API}</td>
    <td>{entry.Category}</td>
    <td>{entry.Description}</td>
</tr>)}</> : <div className={classes.Sad}>:(</div>

    //show spinner depending of if there are data or not
    const spinner = search ? table : <div className={classes.Loader}><div className="spinner"></div></div>

    return (
        <div className={classes.Main}>
            <div className={classes.Filters}>
                <div>
                    <h4>Search (for both API &amp; Description)</h4>
                    <input
                        type="text"
                        name="search"
                        placeholder="Search"
                        onChange={e => setSearch(e.target.value)} />
                </div>
                <div>
                    <h4>Select category</h4>
                    <select onChange={e => setSelectedCategory(e.target.value)}>
                        <option key="null" >-------</option>
                        {categories.map(categ => <option key={categ} value={categ}>{categ}</option>)}
                    </select>

                </div>

            </div>
            {found}
            <table className={classes.Table}>
                <thead>
                    <tr>
                        <th>API</th>
                        <th>Category</th>
                        <th>Description</th>
                    </tr>
                </thead>

                {displayData.length ?
                    <tbody>
                        {displayData.map((entry, index) => <tr key={`${index}-${entry.desc}`}>
                            <td>{entry.API}</td>
                            <td>{entry.Category}</td>
                            <td>{entry.Description}</td>
                        </tr>)}
                    </tbody>
                    : spinner}



            </table>
        </div>
    )
}

export default Main;
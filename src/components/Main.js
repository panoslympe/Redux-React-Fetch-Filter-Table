import React, { useEffect, useState } from "react";
import classes from './Main.module.css';
import { useSelector, useDispatch } from "react-redux";
import { fetchTableData } from '../store/slice';
import Table from './Table/Table';
import Filter from './Filter/Filter';



const Main = () => {
    const dispatch = useDispatch();
    const data = useSelector(state => state.reducerData.data);
    const [filteredData, setFilterData] = useState([]);
    const [search, setSearch] = useState();
    const [selectedCategory, setSelectedCategory] = useState();
    const [categories, setCategories] = useState([]);


    //fetch data from public API
    useEffect(() => {
        dispatch(fetchTableData());
    }, []);

    useEffect(() => {
        const categories = [...new Set(data.map(entry => entry.Category))];
        setCategories(categories);
    }, [data]);

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
    const found = <h1 style={{ textAlign: 'center' }}>Found: {displayData.length} elements for your search!</h1>;

    //show spinner depending of if there are data or not
    const spinner = <div className={classes.SpinnerContainer}><div className="Spinner"></div></div>

    return (
        <div className={classes.Main}>
            <div className={classes.Filters}>

                <Filter
                    title="Search (for both API &amp; Description)"
                    type="input"
                    liftingUp={e => setSearch(e)} />

                <Filter
                    title="Category"
                    type="select"
                    liftingUp={e => setSelectedCategory(e)}
                    options={categories}
                />

            </div>

            {data.length ?
                <>{found}  <Table displayData={displayData} /></>
                :
                <><h1 style={{ textAlign: 'center' }}>Loading...</h1>  {spinner}</>}
        </div>
    )
}

export default Main;


import React from "react";


const Filter = (props) => {


    let render;

    switch (props.type) {
        case 'input':
            render = <div >
                <h4>{props.title}</h4>
                <input
                    type="text"
                    name="search"
                    placeholder="Search"
                    onChange={e => props.liftingUp(e.target.value)}
                    style={{ width: '250px' }} />
            </div>
            break;
        case 'select':
            render = <div>
                <h4>{props.title}</h4>
                <select
                    onChange={e => props.liftingUp(e.target.value)}
                    style={{ width: '250px' }}>
                    <option key="null" >Please select</option>
                    {props.options.map(categ => <option key={categ} value={categ}>{categ}</option>)}
                </select>

            </div>
            break;
        default:
        }


    return render;

}

export default Filter;


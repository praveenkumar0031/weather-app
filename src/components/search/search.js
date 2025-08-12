import "./search.css";
import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate"
import { geo_Api_Url, geoApiOtps } from "../../api"
const Search = ({ onSearchChange }) => {

    const [search, setSearch] = useState("coimbatore");
    require('react-dom');
window.React2 = require('react');
console.log(window.React1 === window.React2);
    const loadOptions = async (inputValue) => {
        return fetch(`${geo_Api_Url}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
            geoApiOtps
        )
            .then((response) => response.json())
            .then((response) => {
                return {
                    options: response.data.map((city) => {
                        return {
                            value: `${city.latitude} ${city.longitude}`,
                            label: `${city.name}, ${city.countryCode}`,

                        }
                    })
                }
            })
            
            .catch((e) => console.error(e));
    }

    const handleOnChange = (searchData) => {
        console.log(searchData);
        setSearch(searchData);
        onSearchChange(searchData);
    }
    

    return (
        <div className="search-container">
            <AsyncPaginate
                placeholder="Search for city"
                debounceTimeout={900}
                value={search}
                onChange={handleOnChange}
                loadOptions={loadOptions}
                // No need for classNamePrefix with attribute selectors
            />
        </div>
    );
}
export default Search;
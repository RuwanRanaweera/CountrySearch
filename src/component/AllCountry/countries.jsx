import React ,{useState, useEffect}from 'react'
import { apiUrl} from '../Util/api';
import Search from '../search/Search';
import {Link} from 'react-router-dom';

const Countries=()=> {
    const [countries, setContries]= useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    const getAllCountries = async()=>{

            try {
                const res = await fetch(`${apiUrl}/all`);
                if(!res.ok) throw new Error('Something went wrong');
                const data = await res.json();
             
                setContries(data);
                setIsLoading(false);

            } catch (error) {
                setIsLoading(false);
                setError(error.message);
            }
    };
    const getCountryByName = async(countryName)=>{
            try {
                const res = await fetch(`${apiUrl}/name/${countryName}`)
                if(!res.ok) throw new Error('Nothing found any country');
                const data = await res.json();
                setContries(data); 
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                setError(error.message);
            }
    }
    useEffect(()=>{
        getAllCountries();
    },[]);


  return (
    <div className='all_country_wrapper'>
      <div className='country_top'>
                <div className="search">
                    <Search onSearch={getCountryByName}/>
                </div>
      </div>

    <div className='country_bottom'>
        {isLoading && ! error && <h4> Loading ...</h4>}
        { error && !isLoading && <h4>{error}</h4>}
        {
            countries?.map(country=>(
                <Link to={`/country/${country.name.common}`}>
                    <div className='country_card'>

                    <div className="country_data">
                        <h3>{country.name.common}</h3>
                        <h6>Currency: {country.currency}</h6>
                        <h6>Region : {country.region}</h6>
                        <h6>Langauge: {country.lang}</h6>
                    </div>
                </div>
                </Link>

            ))
        }
    </div>
    </div>
  )
}

export default Countries;

import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import { apiUrl } from '../Util/api';
import {Link} from 'react-router-dom';

const CountryInfomation = () => {

    const [country, setCountry] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')
    const {countryName}= useParams()
    const {stringVal,setStringVal} = useState('')

    const getValueByJson = async (stringValue)=>{
        try {
            let text = "";
            for(const x in stringValue){
                text += stringVal[x] + " ";
                return text;

  
            }
        } catch (error) {
            
        }
    }
    const getCountryByName= async()=>{
        try {
           
            const res = await fetch(`${apiUrl}/name/${countryName}`);
       
            if(!res.ok) throw new Error('Could not found country')
            const data = await res.json()
            setCountry(data)
            console.log("data",data)
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            setError(error.message)
        }
    }
    useEffect(()=>{
        getCountryByName()
       
        
    },[countryName])
  return (
    <div className='country_info_wrap'>
    <button><Link to ='/'>Back</Link></button>
    {isLoading && ! error && <h4> Loading ...</h4>}
        { error && !isLoading && <h4>{error}</h4>}
    {
        country?.map((countryinfo,index)=>(            
        <div className="country_info_container" key={index}>
        <div className="country_info_img">
        <img src = {countryinfo.flags.png} alt=""/>
            <div className="country_info">
                <h3>{countryinfo.name.common}</h3>
                <div className="country_info_left">

                <h5>Langauge: <span>{ getValueByJson(JSON.stringify(countryinfo.languages)).stringValue}</span> </h5>
                <h5>Capital: <span>{countryinfo.capital[0]}</span> </h5>
                <h5>Callingcode: <span>{countryinfo.callingcode}</span> </h5>
                <h5>Lat: <span>{countryinfo.latlng[0]}</span></h5>
                <h5>Long: <span>{countryinfo.latlng[1]}</span></h5>

                </div>
            </div>
        </div>
    </div>)

        )
    }

  </div>
  )

}

export default CountryInfomation;

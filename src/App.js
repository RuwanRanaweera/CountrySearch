import './app.css'
import { Routes, Route } from "react-router-dom";
import Countries from "./component/AllCountry/countries";
import CountryInfo from "./component/CountryInfomation/CountryInfomation";

function App() {
  return (
    <>
  <div className='header'>
    <div className='container'>
      <h5>Where in the world</h5> 
    </div>
  </div>
  <div className='container'>
    <Routes>
      <Route path="/" element={<Countries/>}/>
      <Route path="/country/:countryName" element={<CountryInfo/>}/>
    </Routes>
  </div>
    </>
  )
  
 // <h1>Hello world</h1>
}

export default App;

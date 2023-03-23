import logo from './logo.svg';
import './App.css';
import { useState} from 'react';  
import { useEffect } from 'react';
import PlacesAutocomplete ,
 {geocodeByAddress, getLatLng} from 'react-places-autocomplete';
const api = {
  key: "e6e93798493efd31248c956d259facf1",
  base: "https://api.openweathermap.org/data/2.5/"
}
function App() {
const [query, setQuery] = useState('');
const [weather , setWeather] = useState({});
const [error , setError]= useState(false);
const [address ,setAddress]= useState('');




const handleSelect = async value => {
  // const results = await geocodeByAddress(value);
  // console.log(results);
  // setAddress(value);
  
  search();
}


const handleKeyDown = (event) => {
  if (event.key === 'Enter') {
    // console.log(query);
    // search();

  
  }


}




const search = async( event )=> {
 

  try {
  
  const response = await fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res=> res.json())
      .then(result => {
        setWeather(result);
        setQuery('');

        console.log(response);
        
      });
  } catch (error) {
   
   
  }
  
}


  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September","October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${date} ${month} ${year} `
   }


   const searchOptions = {
    types: ['(cities)'],
    // componentRestrictions: { country: 'us' }, // replace 'us' with the country code you want to restrict to
  };
  return (

   
    <div className={
     (typeof weather.main != "undefined") ? ((weather.main.temp <= 7 ) ? 'app cold' :  (weather.main.temp > 7 && weather.main.temp <=16 ) ? 'app cool' :(weather.main.temp > 16 && weather.main.temp < 25)  ? 'app warm': (weather.main.temp >= 25 ) ? 'app hot':'app' )  
      : 'app'
    }>
      
       <main>
  
        {/* <div className='search-box'> */}
           {/* <input 
           type="search"
           className='search-bar'
           placeholder='search...'
           onChange={(event) => setQuery(event.target.value)}
            onKeyDown={handleKeyDown} 
            value={query}
           
         
           
           >
           </input> */}
          
          <div className='search-box'>
      <PlacesAutocomplete
        value={query} 
        onChange={setQuery}
        onSelect={handleSelect}
        searchOptions={searchOptions}
        >
    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) =>(
        <div>
          <input {...getInputProps({placeholder: "Type address"})}  className='search-bar' />
          <div>
            {loading ? <div>...loading</div>: null}
            {suggestions.map((suggestion)=>{
              const style = {
                 backgroundColor: suggestion.active ? "#41b6e6" : "#fff"
              };


            return   <div className='search-suggestion' {...getSuggestionItemProps(suggestion, { style })}>
              {suggestion.description}</div>
            })}
            
          </div>
        </div>)}

      </PlacesAutocomplete>
    

           <image ></image>
        
        </div>
{(typeof weather.main != "undefined") ? (

<div>

        <div className='location-box'>
              <div className='location'>{weather.name}, {weather.sys.country}</div>
              <div className='date'>{dateBuilder(new Date())}</div>
        </div>
      <div className='weather-box'>
        <div className='temp'> {Math.round(weather.main.temp)}°c </div>
        {/* <div className='weather'>{weather.weather[0].main}</div> */}
        {/* <h1>{weather.main.temp}</h1> */}
      </div>
</div>
) : (!query)?(
  <div>
      <div className='weather-box'>
        <div className='temp'>please choose a city</div>
    
      </div>
  </div>
):(typeof weather.main === "undefined")?(
  <div>
  <div className='weather-box'>
    <div className='temp'>city does not exist</div>

  </div>
</div>
):('')
}



       </main>
       
    </div>
    
  );
}

export default App;

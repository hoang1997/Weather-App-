import React from "react";
import Titles from "./Components/Titles";
import Form from "./Components/Form";
import Weather from "./Components/Weather"


const API_KEY = "d588a27adb9984271c9ad65a9fe8ce32";

class App extends React.Component {
    state  = {
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: undefined
    }
    getWeather = async(e) => {
        e.preventDefault();
        const city = e.target.elements.city.value;
        const country = e.target.elements.country.value;    
        if (city && country)
        {
            const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`);
            const api_reply = await api_call.json();
            console.log(api_reply);
        
            this.setState({
                temperature: api_reply.main.temp,
                city: api_reply.name,
                country: api_reply.sys.country,
                humidity: api_reply.main.humidity,
                description: api_reply.weather[0].description,
                error: " "
            })
        } 
        else 
        {
            this.setState({
                temperature: undefined,
                city: undefined,
                country: undefined,
                humidity: undefined,
                description: undefined,
                error: "Invalid Input: Check City and Country inputs"
            })
        }
    }
    render() {
        return(
        <div> 
            <Titles/>
            <Form getWeather = {this.getWeather}/>
            <Weather 
                temperature = {this.state.temperature}
                city = {this.state.city}
                country = {this.state.country}
                humidity = {this.state.humidity}
                description = {this.state.description}
                error = {this.state.error}
            />
        </div>
        );
    }
};

export default App;
    

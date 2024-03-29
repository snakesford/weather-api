import React, {Component} from 'react';
import CardList from '../components/Assembly/CardList';
import CardList2 from '../components/Assembly/CardList2';
import SearchBox from '../components/SearchBox.jsx';
import SubmitButton from '../components/SubmitButton.jsx'
import Forecast from '../components/Forecast/Forecast.jsx'
import './App.css'

class App extends Component {
  constructor() {
    super()
    this.state = {
      weatherData: [],
      weatherData2: [],
      searchField: '45.57592, -122.85168',
      bool: false,
      url: 'https://weatherapi-com.p.rapidapi.com/current.json?q=',
      forecast: 'https://weatherapi-com.p.rapidapi.com/forecast.json?q=',
      url1: 'https://aerisweather1.p.rapidapi.com/observations/',
      apiKey: '3a836c49fdmshf423ee7c43600d9p130177jsn92668590654f',
      apiHost: 'weatherapi-com.p.rapidapi.com',
      apiHost0: 'weatherapi-com.p.rapidapi.com',
      apiHost1: 'aerisweather1.p.rapidapi.com'
    }
  }

  async fetchApi() {
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': ''+this.state.apiKey+'',
          'X-RapidAPI-Host': ''+this.state.apiHost+''
        }
      };
      
      fetch(''+this.state.forecast+''+this.state.searchField+'' + '&days=3', options)
      .then(response => response.json())
      .then(weather => this.setState(
        () => {
          return {
            weatherData: [weather]
          };
        },
        () => {
          console.log("fetchAPI", this.state.weatherData);
        }
      ))
      .catch(err => console.log('error', err));
      //add check somewhere to make sure string is valid before rerendering
  }

  async fetchAeris() {
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': ''+this.state.apiKey+'',
          'X-RapidAPI-Host': ''+this.state.apiHost1+''
        }
      };
      
      fetch(''+this.state.url1+''+this.state.searchField+'', options)
      .then(response => response.json())
      .then(weather => this.setState({ weatherData2: [weather]}))
      .catch(err => console.log('error', err));
  }

  resetSearchField = () => {
    this.setState(
      () => {
        return {
          searchField: ''
        }
      },
      () => {

      }
    )
  }

  changeToAe = () => {
    this.setState(
      () => {
        return {
          bool: true
        };
      },
      () => {
        this.NEWonButtonPressNEW()
      }

    )
  }

  changeToCom = () => {
    this.setState(
      () => {
        return {
          bool: false
        }
      },
      () => {
        this.NEWonButtonPressNEW()
      }
    )
    this.NEWonButtonPressNEW()
  }

  
  componentDidMount() {
    this.NEWonButtonPressNEW()
    this.resetSearchField()
  }

  onSearchChange = (event) => {
    this.setState(
      () => {
        return {
          searchField: event.target.value
        }
      },
      () => {

      }
    )
  }

  NEWonButtonPressNEW = () => {
    if (this.state.searchField !== '') {
      if (this.state.bool == true) {
        this.fetchAeris()
      } else {
        this.fetchApi()
      }
    } else {
      console.log("Nothing in search field");
    }
  }

  render() {
    const { weatherData, weatherData2, bool } = this.state;
    return (
      <div className='tc'>
          <button onClick={() => { this.changeToCom()}} className="button button1">Use weatherapi-com</button>
          <button onClick={() => { this.changeToAe()}} className="button button2">Use aerisweather</button>
          {bool ?
          <SubmitButton buttonPress={this.NEWonButtonPressNEW}/>
          :
          <SubmitButton buttonPress={this.NEWonButtonPressNEW}/>
          }
          <SearchBox searchChange={this.onSearchChange}/>
          {bool ?
            <CardList2 weatherData2={weatherData2}/>
          :  
            <CardList weatherData={weatherData}/>
          }
      </div>
    );
  }
}

export default App;
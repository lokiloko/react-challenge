//Dependencies
import React from 'react'
import axios from 'axios'
import { Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

//Redux
import { GetCityList } from './actions/CityList'
import { GetMyWeather } from './actions/MyWeather'

//Component File
import CityListReactRedux from './CityListReactRedux';
import MyForecastReactRedux from './MyForecastReactRedux';
import ForecastDetailReactRedux from './ForecastDetailReactRedux'

class ReduxReact extends React.Component {
  constructor() {
    super()
    this.state = {
      cityName: ''
    }
    // this.setCityName = this.setCityName.bind(this)
    // this.getWeatherByCity = this.getWeatherByCity.bind(this)
  }
  getWeatherByLocation() {
    navigator.geolocation.getCurrentPosition((pos) => {
      // console.log(pos.coords.latitude)
      // console.log(pos.coords.longitude)
      axios.get('http://api.openweathermap.org/data/2.5/weather?lat=' + pos.coords.latitude.toString() + '&lon=' + pos.coords.longitude.toString() + '&APPID=2cd58962203b9095d5775fe5e666ee31&units=metric').then((data) => {
        // this.setState({weather: data.data})
        // store.dispatch(GetMyWeather(data.data))
        this.props.GetMyWeather(data.data)
      }).catch((err) => {
        console.log(err)
      })
    })
  }
  getWeatherByCity(e) {
    e.preventDefault()
    axios.get('http://api.openweathermap.org/data/2.5/weather?q=' + this.state.cityName + '&APPID=2cd58962203b9095d5775fe5e666ee31&units=metric').then((data) => {
      this.props.GetMyWeather(data.data)
    }).catch((err) => {
      console.log(err)
    })
  }
  getListBox() {
    // axios.get('http://api.openweathermap.org/data/2.5/box/city?bbox=92.460937,-10.919618,141.152344,8.494105&APPID=2cd58962203b9095d5775fe5e666ee31&units=metric').then((data) => {
    //   this.setState({
    //     weathers: data.data.list
    //   })
    // }).catch((err) => {
    //   console.log(err);
    // })
    axios.get('http://api.openweathermap.org/data/2.5/box/city?bbox=92.460937,-10.919618,141.152344,8.494105&APPID=2cd58962203b9095d5775fe5e666ee31&units=metric').then((data) => {
      this.props.GetCityList(data.data.list)
    }).catch((err) => {
      console.log(err);
    })
  }

  componentDidMount() {
    this.getWeatherByLocation()
    this.getListBox()
    // console.log('----------------');
  }

  setCityName(e) {
    this.setState({cityName: e.target.value})
  }
  findWeather(city) {
    var index = this.props.weathers.findIndex(weather => {
      if(weather.name === city) {
        return weather
      }
    })
    return this.props.weathers[index]
  }
  render () {
    return (
      <div className="container">
        <div className="hero" data-bg-image="images/banner.png">
          <div className="container">
            <form action="#" className="find-location" onSubmit={(e) => this.getWeatherByCity(e)}>
              <input type="text" placeholder="Find your location..." onChange={(e) => this.setCityName(e)}/>
              <input type="submit" value="Find"/>
            </form>
          </div>
        </div>
        <MyForecastReactRedux/>
        <main className="main-content">
          <div className="fullwidth-block">
            <div>
              <Route exact path="/react/:city" render={({match})=>{return(<ForecastDetailReactRedux weather={this.findWeather(match.params.city)} />)}}></Route>
              <Route exact path="/react" render={()=><CityListReactRedux/>}></Route>
            </div>
          </div>
        </main>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    weathers: state.CityList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    GetMyWeather: (weather) => dispatch(GetMyWeather(weather)),
    GetCityList: (weathers) => dispatch(GetCityList(weathers))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ReduxReact))

import React from 'react'
import { Link } from 'react-router-dom'

class CityItem extends React.Component {
  render() {
    return(
      <div className="col-md-3 col-sm-6">
        <div className="live-camera">
          <h3 className="location"><Link to={'/redux/' + this.props.props.weather.name}>{this.props.props.weather.name}</Link></h3>
          <small className="date">{new Date().toString()}</small>
        </div>
      </div>
    )
  }
}

export default CityItem

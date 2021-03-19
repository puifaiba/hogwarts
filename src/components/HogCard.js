import React, {Component} from "react"
import hogs from "../porkers_data"
import {Card, Icon, Image} from "semantic-ui-css"

export default class HogCard extends Component {
  state = {
    showDetail: false,
  }

  changeShowDetail = (event) => {
    this.setState({
      showDetail: !this.state.showDetail,
    })
  }

  pigImage = () => {
    const {name} = this.props.hog
    const searchName = name.replace(/ /g, "_").toLowerCase()
    return require(`../hog-imgs/${searchName}.jpg`)
  }

  render() {
    const {name, specialty, greased, weight} = this.props.hog
    return (
      <card onClick={this.changeShowDetail} className="pigTile">
        <h3>{name}</h3>
        <img src={this.pigImage()} />
        {this.state.showDetail ? (
          <ul>
            <li>Speciality: {specialty}</li>
            <li>Greased: {greased ? "Yes" : "No"}</li>
            <li>Weight: {weight} tons</li>
            <li>Highest Medal: {this.props.hog["highest medal achieved"]}</li>
          </ul>
        ) : null}
      </card>
    )
  }
}

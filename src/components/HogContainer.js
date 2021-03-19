import React, {Component} from "react"
import HogCard from "./HogCard"

export default class HogContainer extends Component {
  state = {
    showGreased: true,
    sortName: false,
    sortWeight: false,
  }

  toggleGreasedFilter = () => {
    this.setState({
      showGreased: !this.state.showGreased,
    })
  }

  toggleNameSort = () => {
    this.setState({
      sortName: !this.state.sortName,
    })
  }

  toggleWeightSort = () => {
    this.setState({
      sortWeight: !this.state.sortWeight,
    })
  }

  sortHogList = () => {
    let sortedHogs = []

    //Sort By Name
    if (this.state.sortName) {
      const hogs = this.props.hogs.map((hog) => hog)
      console.log(hogs)
      sortedHogs = hogs.sort((a, b) => {
        const nameA = a.name.toUpperCase()
        const nameB = b.name.toUpperCase()
        if (nameA < nameB) {
          return -1
        }
        if (nameA > nameB) {
          return 1
        }
        return 0
      })
    } else {
      //   console.log(this.props.hogs)
      sortedHogs = this.props.hogs
    }

    //Sort By Weight
    if (this.state.sortWeight) {
      sortedHogs = this.props.hogs.sort((a, b) => {
        const weightA = a.weight
        const weightB = b.weight
        if (weightA < weightB) {
          return -1
        }
        if (weightA > weightB) {
          return 1
        }
        return 0
      })
    } else {
      sortedHogs = this.props.hogs
    }

    //return sorted array to generateHogList
    return sortedHogs
  }

  generateHogList = () => {
    let hogList = this.sortHogList()
    if (this.state.showGreased) {
      return hogList
    }
    return hogList.filter((hog) => hog.greased)
  }

  render() {
    return (
      <div className="indexWrapper">
        <h1>Hello Hogs</h1>
        <button onClick={this.toggleGreasedFilter}>Greased Filter</button>
        <button onClick={this.toggleNameSort}>Sort by Name</button>
        <button onClick={this.toggleWeightSort}>Sort by Weight</button>
        {this.generateHogList().map((hog) => (
          <HogCard hog={hog} />
        ))}
      </div>
    )
  }
}

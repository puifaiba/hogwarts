import React, {Component} from "react"
import HogCard from "./HogCard"

export default class HogContainer extends Component {
  state = {
    showGreased: true,
    sortType: "none",
  }

  // gets list of hogs from props, then calls sort and filter functions to transform list.
  //Finally returns final list to render cards
  generateHogList = () => {
    console.log("generate Hog List")
    let hogList = this.props.hogs.map((hog) => hog)
    hogList = this.sortHogList(hogList)
    if (this.state.showGreased) {
      return hogList
    }
    return hogList.filter((hog) => hog.greased)
  }

  //logic to determine what key to apply sort to.
  //If sortType === "none" will return unalterd list
  sortHogList = (listToSort) => {
    if (this.state.sortType === "name") {
      return this.sortFunction(listToSort, "name")
    } else if (this.state.sortType === "weight") {
      return this.sortFunction(listToSort, "weight")
    } else {
      return listToSort
    }
  }

  //abstracted sort function returns sorted list based on supllied key
  sortFunction = (listToSort, key) => {
    console.log("inside SortFunction")
    listToSort.sort((a, b) => {
      const itemA = a[key]
      const itemB = b[key]
      if (itemA < itemB) {
        return -1
      }
      if (itemA > itemB) {
        return 1
      }
      return 0
    })
    return listToSort
  }

  // changes method to sort on.
  changeSort = ({target}) => {
    let sortKey = target.id
    if (sortKey === this.state.sortType) {
      sortKey = "none"
    }
    this.setState({
      sortType: sortKey,
    })
  }

  toggleGreasedFilter = () => {
    this.setState({
      showGreased: !this.state.showGreased,
    })
  }

  render() {
    return (
      <div className="indexWrapper">
        <h1>Hello Hogs</h1>
        <button
          onClick={this.toggleGreasedFilter}
          id="greased"
          className={
            !this.state.showGreased ? "ui positive button" : "ui button"
          }
        >
          Greased Filter
        </button>
        <div className="ui buttons">
          <button
            onClick={this.changeSort}
            id="name"
            className={
              this.state.sortType === "name"
                ? "ui positive button"
                : "ui button"
            }
          >
            Sort by Name
          </button>
          <div className="or"></div>
          <button
            onClick={this.changeSort}
            id="weight"
            className={
              this.state.sortType === "weight"
                ? "ui positive button"
                : "ui button"
            }
          >
            Sort by Weight
          </button>
        </div>
        {this.generateHogList().map((hog) => (
          <HogCard hog={hog} />
        ))}
      </div>
    )
  }
}

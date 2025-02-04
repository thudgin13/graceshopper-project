import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchMugs} from '../store/mug'
import {Link} from 'react-router-dom'

class AllMugs extends Component {
  constructor() {
    super()
    this.setPrice = this.setPrice.bind(this)
  }
  componentDidMount() {
    this.props.loadMugs()
  }
  setPrice(number) {
    return (number / 100).toFixed(2)
  }
  render() {
    if (this.props.mugs === undefined) {
      return (
        <div className="pageContainer">
          <h2>Loading...</h2>
        </div>
      )
    }
    return (
      <div className="pageContainer">
        <div className="productContainer">
          {this.props.mugs.map(mug => (
            <div className="productCard" key={mug.id}>
              <Link className="productStyle" to={`/mugs/${mug.id}`}>
                <img id="productPhoto" alt={mug.name} src={mug.imageUrl} />
                <h3 className="productStyle">{mug.name}</h3>
              </Link>
              <h4 className="productStyle">${this.setPrice(mug.price)}</h4>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    mugs: state.mugs
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadMugs: () => dispatch(fetchMugs())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllMugs)

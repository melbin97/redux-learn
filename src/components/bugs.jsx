import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadBugs, resolveBug, unResolvedBugsSelector } from '../store/enitities/bugs';

class Bugs extends Component {

  componentDidMount() {
    this.props.loadBugs()
  }

  render() {
    return (
      <div>
        <h1>Add bugs</h1>
        <ul>
          {this.props.bugs.map((bug, index) => <li key={bug.id}>{bug.description}
            <button key={index} onClick={() => this.props.resolveBug(bug.id)}>
              Resolve
            </button>
          </li>)}
        </ul>
      </div>
    )
  }
}

//state.entities.bugs.list
const mapStateToProps = state => ({
  bugs: unResolvedBugsSelector(state)
})

const mapDispatchToProps = dispatch => ({
  loadBugs: () => dispatch(loadBugs()),
  resolveBug: (id) => dispatch(resolveBug(id))
})

//container component that wraps presentatin component Bugs
export default connect(mapStateToProps, mapDispatchToProps)(Bugs)

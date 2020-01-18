import React from 'react';
import {Node} from './diagram';
import rd3 from 'react-d3-library';
const RD3Component = rd3.Component;

class Chart extends React.Component{

  getInitialState() {
    return {d3: {}}
  }

  componentDidMount() {
    this.setState({d3: Node});
  }

  render() {
    return (
      <div>
        {this.state.d3? <RD3Component data={this.state.d3} />: null}
      </div>
    )
  }
};

export default Chart

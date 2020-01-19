import * as React from 'react';
import * as d3 from 'd3';

function dragstart(item, d){
  d3.event.sourceEvent.stopPropagation();
  d3.select(item).classed("dragging", true);
}

function dragged(item, d){
  d3.select(item).attr("cx", d3.event.x).attr("cy", d3.event.y);
}

function dragend(item, d){
  d3.select(item).classed("dragging", false);
}

class Circle extends React.Component {
  componentDidMount(){
    const drag = d3.drag().subject(d=>{return d3.select(this.ref)}).on("start", dragstart).on("drag",dragged).on("end", dragend)
    if (this.ref){
      d3.select(this.ref).attr("fill", "red").attr("r", 15).attr("cx", 50).attr("cy", 50).call(drag);
    }
  }
  render(){
    return <svg><circle ref = {ref=>(this.ref = ref)}/></svg>
  }
}

export default Circle

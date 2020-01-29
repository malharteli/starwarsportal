import * as React from "react";
import * as d3 from "d3";
import styled from 'styled-components'

//This is an experiment of sorts
//Basically, I'm implementing D3 example Force Dragging II into React.

const StyledCanvas = styled.canvas`
width: 640px;
height: 320px;
position: absolute;
border: 2px solid yellow;
`

class Canvas extends React.Component{

  componentDidMount(){
    const canvas = this.refs.canvas;
    const context = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;
    const radius = 20;
    const data = this.props.data
    let sum = 0;
    data.forEach(d=> {sum += d.value});
    // sum = 30000000
    console.log(sum)
    var circles = d3.range(data.length).map(function(i) {
      return {
        // x: (data[i].value/ 25) * (radius + 1) * 2,
        // y: Math.floor(data[i].value % 25) * (radius + 1) * 2,
        x: (data[i].value % 25) * (radius + 1) * 2,
        y: Math.floor(data[i].value / 25) * (radius + 1) * 2,
        value: data[i].value,
        name: data[i].name
      };
    });

var attractForce = d3.forceManyBody().strength(80).distanceMax(200).distanceMin(80);
var collisionForce = d3.forceCollide(/*d=>d.value/sum * width*/ 20).strength(1).iterations(100);

var simulation = d3.forceSimulation(circles)
.force("collide", collisionForce).force("attract", attractForce)
.on("tick", drawCircles);

d3.select(canvas)
.call(d3.drag()
    .container(canvas)
    .subject(dragsubject)
    .on("start", dragstarted)
    .on("drag", dragged)
    .on("end", dragended));

function drawCircles() {
context.clearRect(0, 0, width, height);
context.save();
context.beginPath();
context.textAlign = "center"
circles.forEach(drawCircle);
context.strokeStyle = "yellow";
context.stroke();
}

function drawCircle(d) {
context.moveTo(d.x, d.y);
context.arc(d.x, d.y, (radius), 0, 2 * Math.PI);
context.fillText(d.name, d.x, d.y)
context.strokeText(d.name, d.x, d.y)
}

function dragsubject() {
  console.log(d3.event)
return simulation.find(d3.event.x, d3.event.y, radius);
}

function dragstarted() {
if (!d3.event.active) simulation.alphaTarget(0.3).restart();
d3.event.subject.fx = d3.event.subject.x;
d3.event.subject.fy = d3.event.subject.y;
}

function dragged() {
d3.event.subject.fx = d3.event.x;
d3.event.subject.fy = d3.event.y;
}

function dragended() {
if (!d3.event.active) simulation.alphaTarget(0);
d3.event.subject.fx = null;
d3.event.subject.fy = null;
}
  }

  render(){
    return(
      <div>
        <StyledCanvas ref="canvas" width="640px" height="320px"/>
      </div>
    )
  }
}

export default Canvas

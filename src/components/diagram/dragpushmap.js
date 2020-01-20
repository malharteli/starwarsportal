import * as React from "react";
import * as d3 from "d3";

//This is an experiment of sorts
//Basically, I'm implementing D3 example Force Dragging II into React.



class Canvas extends React.Component{



  componentDidMount(){
    const canvas = this.refs.canvas;
    const context = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;
    const radius = 20;
    const data = this.props.data
    var circles = d3.range(324).map(function(i) {
      return {
        x: (i % 25) * (radius + 1) * 2,
        y: Math.floor(i / 25) * (radius + 1) * 2
      };
    });

var simulation = d3.forceSimulation(circles)
.force("collide", d3.forceCollide(radius + 1).iterations(4))
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
circles.forEach(drawCircle);
context.fill();
context.strokeStyle = "#fff";
context.stroke();
}

function drawCircle(d) {
context.moveTo(d.x + radius, d.y);
context.arc(d.x, d.y, radius, 0, 2 * Math.PI);
}

function dragsubject() {
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
        <canvas ref="canvas" width = {1920} height ={1080}/>
      </div>
    )
  }
}

export default Canvas

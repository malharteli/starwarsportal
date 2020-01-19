import React, {useState, useEffect} from 'react';
import { useQuery } from '@apollo/react-hooks';
import * as d3 from 'd3'
import gql from 'graphql-tag';
import './App.css';
import styled from 'styled-components'
import {DragPush, AnimatedPieSvg} from './components/diagram'


const StyledDiv = styled.div`
  padding: 0.5em;
  color: ${props => props.inputColor || "yellow"};
  background: black;
  border: solid;
  border-color: yellow;
  border-radius: 3px;
  display:flex;
  flex-direction:column;
`

const StyledTitle = styled.div`
  text-align:center;
  font-size: 24px;
`

const StyledP = styled.p`

`

const GET_FIRSTGEN_INFO = gql`
{
  allStarships(orderBy:length_ASC){
    name
    hyperdriveRating
    length
    crew
    passengers
    pilots(orderBy: height_ASC){
      name
      height
      homeworld{
        name
      }
    }
  }
}
`

function App() {
  const { data, loading, error} = useQuery(GET_FIRSTGEN_INFO)

  const generateData = (value, length = 5) =>
    d3.range(length).map((item, index) => ({
      date: index,
      value: value === null || value === undefined ? Math.random() * 100 : value
    }));

  const [datab, setData] = useState(generateData(0));
  const changeData = () => {
    setData(generateData());
  };

  useEffect(
    () => {
      setData(generateData());
    },
    [!data]
  );

  let infoData = []

  if (loading) return <p>loading...</p>
  if (error) return <p>Error... {error.message}</p>
  if (data) {
    console.log(data)
    if (data.allStarShips){
    data.allStarShips.forEach((item, index)=>{
      infoData.push({date: item.name, value: item.length})
    })
    console.log(infoData)
  }}
  return (
    <React.Fragment>
      {data.allStarships.map((item, index)=>
      <StyledDiv key={index}>
        <StyledTitle>{item.name}</StyledTitle>
        <p>{item.length}</p>
        <p>{item.crew}</p>
        <p>{item.passengers}</p>
      </StyledDiv>)}
      <DragPush />
      <div>
        <span className="label">Animated Pie SVG (React Spring)</span>
        <AnimatedPieSvg
          data={infoData}
          width={200}
          height={200}
          innerRadius={60}
          outerRadius={100}
        />
      </div>
    </React.Fragment>
  )
}

export default App;

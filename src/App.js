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
  align-items:center;
`

const StyledTitle = styled.div`
  text-align:center;
  font-size: 24px;
`

const StyledTable = styled.table`
  border: solid;
  margin: 0.25em;
  padding: 0.25em;
  color: yellow;
  width: 50%;
  text-align:center;
`
const StyledContainer =styled.div`
  margin-left: 10%;
  margin-right: 10%;
`

const StyledP = styled.p`

`

const GET_STARSHIP_INFO = gql`
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

const GET_PLANET_INFO = gql`{
  allPlanets(orderBy:population_DESC, filter:{population_gt:0}){
    name
    diameter
    gravity
    population
    surfaceWater
    climate
    films(orderBy:episodeId_ASC){
      title
    }
  }
}
`

function ShipData() {
  const { data, loading, error} = useQuery(GET_STARSHIP_INFO)


  let infoData = ''

  if (loading) return <p>loading...</p>
  if (error) return <p>Error... {error.message}</p>
  if (data) {
    infoData = data.allStarships.map(item => {
      const container ={}
      container["name"] = item.name
      container["value"] = item.length + item.crew
      return container
    }
      )
    console.log(infoData)
  }
  return (
    <React.Fragment>
      <StyledContainer>
      {data.allStarships.map((item, index)=>
      <StyledDiv key={index}>
        <StyledTitle>{item.name}</StyledTitle>
        <StyledTable>
          <thead>
          <tr>
            <th>Length</th>
            <th>Crew Size</th>
            <th>Total Capacity</th>
          </tr>
          </thead>
          <tbody>
          <tr>
          <td>{item.length}</td>
          <td>{item.crew}</td>
          <td>{item.passengers + item.crew}</td>
          </tr>
          </tbody>
        </StyledTable>
      </StyledDiv>)}
      <StyledDiv>
        <span className="label">Breakdown of Ships by Length</span>
        <AnimatedPieSvg
          data={infoData}
          width={400}
          height={400}
          innerRadius={0}
          outerRadius={200}
        />
      </StyledDiv>
      <DragPush data ={infoData}/>
      </StyledContainer>
    </React.Fragment>
  )
}

function PlanetData() {
  const { data, loading, error} = useQuery(GET_PLANET_INFO)


  let infoData = ''

  if (loading) return <p>loading...</p>
  if (error) return <p>Error... {error.message}</p>
  if (data) {
    infoData = data.allPlanets.map(item => {
      const container ={}
      container["name"] = item.name
      container["value"] = item.population
      return container
    }
      )
    console.log(infoData)
  }
  return (
    <React.Fragment>
      <StyledContainer>
      {/* {data.allPlanets.map((item, index)=>
      <StyledDiv key={index}>
        <StyledTitle>{item.name}</StyledTitle>
        <StyledTable>
          <thead>
          <tr>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Population</th>
          </tr>
          </thead>
          <tbody>
          <tr>
          <td>{item.diameter? item.diameter: "unknown"}</td>
          <td>{item.climate}</td>
          <td>{item.population}</td>
          </tr>
          </tbody>
        </StyledTable>
      </StyledDiv>)}
      <StyledDiv>
        <span className="label">Breakdown of Planets by Population</span>
        <AnimatedPieSvg
          data={infoData}
          width={400}
          height={400}
          innerRadius={0}
          outerRadius={200}
        />
      </StyledDiv> */}
      <DragPush data ={infoData}/>
      </StyledContainer>
    </React.Fragment>
  )
}

function App(){
  return PlanetData()
}

export default App;

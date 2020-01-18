import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import './App.css';
import styled from 'styled-components'

const StyledDiv = styled.div`
  padding: 0.5em;
  color: ${props => props.inputColor || "yellow"};
  background: black;
  border: solid;
  border-color: yellow;
  border-radius: 3px;
`

const StyledTitle = styled.div`
  text-align:center;
  font-size: 24px;

`

const GET_FIRSTGEN_INFO = gql`
{
  allStarships(orderBy:length_ASC){
    name
    hyperdriveRating
    length
    crew
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

  if (loading) return <p>loading...</p>
if (error) return <p>Error... {error.message}</p>
  return (
    <React.Fragment>
      {data.allStarships.map((item)=>
      <StyledDiv>
        <StyledTitle>{item.name}</StyledTitle>
        {item.length}
        {item.crew}
      </StyledDiv>)}
    </React.Fragment>
  )
}

export default App;

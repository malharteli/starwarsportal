import React, { useState, useEffect } from 'react'
import { ascending } from 'd3-array'
import gql from 'graphql-tag'


const STARSHIPS_DATA = gql`
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




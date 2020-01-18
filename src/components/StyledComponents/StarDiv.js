import React from 'react'
import styled from 'styled-components'

const StyledDiv = styled.div`
  padding: 0.5em;
  color: ${props => props.inputColor || "yellow"};
  background: black;
  border: solid;
  border-color: yellow;
  border-radius: 3px;
`


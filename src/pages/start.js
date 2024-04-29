import React from 'react'
import StartComponent from '../components/start'
import { dummyData } from '../dummy'

function Start() {
  const question = dummyData
  return (
    <StartComponent question = {question}/>
  )
}

export default Start
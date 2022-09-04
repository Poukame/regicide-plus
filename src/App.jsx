import { useContext, useState } from 'react'
import {
  Box
} from '@chakra-ui/react'
import './App.css'
import { Context } from './OptionsContext'
import SelectOptions from './Components/SelectOptions'
import SelectCurrentEnemy from './Components/SelectCurrentEnemy'

function App() {
 
  const {options} = useContext(Context)

  return (
    <Box maxW='97%' mx='auto' p='4'>
      <SelectOptions />
      <SelectCurrentEnemy />
    </Box>
  )
}

export default App

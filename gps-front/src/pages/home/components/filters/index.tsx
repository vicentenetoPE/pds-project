import React from 'react'
import { IconButton, Input } from '@mui/material'
import { Container } from './style'
import InputAdornment from '@mui/material/InputAdornment';
import FilterAltIcon from '@mui/icons-material/FilterAlt';


export const Filters = () => {
  return (
    <Container><Input placeholder='Título do projeto' endAdornment={
        <InputAdornment position="end">
            <IconButton  aria-label="toggle password visibility" edge="end">
            <FilterAltIcon/>
        </IconButton>
      </InputAdornment>}></Input></Container>
  )
}

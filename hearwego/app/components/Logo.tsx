import React from 'react'
import Box from '@mui/material/Box'
import { useMediaQuery } from '@mui/material'

interface Props {
    img_url: string
}

const Logo = ({img_url}: Props) => {
  const matches = useMediaQuery('(min-width:960px)');

  return (
    <Box sx={{padding: 0}}>
        {matches ? img_url ? <img src={img_url} alt='logo' width={200}/>: null :
        img_url ? <img src={img_url} alt='logo' width={150}/> : null}
    </Box>
  )
}

export default Logo

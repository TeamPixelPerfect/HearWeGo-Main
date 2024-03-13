import React from 'react'
import Box from '@mui/material/Box'
import { useMediaQuery } from '@mui/material'

interface Props {
    img_url: string
}

const Logo = ({img_url}: Props) => {
  const matches = useMediaQuery('(min-width:1000px)');

  return (
    <Box sx={{padding: 0}}>
        {img_url && <img src={img_url} alt='logo' width={matches?180:120}/>}
    </Box>
  )
}

export default Logo

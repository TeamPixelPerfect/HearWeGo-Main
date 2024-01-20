import React from 'react'
import Box from '@mui/material/Box'

interface Props {
    img_url: string
}

const Logo = ({img_url}: Props) => {
  return (
    <Box sx={{padding: 0}}>
        {img_url ? <img src={img_url} alt='logo' width={200}/>: null}
    </Box>
  )
}

export default Logo

import React from 'react'

import IconButton from '@mui/material/IconButton';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {

  return (
    <AppBar sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', backgroundColor: 'transparent', boxShadow: 'none', border: 'none', marginBottom: 1 }} position="static"   >
      <Box flex={1} />
      <Link href="/privacy-policy" color="icons.dark" underline='hover'>
        <Typography variant="subtitle1">Politica de Privacidad</Typography>
      </Link>
      <Box flex={1} display={'flex'} justifyContent={'flex-end'} >
        <IconButton
          component="a"
          size="large"
          href="https://github.com/glp-92"
          target="_blank"
          rel="noopener noreferrer"
          edge="start"
          aria-label="menu"
          sx={{ fontSize: 30 }}
        >
          <GitHubIcon sx={{ color: "icons.dark", fontSize: '2rem' }} />
        </IconButton>
        {/*
          <IconButton
            component="a"
            size="large"
            href="https://www.linkedin.com/in/guillermo-lopez-pazos/"
            target="_blank"
            rel="noopener noreferrer"
            edge="start"
            aria-label="menu"
            sx={{ mr: 2, fontSize: 30 }}
          >
            <LinkedInIcon sx={{ color: "icons.dark", fontSize: '2rem' }} />
          </IconButton>
        */}
      </Box>
    </AppBar>
  )
}

export default Footer
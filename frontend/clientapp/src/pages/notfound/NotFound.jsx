import React from 'react'

import { Typography, Box } from '@mui/material';

const NotFound = () => {
    return (
        <Box sx={{ height: '40vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Typography borderRadius={1} padding={1} bgcolor='lightgray' variant="h1">NOT FOUND</Typography>
            <Typography marginTop={4} variant="caption">La pagina solicitada no existe</Typography>
        </Box>
    )
}

export default NotFound
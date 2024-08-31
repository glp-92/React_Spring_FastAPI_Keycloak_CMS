import React from 'react'
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

const Loading = ({height}) => {
  return (
    <Box>
      <Box className="loading" sx={{ position: 'fixed', width: '100%', top: 0, left: 0 }}>
        <LinearProgress sx={{'& .MuiLinearProgress-bar': {backgroundColor: 'progress.main'}, backgroundColor: 'progress.light',}}/>
      </Box>
      {height > 0 && 
        <Stack spacing={0.5}>
        <Skeleton animation="wave" variant="rounded" width={'auto'} height={200} />
        <Skeleton animation="wave" variant="rounded" width={'auto'} height={height} />
      </Stack>
      }
    </Box>
  )
}

export default Loading
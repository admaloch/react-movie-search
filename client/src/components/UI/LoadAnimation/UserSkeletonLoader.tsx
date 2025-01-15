import { Box, Skeleton, Stack } from '@mui/material'

export default function UserSkeletonLoader() {
  return (
    <Box 
    sx={{ 
      backgroundColor: 'rgb(248, 250, 252)',
      padding: 2, 
      borderRadius: 2, 
      width: '100%',
      height: '100%',
      margin: '.6rem',
      boxShadow: '0px 0px 7px 1px rgba(0,0,0,0.1)',
    }}
  >
    <Stack spacing={1} sx={{ height: '100%', width: '100%' }}>
      <Skeleton 
        variant="text" 
        sx={{ fontSize: '1rem', height: '30%',  }} 
      />

      {/* Row layout for circular skeletons */}
      {[...Array(6)].map((_, index) => (
        <Stack key={index} direction="row" justifyContent="center" alignItems="center" spacing={2} sx={{ height: 'calc(70%/6)' }}>
          <Skeleton variant="circular" width="5%" height="50%" sx={{  }} />
          <Skeleton variant="text" sx={{ fontSize: '1rem', width: '95%', height: '100%',  }} />
        </Stack>
      ))}
    </Stack>
    </Box>
  )
}

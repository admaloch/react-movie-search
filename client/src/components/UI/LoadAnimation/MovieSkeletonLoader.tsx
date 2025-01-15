import { Box, Skeleton, Stack } from '@mui/material'

export default function MovieSkeletonLoader() {
  return (
    <Box 
      sx={{ 
        backgroundColor: 'rgb(248, 250, 252)',
        padding: 2, 
        borderRadius: 2, 
        width: '100%',
        height: '100%',
        margin: 'auto',
        boxShadow: '0px 0px 7px 1px rgba(0,0,0,0.1)',
      }}
    >
      <Stack spacing={1} sx={{ height: '100%', width: '100%' }}>
        <Skeleton variant="circular" width={30} height="17%" animation="wave" />
        <Skeleton variant="rectangular" height="25%" animation="wave" />
        <Skeleton variant="text" sx={{ fontSize: '1rem', height: '15%' }} animation="wave" />
        <Skeleton variant="text" sx={{ fontSize: '1rem', height: '15%' }} animation="wave" />
        <Skeleton variant="text" sx={{ fontSize: '1rem', height: '15%' }} animation="wave" />

        {/* Row layout for circular skeletons */}
        <Stack direction="row" justifyContent="center" spacing={2} sx={{ height: '13%' }}>
          <Skeleton variant="circular" width={22} height="100%" animation="wave" />
          <Skeleton variant="circular" width={22} height="100%" animation="wave" />
        </Stack>
      </Stack>
    </Box>
  )
}

import { Box, Skeleton, Stack } from "@mui/material";

export default function MovieModalSkeletonLoader() {
  return (
    <Box sx={{ height: "100%", width: "100%" }}>
      {/* Container Stack to Manage Responsive Layout */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        alignItems="center"
        sx={{ height: "100%", width: "100%" }}
      >
        {/* Image Stack */}
        <Stack
          justifyContent="center"
          alignItems="center"
          sx={{
            width: { xs: "75%", sm: "45%" },
            height: { xs: "40%", sm: "400px" },
          }}
        >
          <Skeleton
            variant="rectangular"
            sx={{ height: "100%", width: "100%" }}
          />
        </Stack>

        {/* Content Stack */}
        <Stack
          spacing={2}
          justifyContent="center"
          alignItems="center"
          sx={{
            width: { xs: "100%", sm: "55%" },
            height: { xs: "60%", sm: "100%" },
          }}
        >
          {/* Text Items */}
          <Skeleton
            variant="text"
            sx={{
              height: { xs: "7%", sm: "100px" },
              width: "70%",
              margin: "0 auto",
            }}
          />
          <Skeleton
            variant="text"
            sx={{
              height: { xs: "4%", sm: "35px" },
              width: "40%",
              margin: "0 auto",
            }}
          />
          <Skeleton
            variant="text"
            sx={{
              height: { xs: "4%", sm: "35px" },
              width: "30%",
              margin: "0 auto",
            }}
          />
          <Skeleton
            variant="text"
            sx={{
              height: { xs: "4%", sm: "35px" },
              width: "80%",
              margin: "0 auto",
            }}
          />
          <Skeleton
            variant="text"
            sx={{
              height: { xs: "4%", sm: "35px" },
              width: "40%",
              margin: "0 auto",
            }}
          />
          <Skeleton
            variant="text"
            sx={{
              height: { xs: "4%", sm: "35px" },
              width: "10%",
              margin: "0 auto",
            }}
          />

          {/* Rectangle Item */}
          <Skeleton
            variant="rectangular"
            sx={{
              height: { xs: "15%", sm: "30%" },
              width: "75%",
              margin: "0 auto",
            }}
          />

          {/* Circular Items in Row */}
          <Stack
            direction="row"
            justifyContent="center"
            spacing={2}
            sx={{ height: "10%" }}
          >
            <Skeleton
              variant="circular"
              width={40}
              sx={{ height: { xs: "100%", sm: "40px" } }}
              animation="wave"
            />
            <Skeleton
              variant="circular"
              width={40}
              sx={{ height: { xs: "100%", sm: "40px" } }}
              animation="wave"
            />
          </Stack>
        </Stack>
      </Stack>
    </Box>

    // 50+8+4+4+4+4+4+20+10 =
  );
}

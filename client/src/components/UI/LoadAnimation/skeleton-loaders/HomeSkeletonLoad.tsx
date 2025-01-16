import { Box, Skeleton, Stack } from "@mui/material";
import "./HomeSkeletonLoad.css";

export default function HomeSkeletonLoad() {
  return (
    <Box
      sx={{
        backgroundColor: "rgb(195 195 195)",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 999,
        width: "100vw",
        height: "100vh",
      }}
    >
      <Stack
        sx={{
          backgroundColor: "rgb(248, 250, 252)",
          opacity: ".7",
          height: "var(--headerHeight)",
          width: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
        }}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Stack
          margin={2}
          spacing={2}
          direction="row"
          alignItems="center"
          sx={{
            width: {
              xs: "70%", // 70% width on extra-small screens
              md: "50%", // 50% width on medium and larger screens
            },
            height: "100%",
          }}
        >
          <Skeleton
            variant="text"
            sx={{
              fontSize: "1rem",
              marginLeft: "1rem",
              height: "70%",
              width: "50%",
            }}
          />
          <Skeleton variant="circular" width="50px" height="50px" />
        </Stack>

        <Stack
          spacing={2}
          direction="row"
          alignItems="center"
          justifyContent="flex-end"
          sx={{
            width: { xs: "30%", md: "50%" }, // 100% width on smaller screens, 50% on medium and larger screens
            height: "100%",
          }}
          display={{ xs: "flex", md: "none" }} // Display on small screens, hide on medium and up
          margin={2}
        >
          <Skeleton variant="rectangular" width="25px" height="25px" sx={{}} />
        </Stack>

        <Stack
          spacing={2}
          direction={"row"}
          alignItems={"center"}
          sx={{ width: "50%", height: "100%" }}
          display={{ xs: "none", md: "flex" }}
          margin={2}
        >
          {[...Array(4)].map((_, index) => (
            <Skeleton
              key={index}
              variant="text"
              sx={{ fontSize: "1rem", height: "50%", width: "25%" }}
            />
          ))}
        </Stack>
      </Stack>

      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "rgb(248, 250, 252)",
          width: "90%",
          maxWidth: "600px",
          height: { xs: "26%", sm: "33%", md: "40%" }, // Adjust heights for breakpoints
          padding: 2,
          borderRadius: 2,
          marginTop: { xs: "10%", sm: "6%", md: "4%" },
          opacity: 0.7,
        }}
      >
        <Skeleton
          variant="text"
          sx={{ fontSize: "1rem", height: "35%", width: "25%" }}
        />
        <Skeleton
          variant="text"
          sx={{ fontSize: "1rem", height: "15%", width: "50%" }}
        />
        <Skeleton
          variant="text"
          sx={{ fontSize: "1rem", height: "15%", width: "60%" }}
        />
        <Skeleton
          variant="text"
          sx={{ fontSize: "1rem", height: "15%", width: "35%" }}
        />

        <Skeleton variant="rectangular" sx={{ height: "20%", width: "10%" }} />
      </Stack>
    </Box>
    //35+15+
  );
}

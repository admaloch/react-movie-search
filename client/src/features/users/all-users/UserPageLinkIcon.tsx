import { Box, IconButton, Tooltip } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { tooltipClasses, TooltipProps } from "@mui/material/Tooltip";

// Custom Tooltip styled component
const CustomTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    fontSize: "1rem", // Larger font size
    backgroundColor: theme.palette.common.white, // Tooltip background color
    color: theme.palette.common.black, // Tooltip text color
    padding: "8px 16px", // Adjust padding
    marginBottom: "50px",
    borderRadius: "4px", // Optional: rounded corners
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black, // Tooltip arrow color
  },
}));

interface UserPageLinkProps {
  userId: string;
}

function UserPageLink({ userId }: UserPageLinkProps) {
  return (
    <Box sx={{ position: "absolute", bottom: 0, right: 0 }}>
      <CustomTooltip title="Visit Page" arrow placement="top">
        <Link
          to={`/profiles/${userId}`}
          style={{ textDecoration: "none", color: "var(--containerText)" }}
        >
          <IconButton
            tabIndex={-1}
            aria-label="link to user profile"
            sx={{
              color: "var(--containerText)", // Default color
              "&:hover": {
                color: "var(--text)", // Hover text color
                backgroundColor: "var(--mainBackground)", // Hover background color
              },
            }}
          >
            <ExitToAppIcon sx={{ fontSize: 40 }} />
          </IconButton>
        </Link>
      </CustomTooltip>
    </Box>
  );
}

export default UserPageLink;

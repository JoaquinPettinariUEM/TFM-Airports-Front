import { Backdrop, CircularProgress } from "@mui/material";

function BackdropLoading() {
  return (
    <Backdrop sx={theme => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })} open>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}

export default BackdropLoading;

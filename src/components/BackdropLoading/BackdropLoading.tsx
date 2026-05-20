import { Backdrop, CircularProgress, styled } from "@mui/material";

const StyledBackdrop = styled(Backdrop)(({ theme }) => ({
  color: theme.palette.text.primary,
  zIndex: theme.zIndex.drawer + 1,
}));

function BackdropLoading() {
  return (
    <StyledBackdrop open>
      <CircularProgress color="inherit" />
    </StyledBackdrop>
  );
}

export default BackdropLoading;

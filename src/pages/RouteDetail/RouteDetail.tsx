import {
  Alert,
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  styled,
} from "@mui/material";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import { useState } from "react";
import { useRouteStore } from "../../store/routeStore";
import { RouteHeader } from "../../components/RouteHeader/RouteHeader";
import { RouteTimeline } from "../../components/RouteTimeLine/RouteTimeLine";
import { useSearchParams } from "react-router-dom";
import { useCreateShareRoute } from "../../api/travelPlanApi";
import { appPalette } from "../../theme";

function RouteDetail() {
  const { selectedRoute } = useRouteStore();
  const [searchParams] = useSearchParams();
  const { mutateAsync: createShareRoute, isPending: isSharing } = useCreateShareRoute();
  const [shareLink, setShareLink] = useState("");
  const [copied, setCopied] = useState(false);
  const [openShareDialog, setOpenShareDialog] = useState(false);

  const budget = Number(searchParams.get("budget") ?? Number.NaN);
  const maxStops = Number(searchParams.get("maxStops") ?? Number.NaN);
  const normalizedBudget = Number.isFinite(budget) ? budget : undefined;
  const normalizedMaxStops = Number.isFinite(maxStops) ? maxStops : undefined;

  if (!selectedRoute) {
    return null;
  }

  const handleShare = async () => {
    const result = await createShareRoute({
      route: selectedRoute,
      budget: normalizedBudget,
      requestedMaxStops: normalizedMaxStops,
    });
    const url = `${window.location.origin}/shared/${result.shareId}`;
    setShareLink(url);
    setCopied(false);
    setOpenShareDialog(true);
  };

  const handleCopy = async () => {
    if (!shareLink) return;
    await navigator.clipboard.writeText(shareLink);
    setCopied(true);
  };

  return (
    <PageContainer>
      <Container maxWidth="xl">
        <RouteHeader
          route={selectedRoute}
          budget={normalizedBudget}
          requestedMaxStops={normalizedMaxStops}
          onShare={handleShare}
        />

        <TimelineWrapper>
          <RouteTimeline route={selectedRoute} />
        </TimelineWrapper>
      </Container>

      <Dialog
        open={openShareDialog}
        onClose={() => setOpenShareDialog(false)}
        maxWidth="sm"
        fullWidth
        slotProps={{
          paper: {
            sx: (theme) => ({
              backgroundColor: appPalette.surfaceStrong,
              backgroundImage: "none",
              border: `1px solid ${theme.palette.divider}`,
              boxShadow: appPalette.shadowStrong,
            }),
          },
        }}
      >
        <DialogTitle>Share Route</DialogTitle>
        <DialogContent>
          <TextField
            value={shareLink}
            fullWidth
            disabled
            margin="normal"
            sx={{
              "& .MuiInputBase-root.Mui-disabled": {
                WebkitTextFillColor: appPalette.textPrimary,
                color: appPalette.textPrimary,
              },
            }}
          />
          {copied && <Alert severity="success">Link copied to clipboard.</Alert>}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenShareDialog(false)}>Close</Button>
          <Button onClick={handleCopy} startIcon={<ContentCopyOutlinedIcon />} disabled={isSharing}>
            Copy link
          </Button>
        </DialogActions>
      </Dialog>
    </PageContainer>
  );
}

const PageContainer = styled(Box)(({ theme }) => ({
  background:
    "radial-gradient(circle at 10% 0%, rgba(59,130,246,0.18), transparent 28%), radial-gradient(circle at 90% 12%, rgba(139,92,246,0.2), transparent 30%), radial-gradient(circle at top, #0B1B3B 0%, #030712 45%)",
  color: theme.palette.text.primary,
  paddingBlock: 32,
}));

const TimelineWrapper = styled(Box)({
  marginTop: 40,
});

export default RouteDetail;

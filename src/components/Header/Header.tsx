import { Box, Button, ButtonGroup, Container, styled, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useI18n } from "../../i18n/i18nContext";

function Header() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { language, setLanguage, t } = useI18n();
  const isEditingRoute =
    pathname.startsWith("/searched/routes") || pathname.startsWith("/route/details");
  const isHowItWorks = pathname.startsWith("/how-it-works");
  const isCreateRoute = pathname.startsWith("/create/route");

  return (
    <HeaderComponent>
      <Container maxWidth="xl" className="tp-header-container">
        <TitleClickArea onClick={() => navigate("/")}>
          <Typography variant="h5" className="tp-header-title">
            RouteWise
          </Typography>
        </TitleClickArea>
        <HeaderActions>
          <Button
            size="small"
            variant="text"
            color={isHowItWorks ? "primary" : "inherit"}
            onClick={() => navigate("/how-it-works")}
          >
            {t("header.howItWorks")}
          </Button>
          <Button
            size="small"
            variant="text"
            color={isCreateRoute ? "primary" : "inherit"}
            onClick={() => navigate("/create/route")}
          >
            {isEditingRoute ? t("header.editRoute") : t("header.createRoute")}
          </Button>
          <ButtonGroup
            size="small"
            aria-label={t("header.language")}
            sx={{
              "& .MuiButton-root": {
                minWidth: 42,
                fontWeight: 700,
              },
            }}
          >
            <Button
              variant={language === "en" ? "contained" : "outlined"}
              onClick={() => setLanguage("en")}
            >
              EN
            </Button>
            <Button
              variant={language === "es" ? "contained" : "outlined"}
              onClick={() => setLanguage("es")}
            >
              ES
            </Button>
          </ButtonGroup>
        </HeaderActions>
      </Container>
    </HeaderComponent>
  );
}

const HeaderComponent = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "var(--tp-header-height)",
  backgroundColor: theme.palette.background.paper,
  zIndex: 100,
  ".tp-header-container": {
    display: "flex",
    height: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  ".tp-header-title": {
    color: theme.palette.text.primary,
    fontWeight: 700,
  },
}));

const HeaderActions = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: 8,
});

const TitleClickArea = styled(Box)({
  cursor: "pointer",
});

export default Header;

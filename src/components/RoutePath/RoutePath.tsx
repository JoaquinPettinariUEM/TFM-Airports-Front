import { Box } from "@mui/material";

type Props = {
  cities: string[];
};

export function RoutePath({ cities }: Readonly<Props>) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 1.5,
      }}
    >
      {cities.map((city, index) => {
        const isLast = index === cities.length - 1;

        return (
          <Box
            key={city + index}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
            }}
          >
            <Box
              sx={{
                px: 2,
                py: 1,
                borderRadius: "999px",

                background:
                  index === 0 || isLast
                    ? "linear-gradient(135deg, #7C3AED, #9333EA)"
                    : "#1F2937",

                color: "white",

                fontWeight: 700,
                fontSize: 14,

                boxShadow:
                  index === 0 || isLast ? "0 0 20px rgba(124,58,237,.35)" : "none",
              }}
            >
              {city}
            </Box>

            {!isLast && (
              <Box
                sx={{
                  width: 40,
                  height: 2,
                  background: "linear-gradient(90deg, #7C3AED, rgba(124,58,237,0.2))",
                  borderRadius: 999,
                }}
              />
            )}
          </Box>
        );
      })}
    </Box>
  );
}

import FlightIcon from "@mui/icons-material/Flight";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import { motion } from "framer-motion";

const Wrapper = styled(Box)`
  width: 100%;
  max-width: 900px;

  margin-top: 80px;

  position: relative;
`;

const Svg = styled("svg")`
  width: 100%;
  height: 220px;

  overflow: visible;
`;

const PlaneWrapper = styled(motion.div)`
  position: absolute;

  top: 0;
  left: 0;

  color: white;

  font-size: 28px;
`;

export function FlightCurve({ from, to }: Readonly<{ from: string; to: string }>) {
  return (
    <Wrapper>
      <Svg viewBox="0 0 1000 220" preserveAspectRatio="xMidYMid meet">
        <path
          id="flight-path"
          d="
            M50 180
            Q250 25 450 100
            T950 90
          "
          stroke="rgba(255,255,255,.25)"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="10 10"
        />
        <text fontSize="18" fill="white">
          <textPath href="#flight-path" startOffset="0%">
            {from}
          </textPath>
        </text>
        <text fontSize="18" fill="white">
          <textPath href="#flight-path" startOffset="95%">
            {to}
          </textPath>
        </text>
      </Svg>

      <PlaneWrapper
        animate={{
          offsetDistance: ["0%", "89%"],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          offsetPath: 'path("M50 180 Q250 20 500 100 T950 45")',
        }}
      >
        <RotatedFlightIcon fontSize="inherit" />
      </PlaneWrapper>
    </Wrapper>
  );
}

const RotatedFlightIcon = styled(FlightIcon)({
  rotate: "90deg",
});

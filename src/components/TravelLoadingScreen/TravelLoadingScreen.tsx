import { keyframes, styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import { RotatingMessages } from "./RotatingMessages";
import { FlightCurve } from "./FlightCurve";

const backgroundMove = keyframes`
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
`;

const Root = styled(Box)`
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background: linear-gradient(-45deg, #081120, #0d1b2a, #112240, #0b1628);

  background-size: 400% 400%;

  animation: ${backgroundMove} 18s ease infinite;
`;

export function TravelLoadingScreen({
  from,
  to,
}: Readonly<{ from: string; to: string }>) {
  return (
    <Root>
      <RotatingMessages />
      <FlightCurve from={from} to={to} />
    </Root>
  );
}

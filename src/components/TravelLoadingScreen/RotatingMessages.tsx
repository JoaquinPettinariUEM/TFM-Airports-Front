import { AnimatePresence, motion } from "framer-motion";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";

const messages = [
  "We are building your ideal trip",
  "Analyzing smart connections",
  "Searching for the best cities for you",
  "Calculating stays and stopovers",
  "Optimizing budget and timing",
];

const Wrapper = styled(Box)`
  position: relative;

  height: 48px;
  width: 100%;
  overflow: hidden;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const AnimatedText = styled(motion.p)`
  position: absolute;

  color: white;

  font-size: 3rem;
  font-weight: 700;

  text-align: center;
`;

export function RotatingMessages() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Wrapper>
      <AnimatePresence mode="wait">
        <AnimatedText
          key={messages[index]}
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            y: -30,
          }}
          transition={{
            duration: 0.6,
          }}
        >
          {messages[index]}
        </AnimatedText>
      </AnimatePresence>
    </Wrapper>
  );
}

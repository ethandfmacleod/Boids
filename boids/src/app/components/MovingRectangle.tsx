import React, { useEffect, useRef, useState } from "react";
import { Rect } from "react-konva";

interface MovingRectangleProps {
  xStart: number;
  yStart: number;
}

const MovingRectangle: React.FC<MovingRectangleProps> = ({xStart, yStart}) => {
  const rectangleRef = useRef<any>(); // Specify the type of the ref

  const [xPos, setXPos] = useState(xStart);

  useEffect(() => {
    const animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [xPos]);

  const animate = () => {
    setXPos((prevX) => prevX + 1);
    requestAnimationFrame(animate);
  };

  return (
    <Rect
      x={xPos}
      y={yStart}
      width={50}
      height={50}
      fill="blue"
      ref={rectangleRef} // Use the useRef with the correct type
    />
  );
};

export default MovingRectangle;

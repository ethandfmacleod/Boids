import React, { useEffect, useRef, useState } from "react";
import { Arrow, Rect, Wedge } from "react-konva";

interface BoidProps {
  xStart: number;
  yStart: number;
}

const Boid: React.FC<BoidProps> = ({xStart, yStart}) => {
  const rectangleRef = useRef<any>(); // Specify the type of the ref

  // Position of Boid
  const [position, setPosition] = useState({
    x: xStart,
    y: yStart
  });

  // Velocity of Boid
  const [vector, setVector] = useState({
    dx: -1,
    dy: -1,
  });

  // Orientation of Boid
  const [orientation, setOrientation] = useState(0);

  useEffect(() => {
    const animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [position.x]);

  const animate = () => {

    // Set vector

    // Set position
    setPosition((prevPosition) => ({
      ...prevPosition, 
      x: prevPosition.x + vector.dx,
      y: prevPosition.y + vector.dy
    }))

    // Set Orientation
    const angleInRadians = Math.atan2(vector.dy, vector.dx)
    const angleInDegrees = (angleInRadians * 180) / Math.PI;
    setOrientation(angleInDegrees);

    requestAnimationFrame(animate);
  };

  return (
    <Arrow
      points={[0, 0, 0, 0]}
      x={position.x}
      y={position.y}
      width={50}
      height={50}
      fill="blue"
      angle={60}
      radius={60}  
      rotation={orientation}
      ref={rectangleRef} // Use the useRef with the correct type
    />
  );
};

export default Boid;

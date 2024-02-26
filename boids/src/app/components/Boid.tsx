// Boid.tsx
import React, { useEffect, useRef, useState } from "react";
import { Arrow } from "react-konva";

interface BoidProps {
  xStart: number;
  yStart: number;
  registerObject: (updateFunction: () => void) => void;
  initialVelocity: {dx: number, dy: number}
}

interface Vector {
  dx: number;
  dy: number;
}

const Boid: React.FC<BoidProps> = ({ xStart, yStart, registerObject, initialVelocity}) => {
  const arrowRef = useRef<any>();

  // Position of Boid
  const [position, setPosition] = useState({
    x: xStart,
    y: yStart,
  });

  // Boid vector
  const [vector, setVector] = useState<Vector>({
    dx: initialVelocity.dx,
    dy: initialVelocity.dy,
  });

  // Boid orientation
  const [orientation, setOrientation] = useState(0);

  const animate = () => {
    requestAnimationFrame(animate);
  };

  useEffect(() => {
    const animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [position, vector, orientation]);

  const rule1 = (): Vector => {
    // Implement rule1 logic to align with nearby boids
    // Update the vector accordingly
    return { dx: 0, dy: 0 };
  };

  const rule2 = (): Vector => {
    // Implement rule2 logic to avoid collisions with nearby boids
    // Update the vector accordingly
    return { dx: 0, dy: 0 };
  };

  const rule3 = (): Vector => {
    // Implement rule3 logic to move towards the center of nearby boids
    // Update the vector accordingly
    return { dx: 0, dy: 0 };
  };

  const moveBoid = () => {
    const v1 = rule1();
    const v2 = rule2();
    const v3 = rule3();

    // Update the velocity vector based on the rules
    setVector((prevVector) => ({
      dx: prevVector.dx + v1.dx + v2.dx + v3.dx,
      dy: prevVector.dy + v1.dy + v2.dy + v3.dy,
    }));

    // Update the position based on the velocity vector
    setPosition((prevPosition) => ({
      x: prevPosition.x + vector.dx,
      y: prevPosition.y + vector.dy,
    }));

    // Update the orientation
    const angleInRadians = Math.atan2(vector.dy, vector.dx);
    const angleInDegrees = (angleInRadians * 180) / Math.PI;
    setOrientation(angleInDegrees);
  };

  useEffect(() => {
    // Register the moveBoid function in the AnimationManager
    registerObject(moveBoid);
  }, [registerObject]);

  return (
    <Arrow
      points={[0, 0, 0, 0]}
      x={position.x}
      y={position.y}
      width={50}
      height={50}
      fill="blue"
      radius={10}
      rotation={orientation}
      ref={arrowRef}
    />
  );
};

export default Boid;

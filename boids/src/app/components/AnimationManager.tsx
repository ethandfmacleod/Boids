// AnimationManager.tsx
import React, { useEffect, useRef, ReactNode } from "react";

interface AnimationManagerProps {
  children: (registerObject: (updateFunction: () => void) => void) => ReactNode;
}

const AnimationManager: React.FC<AnimationManagerProps> = ({ children }) => {
  const objectsToUpdate = useRef<(() => void)[]>([]);
  const animationFrameId = useRef<number>();

  const registerObject = (updateFunction: () => void) => {
    objectsToUpdate.current.push(updateFunction);
  };

  const animate = () => {
    objectsToUpdate.current.forEach((updateFunction) => {
      updateFunction();
    });

    animationFrameId.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    animate();
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return <>{children(registerObject)}</>;
};

export default AnimationManager;

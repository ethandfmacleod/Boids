// Home.tsx
"use client";
import React, {useState} from "react";
import { Layer, Stage } from "react-konva";
import Boid from "./components/Boid";
import AnimationManager from "./components/AnimationManager";

export default function Home() {
  const WINDOW_WIDTH = window.innerWidth;
  const WINDOW_HEIGHT = window.innerHeight;

  const initialBoids = [
    { xStart: 500, yStart: 0 },
    { xStart: 500, yStart: 100 },
    { xStart: 500, yStart: 200 },
    { xStart: 500, yStart: 350 },
    // Add more initial boid configurations as needed
  ];

  const [boids, setBoids] = useState(initialBoids);

  function getRandomXPos(){
    return Math.floor(Math.random() * WINDOW_WIDTH);
  }

  function getRandomYPos(){
    return Math.floor(Math.random() * WINDOW_HEIGHT);
  }

  function getRandomVelocity(){
    const randomValue = Math.random();
    const velocity = randomValue * 4 - 2;
    return velocity;
  }
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Stage
        width={WINDOW_WIDTH}
        height={WINDOW_HEIGHT}
        className="bg-white"
      >
        <Layer>
          <AnimationManager>
            {(registerObject) => (
              <>
                {boids.map((boid, index) =>(
                  <Boid
                    key={index}
                    xStart={getRandomXPos()}
                    yStart={getRandomYPos()}
                    registerObject={registerObject}
                    initialVelocity={{dx: getRandomVelocity(), dy: getRandomVelocity()}}
                  />
                ))}
              </>
            )}
          </AnimationManager>
        </Layer>
      </Stage>
    </main>
  );
}

"use client";
import { KonvaEventObject } from "konva/lib/Node";
import { useState } from "react";
import { Layer, Rect, Stage } from "react-konva";
import Boid from "./components/Boid";
import AnimationManager from "./components/AnimationManager";

type TDArray = {
  x: number;
  y: number;
};

export default function Home() {
  const [coords, setcoords] = useState<TDArray>({
    x: 10,
    y: 10,
  });

  const handleCoordsChange = (e: KonvaEventObject<MouseEvent>) => {
    setcoords({
      x: e.target.x(),
      y: e.target.y(),
    });
  };

  console.log(coords);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Stage
        onDragEnd={handleCoordsChange}
        width={window.innerWidth}
        height={window.innerHeight}
        className="bg-white"
      >
        <Layer>
          <AnimationManager>
            <Boid xStart={500} yStart={0} />
            <Boid xStart={500} yStart={100} />
            <Boid xStart={500} yStart={200} />
            <Boid xStart={500} yStart={350} />
          </AnimationManager>
        </Layer>
      </Stage>
    </main>
  );
}

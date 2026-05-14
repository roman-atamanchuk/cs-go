export type VectorInputs = {
  vectorA: number;
  angleA: number;
  vectorB: number;
  angleB: number;
};

function toRadians(value: number) {
  return (value * Math.PI) / 180;
}

export function calculateVectorState({ vectorA, angleA, vectorB, angleB }: VectorInputs) {
  const ax = vectorA * Math.cos(toRadians(angleA));
  const ay = vectorA * Math.sin(toRadians(angleA));
  const bx = vectorB * Math.cos(toRadians(angleB));
  const by = vectorB * Math.sin(toRadians(angleB));

  const rx = ax + bx;
  const ry = ay + by;
  const magnitude = Math.sqrt(rx * rx + ry * ry);
  const direction = ((Math.atan2(ry, rx) * 180) / Math.PI + 360) % 360;
  const dotProduct = ax * bx + ay * by;
  const plotRange = Math.max(
    8,
    Math.ceil(Math.max(Math.abs(ax), Math.abs(ay), Math.abs(bx), Math.abs(by), Math.abs(rx), Math.abs(ry))) + 1,
  );

  return {
    ax,
    ay,
    bx,
    by,
    rx,
    ry,
    magnitude,
    direction,
    dotProduct,
    plotRange,
  };
}

function factorial(value: number): number {
  if (value <= 1) {
    return 1;
  }

  let result = 1;
  for (let i = 2; i <= value; i += 1) {
    result *= i;
  }
  return result;
}

function combination(n: number, k: number): number {
  return factorial(n) / (factorial(k) * factorial(n - k));
}

export function calculateBinomialDistribution(trials: number, successProbability: number) {
  const values = Array.from({ length: trials + 1 }, (_, successes) => {
    const probability =
      combination(trials, successes) *
      successProbability ** successes *
      (1 - successProbability) ** (trials - successes);

    return {
      successes,
      probability,
    };
  });

  const expectedValue = trials * successProbability;
  const variance = trials * successProbability * (1 - successProbability);
  const mostLikely = values.reduce((best, current) =>
    current.probability > best.probability ? current : best,
  );

  return {
    values,
    expectedValue,
    variance,
    mostLikely,
  };
}

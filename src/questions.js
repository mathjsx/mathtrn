function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateFraction() {
  const numerators = [1, 2, 3];
  const denominators = [2, 5, 9];
  const a = getRandomElement(numerators);
  const b = getRandomElement(denominators);
  return { a, b };
}

function fractionToString({ a, b }) {
  return `${a}/${b}`;
}

function simplifyFraction(numerator, denominator) {
  const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
  const commonDivisor = gcd(numerator, denominator);
  return `${numerator / commonDivisor}/${denominator / commonDivisor}`;
}

function generateQuestions() {
  const operations = ['+','-' ,'/','*', '*3'];
  const questions = [];

  for (let i = 0; i < 5; i++) {
    const frac1 = generateFraction();
    const frac2 = generateFraction();
    const frac3 = generateFraction();
    const operation = getRandomElement(operations);

    let correctAnswer;
    if (operation === '+') {
      const numerator = frac1.a * frac2.b + frac2.a * frac1.b;
      const denominator = frac1.b * frac2.b;
      correctAnswer = simplifyFraction(numerator, denominator);
    } else if (operation === '*') {
      const numerator = frac1.a * frac2.a;
      const denominator = frac1.b * frac2.b;
      correctAnswer = simplifyFraction(numerator, denominator);
    }else if (operation === '/') {
      const numerator = frac1.a * frac2.b;
      const denominator = frac1.b * frac2.a;
      correctAnswer = simplifyFraction(numerator, denominator);
    }else {
      const numerator = frac1.a * frac2.a * frac3.a;
      const denominator = frac1.b * frac2.b * frac3.b;
      correctAnswer = simplifyFraction(numerator, denominator);
    }

    const options = new Set([correctAnswer]);
    while (options.size < 4) {
      const randomFrac = generateFraction();
      const randomOption = simplifyFraction(randomFrac.a, randomFrac.b);
      options.add(randomOption);
    }

    questions.push({
      index: i,
      question: operation === '*3'
        ? `Hitunglah dengan teliti ${fractionToString(frac1)} * ${fractionToString(frac2)}  -${fractionToString(frac3)}`
        : `Hitunglah dengan teliti (${fractionToString(frac1)}) ${operation} (${fractionToString(frac2)})`,
      options: Array.from(options).sort(() => Math.random() - 0.5),
      correctAnswer,
    });
  }

  return questions;
}

export default generateQuestions;



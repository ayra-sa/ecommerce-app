import { useState, useEffect } from "react";

const useRandomNumbers = (min: number, max: number, n: number): number[] => {
  const [randomNumbers, setRandomNumbers] = useState<number[]>([]);

  useEffect(() => {
    const getRandomNumbers = (): number[] => {
      let result: number[] = [];

      while (result.length < n) {
        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

        if (!result.includes(randomNumber)) {
          result.push(randomNumber);
        }
      }

      return result;
    };

    const numbers = getRandomNumbers();
    setRandomNumbers(numbers);
  }, [min, max, n]);

  return randomNumbers;
};

export default useRandomNumbers;

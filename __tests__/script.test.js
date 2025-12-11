const {
  generatePassword,
  getRandomLower,
  getRandomUpper,
  getRandomNumber,
  getRandomSymbol,
} = require("../script");

describe("generatePassword", () => {
  const originalRandom = Math.random;

  afterEach(() => {
    Math.random = originalRandom;
  });

  test("returns empty string and reports error when no character types selected", () => {
    const onError = jest.fn();
    const result = generatePassword(false, false, false, false, 10, onError);

    expect(result).toBe("");
    expect(onError).toHaveBeenCalledWith("Select at least one character type.");
  });

  test("generates a password including all enabled character types", () => {
    const mockValues = [0, 0, 0, 0];
    Math.random = jest.fn().mockImplementation(() => mockValues.shift() ?? 0);

    const result = generatePassword(true, true, true, true, 4);

    expect(result).toBe("aA0!");
  });

  test("cycles through enabled generators and honors requested length", () => {
    const mockValues = [0, 0.5, 0.2, 0.1, 0.9];
    Math.random = jest.fn().mockImplementation(() => mockValues.shift() ?? 0);

    const result = generatePassword(true, false, true, false, 5);

    expect(result).toBe("a5f1x");
    expect(result).toHaveLength(5);
  });
});

describe("individual random generators", () => {
  test("produce a single character", () => {
    expect(getRandomLower()).toHaveLength(1);
    expect(getRandomUpper()).toHaveLength(1);
    expect(getRandomNumber()).toHaveLength(1);
    expect(getRandomSymbol()).toHaveLength(1);
  });
});

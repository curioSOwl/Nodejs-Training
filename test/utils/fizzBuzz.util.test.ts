import { mock } from "node:test";
import { FizzBuzz } from "./fizzBuss";

describe("fizzBuzz test", () => {
  const fizzBuzz = new FizzBuzz();
  it('should return "fizz" for numbers divisible by 3', () => {
    expect(fizzBuzz.fizzBuzz(15)).toBe("FizzBuzz");
    expect(fizzBuzz.fizzBuzz(3)).toBe("Fizz");
    expect(fizzBuzz.fizzBuzz(5)).toBe("Buzz");
  });

  it("should retrn the number itself if not 3 or 5", () => {
    expect(fizzBuzz.fizzBuzz(1)).toBe(1);
    expect(fizzBuzz.fizzBuzz(2)).toBe(2);
  });

  it("using mocks", () => {
    let mockFn = jest.fn(fizzBuzz.divisibleByThree).mockReturnValue(true);
    fizzBuzz.divisibleByThree = mockFn;
    expect(fizzBuzz.fizzBuzz(4)).toBe(4);
    expect(mockFn).toHaveBeenCalledTimes(2);
  });

  it.only("use spy", () => {
    const spy = jest.spyOn(fizzBuzz, "divisibleByThree");
    expect(fizzBuzz.fizzBuzz(4)).toBe(4);
    spy.mockRestore();
  });
});

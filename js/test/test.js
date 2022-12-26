
import findMax from "../findMax";

describe("the findMax function", () => {
    it("should return the correct maximum", () => {
      expect(findMax([1, 3, 2])).toBe(3)
      expect(findMax([-1, -2, -3])).toBe(-1);
    });
  });
  


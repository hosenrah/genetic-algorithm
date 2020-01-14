module.exports = {
  transform: {
    "^.+\\.(t|j)sx?$": "ts-jest"
  },
  testEnvironment: "jsdom",
  testRegex: "/tests/.*\\.(test|spec)?\\.(ts|tsx|js)$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"]
};

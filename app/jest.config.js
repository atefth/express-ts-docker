module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    coveragePathIgnorePatterns: [
        "./node_modules/",
        "./dist/"
    ],
    moduleNameMapper: {
        "@exmpl/(.*)": "<rootDir>/src/$1"
    },
};
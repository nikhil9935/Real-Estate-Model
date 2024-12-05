import App from "../app";

describe('App', () => {
  test('should run the server without errors', () => {
    const server = new App();
    const runFunction = () => server.run();
    expect(runFunction).not.toThrow();
  });
});


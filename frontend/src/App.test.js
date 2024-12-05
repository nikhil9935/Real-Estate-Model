import { render } from '@testing-library/react';
import App from './App';
import Routers from './routes/Router';
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => { },
    removeListener: () => { },
    addEventListener: () => { },
    removeEventListener: () => { },
    dispatchEvent: () => { },
  })
});
test('renders learn react link', () => {
  render(<App />);
  render(<Routers />)
});

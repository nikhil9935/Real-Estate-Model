import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Routers from '../routes/Router';

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
test('renders SignUp page when path is /', () => {
  render(<Routers />);
  expect(screen.getByText(/Sign Up/i)).toBeInTheDocument();
});
test('renders Login page when path is /login', () => {
  render(<Routers />);
  expect(screen.getByText(/Login/i)).toBeInTheDocument();
});


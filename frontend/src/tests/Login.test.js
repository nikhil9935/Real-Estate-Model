import React from 'react';
import { MemoryRouter, useNavigate,BrowserRouter } from 'react-router-dom';
import Login from '../modules/users/Login/Login';
import axios from 'axios'
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

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
jest.mock("axios");
const navigate = jest.fn();
describe('NotFoundPage', () => {
  const login = true;
  const setLogin = jest.fn();
  test('renders content', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByText("New User")).toBeInTheDocument();
    expect(screen.getByText("Username")).toBeInTheDocument();
    expect(screen.getByText("Password")).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign Up' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });
  it('should allow user to navigate to sign up page', () => {
    const mockNavigate = jest.fn();
    navigate.mockReturnValue(mockNavigate);
    render(<MemoryRouter><Login /></MemoryRouter>);
    const signUpButton = screen.getByRole('button', { name: 'Sign Up' });

    fireEvent.click(signUpButton);
  });
  it("Testing Login Page displays error message on unsuccessful login", async () => {
    const errorMessage = "Invalid credentials";
    axios.post.mockRejectedValueOnce({
      response: { data: { message: errorMessage } },
    });
    render(
      <BrowserRouter>
      <Login/>
      </BrowserRouter>
    );
    const emailInput = screen.getByLabelText("Username");
    const passwordInput = screen.getByLabelText("Password");
    const loginButton = screen.getByText("Submit");
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(loginButton);
  });
});

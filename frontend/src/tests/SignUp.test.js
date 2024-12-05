import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';
import SignUp from '../modules/users/SignUp/SignUp';
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => {},
    })
  });
jest.mock('axios');
describe('SignUp', () => {
  test('submits the form successfully', async () => {
    axios.post.mockResolvedValueOnce({ status: 200 });
    render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>
    );
    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'Test123!@#' } });
    fireEvent.change(screen.getByPlaceholderText('Phone'), { target: { value: '1234567890' } });
    fireEvent.click(screen.getByText('Submit'));
    await waitFor(() => expect(axios.post).toHaveBeenCalled());
    expect(screen.getByText('Registration successful!')).toBeInTheDocument();
  });
  test('renders content', () => {
        render(<BrowserRouter><SignUp/></BrowserRouter>);
        expect(screen.getByText("Sign Up")).toBeInTheDocument();
        expect(screen.getByText("Already have an account?")).toBeInTheDocument();
        expect(screen.getByText("Username")).toBeInTheDocument();
        expect(screen.getByText("Email")).toBeInTheDocument();
        expect(screen.getByText("Password")).toBeInTheDocument();
        expect(screen.getByText("Phone")).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
      });
      test('should allow user to navigate to sign up page', () => {
        const mockNavigate = jest.fn();
        navigate.mockReturnValue(mockNavigate);
        render(<MemoryRouter><SignUp /></MemoryRouter>);
        const loginButton = screen.getByRole('button', { name: 'Login' });
        fireEvent.click(loginButton);
      });
      test("Testing Login Page displays error message on unsuccessful register", async () => {
        const errorMessage = "Registration failed. Please try again";
        axios.post.mockRejectedValueOnce({
          response: { data: { message: errorMessage } },
        });
        render(
          <BrowserRouter>
          <SignUp/>
          </BrowserRouter>
        );
        const usernameInput = screen.getByLabelText("Username");
        const passwordInput = screen.getByLabelText("Password");
        const emailInput = screen.getByLabelText("Email");
        const signupButton = screen.getByText("Submit");
        fireEvent.change(emailInput, { target: { value: "testexample@gmail.com" } });
        fireEvent.change(passwordInput, { target: { value: "password@123" } });
        fireEvent.change(usernameInput, { target: { value: "ss" } });
        fireEvent.click(signupButton);
        await waitFor(()=>{
          expect(window.location.pathname.toBe('/'))
        })
      });
});

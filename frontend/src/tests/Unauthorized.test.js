import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import UnauthorizedPage from '../pages/Unauthorized';

describe('UnauthorizedPage', () => {
  test('renders unauthorized page and handles sign-in button click', () => {
    render(
      <MemoryRouter>
        <UnauthorizedPage />
      </MemoryRouter>
    );
    expect(screen.getByText('403')).toBeInTheDocument();
    expect(screen.getByText('Sorry, you are not authorized to access this page.')).toBeInTheDocument();
    expect(screen.getByText('Sign In Again')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Sign In Again'));
    expect(window.location.pathname).toBe('/');
  });
});

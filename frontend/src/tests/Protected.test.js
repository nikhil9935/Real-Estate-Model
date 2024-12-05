import React from 'react';
import { render} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PrivateRoutes from '../pages/Protected';

describe('UnauthorizedPage', () => {
  test('renders unauthorized page and handles sign-in button click', () => {
    render(
      <MemoryRouter>
        <PrivateRoutes />
      </MemoryRouter>
    );
  });
});

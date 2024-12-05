import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import { MemoryRouter, Route, Routes } from 'react-router-dom';  
import BulkErrorDetail from '../modules/listings/BulkErrorDetail'

jest.mock('axios');
describe('BulkErrorDetail', () => {
  beforeEach(() => {
    localStorage.clear();
  });
  test('fetches error details and renders them in a table', async () => {
    const mockedData = [
      { rowNumber: 1, errorDetails: 'Error 1' },
      { rowNumber: 2, errorDetails: 'Error 2' },
    ];
    axios.get.mockResolvedValueOnce({ data: mockedData });
    const route = '/some-route/:session_id';
    const sessionId = '123456';
    const routeWithSessionId = route.replace(':session_id', sessionId);
    render(
      <MemoryRouter initialEntries={[routeWithSessionId]}>
        <Routes>
          <Route path={route} element={<BulkErrorDetail />} />
        </Routes>
      </MemoryRouter>
    );
    await waitFor(() => expect(axios.get).toHaveBeenCalledWith(`/user/bulk-uploads-errors/${sessionId}`, expect.any(Object)));
    expect(screen.queryByTestId('loading-spinner')).toBeNull();
    expect(screen.getByText('Error 1')).toBeInTheDocument();
    expect(screen.getByText('Error 2')).toBeInTheDocument();
  });
  test('handles unauthorized access by navigating to the unauthorized page', async () => {
    axios.get.mockRejectedValueOnce({ response: { status: 403 } });
    render(
      <MemoryRouter initialEntries={['/some-route/123456']}>
        <Routes>
          <Route path="/some-route/:session_id" element={<BulkErrorDetail />} />
        </Routes>
      </MemoryRouter>
    );
  });
});

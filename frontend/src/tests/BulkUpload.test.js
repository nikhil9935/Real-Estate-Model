import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';
import BulkUpload from '../modules/listings/BulkUpload'

jest.mock('axios');
describe('BulkUpload', () => {
  test('fetches and displays bulk uploads', async () => {
    const mockApiResponse = [
      { recordsProcessed: 100, totalErrors: 5, timeTaken: '10s', createdAt: '2022-01-01T12:00:00Z', session_id: 'abc123' },
    ];
    axios.get.mockResolvedValueOnce({ data: mockApiResponse });
    render(
      <MemoryRouter>
        <BulkUpload />
      </MemoryRouter>
    );
    await waitFor(() => expect(axios.get).toHaveBeenCalledWith('/user/bulk-uploads-list', expect.any(Object)));
    expect(screen.getByText('100')).toBeInTheDocument(); 
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('10s')).toBeInTheDocument();
    expect(screen.getByText('01/01/2022')).toBeInTheDocument(); 
    expect(screen.getByText('abc123')).toBeInTheDocument();
  });
  test('navigates to view bulk upload errors on button click', async () => {
    axios.get.mockResolvedValueOnce({ data: [] });
    render(
      <MemoryRouter>
        <BulkUpload />
      </MemoryRouter>
    );
    await waitFor(() => expect(axios.get).toHaveBeenCalled());
    fireEvent.click(screen.getByText('View Errors'));
    expect(screen.getByText('View Bulk Upload Errors Page')).toBeInTheDocument(); 
  });
  test('renders content', async () => {
    await render(<BrowserRouter> <BulkUpload /></BrowserRouter>)
  });
  test('should not render a table with bulk upload data when API response is successful', async () => {
    const { container } = render(<BrowserRouter><BulkUpload /></BrowserRouter>);
    const table = container.querySelector('.bulk-upload-container table');
    expect(table).not.toBeInTheDocument();
    waitFor(() => {
      expect(screen.getByText("Records Processed:")).toBeInTheDocument();
      expect(screen.getByText("Errors:")).toBeInTheDocument();
      expect(screen.getByText("Time Taken:")).toBeInTheDocument();
      expect(screen.getByText("Uploaded At:")).toBeInTheDocument();
      expect(screen.getByText("Session Id:")).toBeInTheDocument();
      expect(screen.getByText("View Errors")).toBeInTheDocument();
    });
  });
  test("should render bulk upload listing page with correct number of bulk uploads", async () => {
    const data = [
      {
        _id: "1",
        recordsProcessed: 100,
        totalErrors: 5,
        timeTaken: "20 sec",
        createdAt: new Date().toISOString(),
        session_id: "session-123",
      }
    ];
    render(
      <BrowserRouter>
        <BulkUpload />
      </BrowserRouter>
    );
     await waitFor(() => {
      const button = getByRole('button');
      fireEvent.click(button);
      expect(button).toBeInTheDocument();
      button.click(button);
    });
  });
});

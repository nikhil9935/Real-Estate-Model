import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';
import UploadFile from '../modules/listings/UploadFile';

jest.mock('axios');
describe('UploadFile', () => {
  test('uploads a file successfully', async () => {
    axios.post.mockResolvedValueOnce({ status: 200 });
    render(
      <MemoryRouter>
        <UploadFile />
      </MemoryRouter>
    );
    const file = new File([''], 'test-file.csv', { type: 'text/csv' });
    fireEvent.change(screen.getByText('Select File').closest('input'), { target: { files: [file] } });
    fireEvent.click(screen.getByText('Upload'));
    await waitFor(() => expect(axios.post).toHaveBeenCalled());
    expect(screen.getByText('File uploaded successfully.')).toBeInTheDocument();
  });
  test('handles file selection error', async () => {
    render(
      <MemoryRouter>
        <UploadFile />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByText('Upload'));
    expect(screen.getByText('Please select a file before uploading.')).toBeInTheDocument();
  });
  test('handles file upload error', async () => {
    axios.post.mockRejectedValueOnce({ response: { status: 500 } });
    render(
      <MemoryRouter>
        <UploadFile />
      </MemoryRouter>
    );
    const file = new File([''], 'test-file.csv', { type: 'text/csv' });
    fireEvent.change(screen.getByText('Select File').closest('input'), { target: { files: [file] } });
    fireEvent.click(screen.getByText('Upload'));
    await waitFor(() => expect(axios.post).toHaveBeenCalled());
    expect(screen.getByText('Error uploading file.')).toBeInTheDocument();
  });
  test('renders content', () => {
    render(
      <BrowserRouter>
        <UploadFile />
      </BrowserRouter>
    );
    expect(screen.getByText('Upload CSV File')).toBeInTheDocument();
  });
  test("should render upload file component", async () => {
    render(
      <BrowserRouter>
        <UploadFile />
      </BrowserRouter>
    );
    const uploadButton = screen.getByRole("button", { name: "Upload" });
    fireEvent.click(uploadButton);
  });
});

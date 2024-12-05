import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';
import RealEstateForm from '../modules/listings/Create'

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
jest.mock('axios');
describe('RealEstateForm', () => {
  test('submits form data successfully', async () => {
    axios.post.mockResolvedValueOnce({ ok: true });
    render(
      <MemoryRouter>
        <RealEstateForm />
      </MemoryRouter>
    );
    fireEvent.change(screen.getByLabelText('Title'), { target: { value: 'Sample Title' } });
    fireEvent.change(screen.getByLabelText('Description'), { target: { value: 'Sample Description' } });
    fireEvent.change(screen.getByLabelText('Address'), { target: { value: 'Sample Address' } });
    fireEvent.change(screen.getByLabelText('Price'), { target: { value: '100000' } });
    fireEvent.change(screen.getByLabelText('Image'), { target: { files: [new File([''], 'test-image.png')] } });
    fireEvent.change(screen.getByLabelText('Bedrooms'), { target: { value: 3 } });
    fireEvent.change(screen.getByLabelText('Bathrooms'), { target: { value: 2 } });
    fireEvent.change(screen.getByLabelText('areaSquareFeet'), { target: { value: '100000' } });
    fireEvent.change(screen.getByLabelText('isFurnished'), { target: { value: '1' } });
    fireEvent.change(screen.getByLabelText('hasGarage'), { target: { value: '1' } });
    fireEvent.change(screen.getByLabelText('isPetsAllowed'), { target: { value: '1' } });
    fireEvent.change(screen.getByLabelText('hasSwimmingPool'), { target: { value: '1' } });
    fireEvent.change(screen.getByLabelText('isSecurityEnabled'), { target: { value: '1' } });
    fireEvent.change(screen.getByLabelText('isGatedCommunity'), { target: { value: '1' } });
    fireEvent.change(screen.getByLabelText('hasGarden'), { target: { value: '1' } });
    fireEvent.change(screen.getByLabelText('Construction Year'), { target: { value: '2000' } });
    fireEvent.change(screen.getByLabelText('Energy Efficiency Rating'), { target: { value: 'A' } });
    fireEvent.change(screen.getByLabelText('isGatedCommunity'), { target: { value: '1' } });
    fireEvent.change(screen.getByLabelText('agent name'), { target: { value: 'Nikhil' } });
    fireEvent.change(screen.getByLabelText('agent email'), { target: { value: 'n@gmail.com' } });
    fireEvent.change(screen.getByLabelText('agent number'), { target: { value: '2456234894' } });
    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));
    fireEvent.click(screen.getByText('Submit'));
    await waitFor(() => expect(axios.post).toHaveBeenCalled());
    expect(screen.getByText('View Property Page')).toBeInTheDocument();
  });
  test('handles form submission error', async () => {
    axios.post.mockRejectedValueOnce({ response: { status: 500 } });
    render(
      <MemoryRouter>
        <RealEstateForm />
      </MemoryRouter>
    );
    fireEvent.change(screen.getByLabelText('Title'), { target: { value: 'Sample Title' } });
    fireEvent.change(screen.getByLabelText('Description'), { target: { value: 'Sample Description' } });
    fireEvent.change(screen.getByLabelText('Address'), { target: { value: 'Sample Address' } });
    fireEvent.change(screen.getByLabelText('Price'), { target: { value: '100000' } });
    fireEvent.change(screen.getByLabelText('Image'), { target: { files: [new File([''], 'test-image.png')] } });
    fireEvent.change(screen.getByLabelText('Bedrooms'), { target: { value: 3 } });
    fireEvent.change(screen.getByLabelText('Bathrooms'), { target: { value: 2 } });
    fireEvent.click(screen.getByText('Submit'));
    await waitFor(() => expect(axios.post).toHaveBeenCalled());
    expect(screen.getByText('Unauthorized')).toBeInTheDocument();
  });
  test('renders form with default values', () => {
    render(
      <MemoryRouter>
        <RealEstateForm />
      </MemoryRouter>
    );
    expect(screen.getByLabelText('Title')).toHaveValue('');
    expect(screen.getByLabelText('Description')).toHaveValue('');
    expect(screen.getByLabelText('Address')).toHaveValue('');
    expect(screen.getByLabelText('Price')).toHaveValue('');
    expect(screen.getByLabelText('Image')).toBeInTheDocument();
    expect(screen.getByLabelText('Bedrooms')).toHaveValue('');
    expect(screen.getByLabelText('Bathrooms')).toHaveValue('');
  });
  test('displays validation messages for required fields', async () => {
    render(
      <MemoryRouter>
        <RealEstateForm />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByText('Submit'));
    expect(await screen.findByText('Please enter the title!')).toBeInTheDocument();
    expect(await screen.findByText('Please enter the description!')).toBeInTheDocument();
    expect(await screen.findByText('Please enter the address!')).toBeInTheDocument();
    expect(await screen.findByText('Please enter the price!')).toBeInTheDocument();
    expect(await screen.findByText('Please upload an image!')).toBeInTheDocument();
    expect(await screen.findByText('Please enter the agent name!')).toBeInTheDocument();
    expect(await screen.findByText('Please enter the agent email!')).toBeInTheDocument();
    expect(await screen.findByText('Please enter the agent phone!')).toBeInTheDocument();
  });
  test('handles API error for form submission', async () => {
    axios.post.mockRejectedValueOnce({ response: { status: 500 } });
    render(
      <MemoryRouter>
        <RealEstateForm />
      </MemoryRouter>
    );
    fireEvent.change(screen.getByLabelText('Title'), { target: { value: 'Sample Title' } });
    fireEvent.change(screen.getByLabelText('Description'), { target: { value: 'Sample Description' } });
    fireEvent.change(screen.getByLabelText('Address'), { target: { value: 'Sample Address' } });
    fireEvent.change(screen.getByLabelText('Price'), { target: { value: '100000' } });
    fireEvent.change(screen.getByLabelText('Image'), { target: { files: [new File([''], 'test-image.png')] } });
    fireEvent.change(screen.getByLabelText('Bedrooms'), { target: { value: 3 } });
    fireEvent.change(screen.getByLabelText('Bathrooms'), { target: { value: 2 } });
    fireEvent.click(screen.getByText('Submit'));
    await waitFor(() => expect(axios.post).toHaveBeenCalled());
    expect(await screen.findByText('Failed to submit listing')).toBeInTheDocument();
  });
  test('handles successful form submission', async () => {
    axios.post.mockResolvedValueOnce({ ok: true });
    render(
      <MemoryRouter>
        <RealEstateForm />
      </MemoryRouter>
    );
    fireEvent.change(screen.getByLabelText('Title'), { target: { value: 'Sample Title' } });
    fireEvent.change(screen.getByLabelText('Description'), { target: { value: 'Sample Description' } });
    fireEvent.change(screen.getByLabelText('Address'), { target: { value: 'Sample Address' } });
    fireEvent.change(screen.getByLabelText('Price'), { target: { value: '100000' } });
    fireEvent.change(screen.getByLabelText('Image'), { target: { files: [new File([''], 'test-image.png')] } });
    fireEvent.change(screen.getByLabelText('Bedrooms'), { target: { value: 3 } });
    fireEvent.change(screen.getByLabelText('Bathrooms'), { target: { value: 2 } });
    fireEvent.click(screen.getByText('Submit'));
    await waitFor(() => expect(axios.post).toHaveBeenCalled());
    expect(screen.getByText('View Property Page')).toBeInTheDocument();
  });
  test('handles form submission error and unauthorized access', async () => {
    axios.post.mockRejectedValueOnce({ response: { status: 500 } });
    render(
      <MemoryRouter>
        <RealEstateForm />
      </MemoryRouter>
    );
    fireEvent.change(screen.getByLabelText('Title'), { target: { value: 'Sample Title' } });
    fireEvent.change(screen.getByLabelText('Description'), { target: { value: 'Sample Description' } });
    fireEvent.change(screen.getByLabelText('Address'), { target: { value: 'Sample Address' } });
    fireEvent.change(screen.getByLabelText('Price'), { target: { value: '100000' } });
    fireEvent.change(screen.getByLabelText('Image'), { target: { files: [new File([''], 'test-image.png')] } });
    fireEvent.change(screen.getByLabelText('Bedrooms'), { target: { value: 3 } });
    fireEvent.change(screen.getByLabelText('Bathrooms'), { target: { value: 2 } });
    fireEvent.click(screen.getByText('Submit'));
    await waitFor(() => expect(axios.post).toHaveBeenCalled());
    expect(await screen.findByText('Failed to submit listing')).toBeInTheDocument();
    expect(localStorage.getItem('jwtToken')).toBeNull();
    expect(screen.getByText('Unauthorized')).toBeInTheDocument();
  });
});


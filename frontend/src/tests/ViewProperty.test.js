import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ViewProperty from '../modules/listings/ViewProperty';
import axios from 'axios';

describe('ViewProperty', () => {
  test('renders content', () => {
    const { queryByPlaceholderText } = render(<BrowserRouter><ViewProperty /></BrowserRouter>);
    expect(screen.getByText('Property Listings')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Create Property' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Bulk Upload' })).toBeInTheDocument();
    expect(screen.getByText('Sort by Price:')).toBeInTheDocument();
    const searchInput = queryByPlaceholderText('Search by Title or Address or Description');
    fireEvent.change(searchInput, { target: { value: 'Search by Title or Address or Description' } });
    expect(searchInput.value).toBe('Search by Title or Address or Description');
  });
  test("Listing", async () => {
    const { getByText } = render(<BrowserRouter><ViewProperty /></BrowserRouter>);
      await waitFor(() => {
      expect(screen.getByText("No matching properties found.")).toBeInTheDocument();
    });
    const getToken = localStorage.getItem('jwtToken');
    console.log("my token",getToken)
    if (getToken) {
    window.location.reload();
    }  
    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'View' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Edit' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Delete' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Previous' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Next' })).toBeInTheDocument();
      expect(screen.getByText("Price:")).toBeInTheDocument();
      expect(screen.getByText("Address:")).toBeInTheDocument();
    });
  });
});

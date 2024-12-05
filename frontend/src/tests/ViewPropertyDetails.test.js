import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import ViewPropertyDetails from '../modules/listings/ViewPropertyDetails';
import { render } from "@testing-library/react";
import { screen } from '@testing-library/react';
import axios from 'axios';

jest.mock('axios');
it('should render property details when API call is successful', async () => {
  const id = '659ef78c4f03d149d9c0d939';
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY1YTRjNDRmMDIwOThlZmIyZWVkZmM0MiIsInVzZXJuYW1lIjoiRGV2IiwiZW1haWwiOiJkZXZAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkQmZhN1pkZkppSllzS281Q1BNRDZkZXFWNjI1U0d1SG1XZHhFakwyazV4QnRLdUJiSHFzRm0iLCJwaG9uZSI6IjIxNjUzNTYyMzIiLCJfX3YiOjB9LCJpYXQiOjE3MDU0MDI4ODcsImV4cCI6MTcxNDA0Mjg4N30.YmqnW7mwMo1xOLgW7xpCqZdgtO5TV1hC5E7ZbSXLJho';  // Replace with your actual auth token
  const mockResponse = {
    data: {
      Title: 'furthermore anenst zowie',
    }
  };
  axios.get.mockResolvedValue(mockResponse);
  await render(<MemoryRouter><ViewPropertyDetails id={id} /></MemoryRouter>);
  expect(axios.get).toHaveBeenCalledWith('/user/listings/659ef78c4f03d149d9c0d939', {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  expect(screen.getByText('furthermore anenst zowie')).toBeInTheDocument();
  expect(screen.getByText('92105 Katherine Hills')).toBeInTheDocument();
  expect(screen.getByText($250000)).toBeInTheDocument();
});
test('should fetch property details successfully with valid id and token', async () => {
  const mockResponse = { data: { title: 'Property 1', description: 'This is a property', address: '123 Main St', price: 100000 } };
  axios.get.mockResolvedValue(mockResponse);
  localStorage.getItem.mockReturnValue('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY1YTRjNDRmMDIwOThlZmIyZWVkZmM0MiIsInVzZXJuYW1lIjoiRGV2IiwiZW1haWwiOiJkZXZAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkQmZhN1pkZkppSllzS281Q1BNRDZkZXFWNjI1U0d1SG1XZHhFakwyazV4QnRLdUJiSHFzRm0iLCJwaG9uZSI6IjIxNjUzNTYyMzIiLCJfX3YiOjB9LCJpYXQiOjE3MDU5MTYzODYsImV4cCI6MTcxNDU1NjM4Nn0.pOVH3WL7Se2hHL4w8Hbzn1f1HRw1PvHuldqd7ah3Ly0');
  useParams.mockReturnValue({ id: '6597e5a114ee2d279d3dddb3' });
  useNavigate.mockReturnValue(jest.fn());
  await ViewPropertyDetails();
  expect(axios.get).toHaveBeenCalledWith('/user/listings/123', {
    headers: {
      'Authorization': 'Bearer validToken',
      'Content-Type': 'application/json',
    },
  });
  expect(setPropertyDetails).toHaveBeenCalledWith({ title: 'Property 1', description: 'This is a property', address: '123 Main St', price: 100000 });
  expect(setLoading).toHaveBeenCalledWith(false);
});
it('should handle unauthorized access with invalid token', async () => {
  const mockError = { response: { status: 403 } };
  axios.get.mockRejectedValue(mockError);
  localStorage.getItem.mockReturnValue(null);
  useParams.mockReturnValue({ id: '123' });
  const navigateMock = jest.fn();
  useNavigate.mockReturnValue(navigateMock);
  await ViewPropertyDetails();
  expect(localStorage.removeItem).toHaveBeenCalledWith('jwtToken');
  expect(navigateMock).toHaveBeenCalledWith('/unauthorized');
  expect(setLoading).toHaveBeenCalledWith(false);
});

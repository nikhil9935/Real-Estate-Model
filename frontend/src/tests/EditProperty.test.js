import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';
import EditProperty from '../modules/listings/EditProperty'

jest.mock('axios');
describe('EditProperty', () => {
  test('fetches and displays property details for editing', async () => {
    axios.get.mockResolvedValueOnce({
      status: 200,
      data: {
        title: 'Test Property',
        description: 'Test Description',
        price: 100000,
        address: 'Test Address',
        details: {
          bedrooms: 3,
          bathrooms: 2,
          areaSquareFeet: 2000,
          isFurnished: true,
          hasGarage: true,
          isPetsAllowed: false,
          agentName: 'John Doe',
          contactEmail: 'john@example.com',
          contactPhone: '1234567890',
          hasSwimmingPool: false,
          isSecurityEnabled: true,
          isGatedCommunity: false,
          hasGarden: true,
          constructionYear: 2020,
          energyEfficiencyRating: 'A',
        },
        file: null,
      },
    });
    render(
      <MemoryRouter>
        <EditProperty />
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByLabelText('Title').value).toBe('Test Property');
      expect(screen.getByLabelText('Description').value).toBe('Test Description');
      expect(screen.getByLabelText('Price').value).toBe('100000');
      expect(screen.getByLabelText('Address').value).toBe('Test Address');
      expect(screen.getByLabelText('Bedrooms').value).toBe('3');
      expect(screen.getByLabelText('Bathrooms').value).toBe('2');
      expect(screen.getByLabelText('areaSquareFeet').value).toBe('2000');
      expect(screen.getByLabelText('isFurnished')).toBeChecked();
      expect(screen.getByLabelText('hasGarage')).toBeChecked();
      expect(screen.getByLabelText('isPetsAllowed')).not.toBeChecked();
      expect(screen.getByLabelText('agentName').value).toBe('John Doe');
      expect(screen.getByLabelText('contactEmail').value).toBe('john@example.com');
      expect(screen.getByLabelText('contactPhone').value).toBe('1234567890');
      expect(screen.getByLabelText('hasSwimmingPool')).not.toBeChecked();
      expect(screen.getByLabelText('isSecurityEnabled')).toBeChecked();
      expect(screen.getByLabelText('isGatedCommunity')).not.toBeChecked();
      expect(screen.getByLabelText('hasGarden')).toBeChecked();
      expect(screen.getByLabelText('Construction Year').value).toBe('2020');
      expect(screen.getByLabelText('Energy Efficiency Rating').value).toBe('A');
    });
  });
  test('updates property details successfully', async () => {
    axios.put.mockResolvedValueOnce({ status: 200 });
    render(
      <MemoryRouter>
        <EditProperty />
      </MemoryRouter>
    );
    await waitFor(() => {
      fireEvent.change(screen.getByLabelText('Title'), { target: { value: 'Updated Property' } });
      fireEvent.click(screen.getByText('Update Property'));
    });
    await waitFor(() => expect(axios.put).toHaveBeenCalled());
    expect(screen.getByText('Property details updated successfully!')).toBeInTheDocument();
  });
  test('renders content', async() => {
        render(
          <MemoryRouter>
            <EditProperty />
          </MemoryRouter>
        );  
        expect(screen.getByText('Edit Property')).toBeInTheDocument();
        expect(screen.getByText('Title:')).toBeInTheDocument();
        expect(screen.getByText('Description:')).toBeInTheDocument();
        expect(screen.getByText('Address:')).toBeInTheDocument();
        expect(screen.getByText('Price:')).toBeInTheDocument();
        expect(screen.getByText('Image:')).toBeInTheDocument();
        expect(screen.getByText('Bedrooms:')).toBeInTheDocument();
        expect(screen.getByText('Bathrooms:')).toBeInTheDocument();
        expect(screen.getByText('Area (Square Feet):')).toBeInTheDocument();
        expect(screen.getByText('Furnished:')).toBeInTheDocument();
        expect(screen.getByText('Has Garage:')).toBeInTheDocument();
        expect(screen.getByText('Has Garden:')).toBeInTheDocument();
        expect(screen.getByText('Pets Allowed:')).toBeInTheDocument();
        expect(screen.getByText('Has Swimming Pool:')).toBeInTheDocument();
        expect(screen.getByText('Is Gated Community:')).toBeInTheDocument();
        expect(screen.getByText('Construction Year:')).toBeInTheDocument();
        expect(screen.getByText('Is Security Enabled:')).toBeInTheDocument();
        expect(screen.getByText('Energy Efficiency Rating:')).toBeInTheDocument();
        expect(screen.getByText('Agent Name:')).toBeInTheDocument();
        expect(screen.getByText('Contact Email:')).toBeInTheDocument();
        expect(screen.getByText('Contact Phone:')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Update Property' })).toBeInTheDocument();
        fireEvent.change(screen.getByLabelText('Title:'), { target: { value: 'Sample Title' } });
        fireEvent.change(screen.getByLabelText('Description:'), { target: { value: 'Sample Description' } });
        fireEvent.change(screen.getByLabelText('Address:'), { target: { value: 'Sample Address' } });
        fireEvent.change(screen.getByLabelText('Price:'), { target: { value: '100000' } });
        fireEvent.change(screen.getByLabelText('Bedrooms:'), { target: { value: '10' } });
        fireEvent.change(screen.getByLabelText('Bathrooms:'), { target: { value: '10' } });
        fireEvent.change(screen.getByLabelText('Area (Square Feet):'), { target: { value: '100000' } });
        fireEvent.change(screen.getByLabelText('Furnished:'), { target: { value: '1' } });
        fireEvent.change(screen.getByLabelText('Has Garage:'), { target: { value: '1' } });
        fireEvent.change(screen.getByLabelText('Pets Allowed:'), { target: { value: '1' } });
        fireEvent.change(screen.getByLabelText('Has Swimming Pool:'), { target: { value: '1' } });
        fireEvent.change(screen.getByLabelText('Is Security Enabled:'), { target: { value: '1' } });
        fireEvent.change(screen.getByLabelText('Is Gated Community:'), { target: { value: '1' } });
        fireEvent.change(screen.getByLabelText('Has Garden:'), { target: { value: '1' } });
        fireEvent.change(screen.getByLabelText('Construction Year:'), { target: { value: '2000' } });
        fireEvent.change(screen.getByLabelText('Energy Efficiency Rating:'), { target: { value: 'A' } });
        fireEvent.change(screen.getByLabelText('Agent Name:'), { target: { value: 'Nikhil' } });
        fireEvent.change(screen.getByLabelText('Contact Email:'), { target: { value: 'n@gmail.com' } });
        fireEvent.change(screen.getByLabelText('Contact Phone:'), { target: { value: '2456234894' } });
        const UpdateProperty= screen.getByRole('button', { name: 'Update Property' });
        fireEvent.click(UpdateProperty);
        await waitFor(()=>{
          const token=localStorage.getItem('jwtToken')
          if(token){
          const btn=screen.getByRole('button', { name: 'Update Property' })
          // expect(window.location.pathname).toBe('/view-property')
          }
        })
      });
});

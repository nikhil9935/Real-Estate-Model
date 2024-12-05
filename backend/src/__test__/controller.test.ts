import { Request, Response } from 'express';
import { RealEstateListingService } from '../modules/listings/Services';
import RealEstateListingController from '../modules/listings/Controller';


jest.mock('../modules/listings/services');

describe('RealEstateListingController', () => {
  let req: Request;
  let res: Response;

  beforeEach(() => {
    req = {} as Request;
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
  });

  describe('getAllListings', () => {
    it('should return listings when getAllListings is successful', async () => {
      const listingsMock = [{ id: '1', name: 'Listing 1' }];
      const getAllListingsMock = jest.spyOn(RealEstateListingService.prototype, 'getAllListings');
      getAllListingsMock.mockResolvedValue(listingsMock);

      await RealEstateListingController.getAllListings(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(listingsMock);
      getAllListingsMock.mockRestore();
    });

    it('should handle errors and return 500 status when getAllListings fails', async () => {
    
      const errorMessage = 'Internal Server Error';
      const getAllListingsMock = jest.spyOn(RealEstateListingService.prototype, 'getAllListings');
      getAllListingsMock.mockRejectedValue(new Error(errorMessage));

  
      await RealEstateListingController.getAllListings(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
      getAllListingsMock.mockRestore();
    });
  });
});


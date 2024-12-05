import { RealEstateListingModel } from "../modules/listings/repositories/Model/Model";
import { RealEstateListingRepository } from "../modules/listings/repositories/Repository";

jest.mock('../modules/listings/repositories/Model/Model');

describe('RealEstateListingRepository', () => {
  let repository:any;

  beforeEach(() => {
    repository = new RealEstateListingRepository();
  });

  describe('getAllListings', () => {
    it('should fetch all listings', async () => {
      const mockFind = jest.spyOn(RealEstateListingModel, 'find').mockReturnThis();
      const skip = 0;
      const limit = 10;
      const sortOrder = 'asc';
      await repository.getAllListings(skip, limit, sortOrder);
      expect(mockFind).toHaveBeenCalledWith();
      mockFind.mockRestore();
    });
  });
});

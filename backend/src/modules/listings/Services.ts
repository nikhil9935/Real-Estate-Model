import { RealEstateListingRepository } from './repositories/Repository';
import { IRealEstateListing } from './Entities/IRealEstateListing';
interface SearchOptions {
  skip?: number;
  limit?: number;
  sortOrder?: 'asc' | 'desc';
}
export class RealEstateListingService {
  private repository: RealEstateListingRepository;

  constructor() {
    this.repository = new RealEstateListingRepository();
  }

  async getAllListings(skip: number, limit: number, sortOrder?: string): Promise<any> {
    try {
        const listings = await this.repository.getAllListings(skip, limit, sortOrder);
        return listings;
    } catch (error: any) {
        throw new Error(`Error fetching all listings in service: ${error.message}`);
    }
}

async searchListings(searchTerm: string, skip: number, limit: number, sortOrder?: string): Promise<any> {
  try {

      const searchResults = await this.repository.searchListings(searchTerm, skip, limit, sortOrder);
      return searchResults;
  } catch (error: any) {
      console.error(`Error searching listings in service: ${error.message}`);

      if (error) {
      
          throw new Error(`Specific error occurred while searching listings: ${error.message}`);
      }

      throw new Error(`Error searching listings in service: ${error.message || 'Unknown error'}`);
  }
}


  async createListing(data: IRealEstateListing): Promise<IRealEstateListing> {
    return this.repository.createListing(data);
  }
  async getListingById(id: string): Promise<IRealEstateListing | null> {
    return this.repository.findById(id);
  }
  public bulkWrite = async (books: any): Promise<void> => {
    await this.repository.bulkWrite(books);
  };

  async updateListing(listingId: string, updatedInfo: any): Promise<any> {
    try {
      const updatedListing = await this.repository.updateListing(listingId, updatedInfo);
      return updatedListing;
    } catch (error: any) {
      throw new Error(`Error updating listing: ${error.message}`);
    }
  }

  async deleteListing(id: string): Promise<void> {
    this.repository.delete(id);
  }

 
  async searchListingsByTitle(title: string, options: SearchOptions = {}): Promise<IRealEstateListing[]> {
    const { skip = 0, limit = 10, sortOrder = 'asc' } = options;

    try {
    
      const listings = await this.repository.findByTitle(title, {
        skip,
        limit,
        sortOrder,
      });

      return listings;
    } catch (error:any) {
      throw new Error(`Error searching listings by title: ${error.message}`);
    }
  }


  async searchListingsByAddress(address: string, options: SearchOptions = {}): Promise<IRealEstateListing[]> {
    const { skip = 0, limit = 10, sortOrder = 'asc' } = options;

    try {
      const listings = await this.repository.findByAddress(address, {
        skip,
        limit,
        sortOrder,
      });

      return listings;
    } catch (error:any) {
      throw new Error(`Error searching listings by title: ${error.message}`);
    }
  }
  async searchListingsByPrice(price: string): Promise<IRealEstateListing[]> {
    return this.repository.findByPrice(price);
  }
}

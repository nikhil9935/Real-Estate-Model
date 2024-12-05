import { Model} from 'mongoose';
import { RealEstateListingModel} from './Model/Model'
import { IRealEstateListing } from '../Entities/IRealEstateListing';

interface SearchOptions {
  skip?: number;
  limit?: number;
  sortOrder?: 'asc' | 'desc';
}

export class RealEstateListingRepository {
  private model: Model<IRealEstateListing>;

  constructor() {
    this.model = RealEstateListingModel;
  }
  public bulkWrite = async (books : any) : Promise<void> =>{
    await RealEstateListingModel.bulkWrite(books, {ordered:false});
  }
  async getAllListings(skip: number, limit: number, sortOrder?: string): Promise<any> {
    try {
        let query = RealEstateListingModel.find()
            .skip(skip)
            .limit(limit);

            if (sortOrder) {
      
              const sortCriteria: { [key: string]: 'asc' | 'desc' } = {};
      
              sortCriteria.createdAt = sortOrder.toLowerCase() === 'asc' ? 'asc' : 'desc';
          
              query = query.sort(sortCriteria);
          }

        const listings = await query.exec();

        return listings;
    } catch (error: any) {
        throw new Error(`Error fetching all listings in repository: ${error.message}`);
    }
}

  

async searchListings(searchTerm: string, skip: number, limit: number, sortOrder?: string): Promise<any> {
  try {
      console.log('Searching listings in repository:', searchTerm, skip, limit);

      let query = RealEstateListingModel.find({
          $or: [
              { title: { $regex: searchTerm, $options: 'i' } },
              { address: { $regex: searchTerm, $options: 'i' } },
          ],
      })
          .skip(skip)
          .limit(limit);

      if (sortOrder) {
      
          const sortCriteria: { [key: string]: 'asc' | 'desc' } = {};

          sortCriteria.createdAt = sortOrder.toLowerCase() === 'asc' ? 'asc' : 'desc';

          query = query.sort(sortCriteria);
      }

      const searchResults = await query.exec();

      return searchResults;
  } catch (error: any) {
      console.error('Error searching listings in repository:', error.message);

      if (error) {
       
          throw new Error(`MongoDB error occurred while searching listings: ${error.message}`);
      }

      throw new Error(`Error searching listings in repository: ${error.message || 'Unknown error'}`);
  }
}

  async findById(id: string): Promise<IRealEstateListing | null> {
    return this.model.findById(id).exec();
  }

 async createListing(data: IRealEstateListing): Promise<IRealEstateListing> {
    return RealEstateListingModel.create(data);
  }
  async updateListing(listingId: string, updatedInfo: any): Promise<any> {
    try {
      const updatedListing = await RealEstateListingModel.findByIdAndUpdate(
        listingId,
        updatedInfo,
        { new: true } 
      );

      return updatedListing;
    } catch (error: any) {
      throw new Error(`Error updating listing in repository: ${error.message}`);
    }
  }

  async delete(id: string){
    return this.model.findByIdAndDelete(id).exec();
  }

  async findByTitle(title: string, options: SearchOptions = {}): Promise<IRealEstateListing[]> {
    const { skip = 0, limit = 10, sortOrder = 'asc' } = options;

    try {
      const query = this.model
        .find({ title: { $regex: new RegExp(title, 'i') } })
        .skip(skip)
        .limit(limit)
        .sort({ title: sortOrder === 'asc' ? 1 : -1 }); 

      const listings = await query.exec();

      return listings;
    } catch (error:any) {
      throw new Error(`Error finding listings by title: ${error.message}`);
    }
  }
  async findByAddress(address: string, options: SearchOptions = {}): Promise<IRealEstateListing[]> {
    const { skip = 0, limit = 10, sortOrder = 'asc' } = options;

    try {
      const query = this.model.find({ address: { $regex: new RegExp(address, 'i') } })
                                        .skip(skip)
                                        .limit(limit)
                                        .sort({ address: sortOrder==='asc'?1:-1})
                                        
      const listings=await query.exec()

      return listings;
    } catch (error:any) {
      throw new Error(`Error finding listings by address: ${error.message}`);
    }
}
  async findByPrice(price: string): Promise<IRealEstateListing[]> {
    return this.model.find({ price: { $regex: new RegExp(price, 'i') } }).exec();
  }

}

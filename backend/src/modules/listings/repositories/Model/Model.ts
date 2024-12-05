import { model, Schema } from 'mongoose';
import { IRealEstateListing } from '../../Entities/IRealEstateListing';


export const realEstateListingSchema = new Schema<IRealEstateListing>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number },
  address: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  image:{type:String},
  details: {
    bedrooms: { type: Number },
    bathrooms: { type: Number },
    areaSquareFeet: { type: Number },
    isFurnished: { type: Boolean },
    hasGarage: { type: Boolean },
    isPetsAllowed: { type: Boolean },
    agentName: { type: String },
    contactEmail: { type: String },
    contactPhone: { type: Number },
    hasSwimmingPool: { type: Boolean },
    isSecurityEnabled: { type: Boolean },
    isGatedCommunity: { type: Boolean },
    hasGarden: { type: Boolean },
    constructionYear: { type: Number },
    energyEfficiencyRating: { type: String },
  },
});

export const RealEstateListingModel = model<IRealEstateListing>('RealEstateListing', realEstateListingSchema);

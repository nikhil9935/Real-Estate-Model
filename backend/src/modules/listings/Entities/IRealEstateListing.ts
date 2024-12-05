
export interface IRealEstateListing extends Document {
    title: string;
    description: string;
    price: number;
    address: string;
    image:string,
    createdAt: Date;
    updatedAt: Date;
  
    details: {
      bedrooms: number;
      bathrooms: number;
      areaSquareFeet: number;
      isFurnished: boolean;
      hasGarage: boolean;
      isPetsAllowed: boolean;
      agentName: string;
      contactEmail: string;
      contactPhone: number;
      hasSwimmingPool: boolean;
      isSecurityEnabled: boolean;
      isGatedCommunity: boolean;
      hasGarden: boolean;
      constructionYear: number;
      energyEfficiencyRating: string;
    };
  }
  
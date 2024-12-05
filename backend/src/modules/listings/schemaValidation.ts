import Joi from "joi";

export const realEstateListingSchemas = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    address: Joi.string().required(),
    image: Joi.string(),
    createdAt: Joi.date(),
    updatedAt: Joi.date(),
    details: Joi.object({
      bedrooms: Joi.number(),
      bathrooms: Joi.number(),
      areaSquareFeet: Joi.number(),
      isFurnished: Joi.boolean(),
      hasGarage: Joi.boolean(),
      isPetsAllowed: Joi.boolean(),
      agentName: Joi.string(),
      contactEmail: Joi.string(),
      contactPhone: Joi.number(),
      hasSwimmingPool: Joi.boolean(),
      isSecurityEnabled: Joi.boolean(),
      isGatedCommunity: Joi.boolean(),
      hasGarden: Joi.boolean(),
      constructionYear: Joi.number(),
      energyEfficiencyRating: Joi.string(),
    })
  });
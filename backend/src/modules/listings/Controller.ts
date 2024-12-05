import { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import { RealEstateListingService } from "./Services";
import Papa from "papaparse";
import fs from "fs";
import { RealEstateListingModel } from "./repositories/Model/Model";
import { v4 as uuidv4 } from "uuid";
import BulkErrorDetail from "./repositories/Model/bulkError.model";
import BulkUpload from "./repositories/Model/bulkUpload.model";
import IBulkUpload from "./Entities/IBulkUpload";
import IBulkError from "./Entities/IBulkError";
import { realEstateListingSchemas } from './schemaValidation';
import { UserDocument, userSchema } from './repositories/userSchema';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

interface Person {
  id: number;
  name: string;
  age: number;
}


const realEstateService = new RealEstateListingService();
const User = mongoose.model<UserDocument>('User', userSchema);
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/Images');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });


export default class RealEstateListingController {

  static async getAllListings(req: Request, res: Response) {
    const { skip, limit } = req.query;
    const { sortOrder }: any = req.query
    console.log(skip)

    try {
      const listings = await realEstateService.getAllListings(Number(skip), Number(limit), sortOrder);
      res.status(200).json(listings);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async searchListings(req: Request, res: Response) {
    try {
      const { searchTerm } = req.params;
      const { skip, limit } = req.query;
      const { sortOrder }: any = req.query

      const validatedSearchTerm = String(searchTerm || '');
      const validatedSkip = Number(skip) || 0;
      const validatedLimit = Number(limit) || 10;

      console.log("Search API hit with searchTerm:", validatedSearchTerm);


      const listings = await realEstateService.searchListings(validatedSearchTerm, validatedSkip, validatedLimit, sortOrder);

      res.status(200).json(listings);
    } catch (error: any) {
      console.error("Error in searchListings:", error);
      res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
  }


  static async getListingById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const listing = await realEstateService.getListingById(id);
      if (listing) {
        res.status(200).json(listing);
      } else {
        res.status(404).json({ message: 'Listing not found' });
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async createListing(req: Request, res: Response) {
    upload.single('file')(req, res, async (err: any) => {
      if (err) {
        console.log('Error hit!');
        return res.status(500).json({ error: err.message });
      }

      console.log('req.body', req.body);

      const listingData = req.body;
      console.log('listingData:', listingData)
      console.log('req.file:', req.file);

      try {

        const details = typeof listingData.details === 'string' ? JSON.parse(listingData.details) : listingData.details;

        const info = { image: req?.file?.filename, ...listingData, details };

        console.log(info)
        const newListing = await realEstateService.createListing(info);
        console.log("new", newListing)
        console.log("save")
        res.status(201).json(newListing);
      } catch (error: any) {
        res.status(500).json({ error: error.message });
      }
    });
  }

  static async updateListing(req: Request, res: Response) {
    upload.single('file')(req, res, async (err: any) => {
      if (err) {
        console.error('File upload error:', err);
        return res.status(500).json({ error: err.message });
      }

      const listingId = req.params.id;
      const { details, title, description, price, address } = req.body;

      try {
        let updatedInfo: any = {
          title,
          description,
          price,
          address,
          details: details && typeof details === 'string' ? JSON.parse(details) : details,
        };

        if (req.file?.filename) {
          console.log('New image file received:', req.file);
          updatedInfo.image = req.file.filename;
        }

        const updatedListing = await realEstateService.updateListing(listingId, updatedInfo);

        console.log('Listing updated successfully:', updatedListing);
        res.status(200).json(updatedListing);
      } catch (error: any) {
        console.error('Error updating listing:', error);
        res.status(500).json({ error: error.message });
      }
    });
  }

  static async deleteListing(req: Request, res: Response) {
    const { id } = req.params;
    try {
      await realEstateService.deleteListing(id);
      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async searchListingsByTitle(req: Request, res: Response) {
    const { title } = req.params;
    const { skip, limit, sortOrder } = req.query;

    try {

      const skipInt = parseInt(skip as string, 10) || 0;
      const limitInt = parseInt(limit as string, 10) || 10;

      const listings = await realEstateService.searchListingsByTitle(title, {
        skip: skipInt,
        limit: limitInt,
        sortOrder: sortOrder as any,
      });

      res.status(200).json(listings);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
  static async searchListingsByAddress(req: Request, res: Response) {
    const { address } = req.params;
    const { skip, limit, sortOrder } = req.query;

    try {

      const skipInt = parseInt(skip as string, 10) || 0;
      const limitInt = parseInt(limit as string, 10) || 10;

      const listings = await realEstateService.searchListingsByAddress(address, {
        skip: skipInt,
        limit: limitInt,
        sortOrder: sortOrder as any,
      });

      res.status(200).json(listings);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async searchListingsByPrice(req: Request, res: Response) {
    const { price } = req.params;
    try {
      const listings = await realEstateService.searchListingsByPrice(price);
      res.status(200).json(listings);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  public static bulkUpload = async (req: Request, res: Response) => {
    try {
      console.log('Start of bulkUsingPapaParse function');

      const session_id: string = uuidv4();
      const startTime = Date.now();
      const batchSize = 1000;
      let parsedDataCnt = 0;
      let errorCnt = 0;
      let bulkData: any[] = [];
      let bulkUploadErrors: any[] = [];
      const csvFile: Express.Multer.File | undefined = req.file;
      console.log(csvFile?.path);

      function transformRowData(obj: any) {
        const res = {};

        for (const key in obj) {
          const keys = key.split(".");
          let currentObj: any = res;

          for (let i = 0; i < keys.length - 1; i++) {
            currentObj[keys[i]] = currentObj[keys[i]] || {};
            currentObj = currentObj[keys[i]];
          }

          currentObj[keys[keys.length - 1]] = obj[key];
        }

        return res;
      }

      if (csvFile) {
        const filePath = csvFile.path;
        const readStream = fs.createReadStream(filePath);

        Papa.parse(readStream, {
          header: true,
          dynamicTyping: true,
          worker: true,
          step: async function (result, parser) {
            try {
              console.log('Inside Papa.parse step function');
              const rowData = result.data;
              const transformedObject = transformRowData(rowData);
              parsedDataCnt += 1;

              const { error } = realEstateListingSchemas.validate(transformedObject, {
                abortEarly: false,
              });

              if (error) {
                console.log('Validation Error:', error);
                errorCnt += 1;
                const bulkErrorDetail: IBulkError = {
                  rowNumber: parsedDataCnt,
                  errorDetails: Object(error.message),
                  session_id: session_id,
                };

                bulkUploadErrors.push({
                  insertOne: {
                    document: bulkErrorDetail,
                  },
                });

                if (bulkUploadErrors.length === batchSize) {
                  parser.pause()
                  await BulkErrorDetail.bulkWrite(bulkUploadErrors);
                  bulkUploadErrors = [];
                  parser.resume()
                }
              } else {
                console.log('Valid Data:', transformedObject);
                bulkData.push({
                  insertOne: {
                    document: transformedObject,
                  },
                });

                if (bulkData.length === batchSize) {
                  parser.pause()
                  await RealEstateListingModel.bulkWrite(bulkData, { ordered: false });

                  bulkData = [];
                  parser.resume()
                }
              }
            } catch (stepError) {
              console.error('Error in Papa.parse step function:', stepError);
            }
          },
          complete: async function () {
            try {
              console.log('Inside Papa.parse complete function');
              if (bulkData.length > 0) {
                await RealEstateListingModel.bulkWrite(bulkData);
                bulkData = [];
              }

              if (bulkUploadErrors.length > 0) {
                await BulkErrorDetail.bulkWrite(bulkUploadErrors);
                bulkUploadErrors = [];
              }

              const endTime = Date.now();
              console.log((endTime - startTime) / 1000);

              const bulkUploadRecord: IBulkUpload = {
                recordsProcessed: parsedDataCnt,
                totalErrors: errorCnt,
                timeTaken: (endTime - startTime) / 1000,
                session_id: session_id,
              };

              if (parsedDataCnt) {
                await BulkUpload.insertMany(bulkUploadRecord);
              }

              console.log(bulkUploadRecord);


              res.send('Uploading Successfull');
            } catch (completeError) {
              console.error('Error in Papa.parse complete function:', completeError);
            }
          },
          error: async function (parseError) {
            console.error('Error in Papa.parse:', parseError);
          },
        });

        console.log('End of bulkUsingPapaParse function');

      } else {
        console.log('No file selected');

      }
    } catch (error) {
      console.error('Error in bulkUsingPapaParse function:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };

  public static getAllBulkUploads = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const bulkUploads: IBulkUpload[] | null = await BulkUpload.find().limit(
        40
      );
      res.status(200).json(bulkUploads);
    } catch (error) {
      res.status(404).json(error);
    }
  };

  public static getBulkUploadErrorDetails = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { sessionId } = req.params;
      console.log("SESSION ID", sessionId)
      const bulkUploadErrorDetail: IBulkError[] | null = await BulkErrorDetail.find({ session_id: sessionId }).limit(20)
      console.log(bulkUploadErrorDetail)
      res.status(200).json(bulkUploadErrorDetail);
    } catch (error) {
      res.status(404).json(error);
    }
  };
  static registerUser = async (req: Request, res: Response):Promise<any> => {
    try {

      const existingUser = await User.findOne({
        $or: [{ username: req.body.username }, { email: req.body.email }],
      });

      if (existingUser) {
        return res.status(400).json({ error: 'Username or email already in use' });
      }
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        phone: req.body.phone,
      });
      await newUser.save();
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  public static loginUser = async (req: Request, res: Response): Promise<any> => {
    try {
      const secretKey = 'alpha-beta-gamma'
      const { username, password } = req.body;
      const user: any = await User.findOne({ username });
      console.log('NIKHILMAURYA', user)
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      const passwordMatch: boolean = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid password' });
      }
      const token = jwt.sign({ user: user }, secretKey, { expiresIn: '100d' });
      console.log(token)
      return res.status(200).json({
        message: 'Login successful',
        username: user.username,
        token: token,
      });

    } catch (error: any) {
      console.log("NIKHILMAURYA error", error.message, error.metadata);
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  public static deleteBulkUploadErrors = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    await BulkErrorDetail.deleteMany({});

    res.send("all bulk errors deleted successfully");
  };
  static filteredPersonsController(req: Request, res: Response): void {
    try {
      const filteredPersons: Person[] = req.filteredPersons || [];
      res.json({ persons: filteredPersons });
    } catch (error) {
      console.error('Error in filtered person controller:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}






import express, { Request, Response } from 'express';
import RealEstateListingController from './Controller';
import multer from 'multer';
import { UserDocument, userSchema } from './repositories/userSchema';
import { filterByAgeMiddleware } from './middleware/filterByAgeMiddleware';
import { authenticateToken } from './middleware/authMiddleware';

const router = express.Router();
router.use(express.json());
const upload = multer({ dest: 'uploads/' });


/**
 * @swagger
 * /user/listings:
 *    get:
 *      tags:
 *        - get all listings
 *      summary: Return all listings
 *      responses:
 *        '200':
 *          description: A list of properties
 */
router.get('/listings',authenticateToken, RealEstateListingController.getAllListings);
router.get('/listings/search/:searchTerm',authenticateToken, RealEstateListingController.searchListings);
/**
 * @swagger
 * /user/listings/{id}:
 *    get:
 *      tags:
 *        - get all listings
 *      summary: Return all listings
 *      parameters:
 *        - name: id
 *          in: path
 *          description: ID of the listing
 *          required: true
 *          schema:
 *            type: string  # Adjust the type according to your ID type (string in this case)
 *      responses:
 *        '200':
 *          description: A list of properties
 */

router.get('/listings/:id',authenticateToken, RealEstateListingController.getListingById);
/**
 * @swagger
 * /user/listings:
 *    post:
 *      tags:
 *        - create listing
 *      summary: Create a new listing
 *      requestBody:
 *        description: Listing details to be created
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                // Define your listing properties here
 *                title:
 *                  type: string
 *                description:
 *                  type: string
 *                // Add more properties as needed
 *              example:
 *                title: "Spacious Apartment"
 *                description: "A beautiful and spacious apartment for sale"
 *      responses:
 *        '201':
 *          description: Listing created successfully
 *        '400':
 *          description: Bad request, check the request body
 *        '500':
 *          description: Internal server error
 */

router.post('/listings',authenticateToken, RealEstateListingController.createListing);
router.put('/listings/:id', authenticateToken,RealEstateListingController.updateListing);
router.delete('/listings/:id',authenticateToken, RealEstateListingController.deleteListing);
router.get('/listings/search/title/:title',authenticateToken, RealEstateListingController.searchListingsByTitle);
router.get('/listings/search/address/:address',authenticateToken, RealEstateListingController.searchListingsByAddress);
router.get('/listings/search/price/:price',authenticateToken, RealEstateListingController.searchListingsByPrice);
router.post('/bulk-upload',upload.single('file'),authenticateToken, RealEstateListingController.bulkUpload);
router.get('/bulk-uploads-list',authenticateToken, RealEstateListingController.getAllBulkUploads);
router.get('/bulk-uploads-errors/:sessionId',authenticateToken, RealEstateListingController.getBulkUploadErrorDetails);
router.delete('/bulk-uploads-list/delete', authenticateToken,RealEstateListingController.deleteBulkUploadErrors);
router.post('/register',RealEstateListingController.registerUser)
router.post('/login',RealEstateListingController.loginUser)
// hit route like this - http://localhost:5000/user/filterperson?age=20
router.get('/filterperson', filterByAgeMiddleware, RealEstateListingController.filteredPersonsController);

export default router;

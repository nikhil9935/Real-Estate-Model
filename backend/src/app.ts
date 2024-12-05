import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser'; 
import Connection from './lib/connection';
import userRouter from './modules/listings/routes';
import cors from 'cors';
import swaggerSpec from './swaggerConfig'
import swaggerUi from "swagger-ui-express";

class App {
  private app: Express;
  public port: number;
  private connection: Connection;

  constructor() {
    this.connection = new Connection();
    this.app = express();
    this.port = 5000;
    Connection.connectDB()
    this.app.use('/view-property', express.static('./public/Images'));
    this.app.use(bodyParser.json({ limit: '50mb' }));
    this.app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

    this.configureMiddleware();
    this.configureRoutes();
  }

  private configureMiddleware(): void {
    const corsOptions = {
      origin: 'http://localhost:3000',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
    };

    this.app.use(cors(corsOptions));
    this.app.use(express.json());
  }

  private configureRoutes(): void {
    this.app.get('/', (req: Request, res: Response) => {
      res.send('Welcome.');
    });
    this.app.use('/user', userRouter);
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  }

  public run = async (): Promise<void> => {
    try {
      await Connection.connectDB();
      this.app.listen(this.port, () => {
        console.log("Server Running")
        console.log(`Server is running on port ${this.port}`);
        console.log(`http://localhost:${this.port}`);
      });
    } catch (error) {
      console.error('Error connecting to the database:', error);
    }
  }
  public getApp(): Express {
    return this.app;
  }
}

export default App;

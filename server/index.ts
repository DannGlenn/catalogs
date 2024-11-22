import express, { Request, Response } from 'express';
import cors from 'cors';
import CatalogsRouter from './src/routers/CatalogsRouter';
import * as InitController from './src/controllers/InitController';



const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.use("/catalogs",CatalogsRouter);

app.get('/', InitController.handleGet);


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

import express, { Request, Response } from 'express';
import cors from 'cors';
import cron from 'node-cron';
import CatalogsRouter from './src/routers/CatalogsRouter';
import * as CatalogsModel from './src/models/catalogsModel'
import * as InitController from './src/controllers/InitController';



const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.use("/catalogs",CatalogsRouter);

app.get('/', InitController.handleGet);

cron.schedule('0 0 * * *', async() => {
  await CatalogsModel.index()
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

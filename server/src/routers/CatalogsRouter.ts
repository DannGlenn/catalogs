import { Router } from 'express';
import * as CatalogsController from "../controllers/CatalogsController";

const CatalogsRouter: Router = Router();

CatalogsRouter.get('/', CatalogsController.getCatalogs);
CatalogsRouter.delete('/', CatalogsController.deleteCatalogs);

CatalogsRouter.get('/:catalogId', CatalogsController.getCatalog);
CatalogsRouter.put('/:catalogId', CatalogsController.updateCatalog);
CatalogsRouter.post('/:catalogId', CatalogsController.insertCatalog);



   
   
export default CatalogsRouter;
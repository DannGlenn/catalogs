import { queryDB } from "../../db"
import { Request, Response } from 'express';
import * as CatalogsModel from "../models/catalogsModel"

const CUSTOMER_ID = 1 //for the purpose of the assignment I'll use a single customer

export const getFilteredCatalogs = async (req: Request, res: Response) => {
    try{
        const query = String(req.query.query)
        const isMultiLocale = req.query.isMultiLocale === "true"
        const catalogs = await CatalogsModel.getFiltered(query, isMultiLocale);
        res.send({catalogs})
    }catch(error){
        console.error(error)
        res.status(500).send()
    }
}

export const getCatalog = async (req: Request, res: Response) => {
    try{
        const catalogId = req.params.catalogId
        const catalog = await CatalogsModel.getSingle(catalogId)
        res.send({catalog})
    }catch(error){
        console.error(error)
        res.status(500).send()
    }
}

export const updateCatalog = async (req: Request, res: Response) => {
    try{
        const catalogId = req.params.catalogId
        const formData = req.body
        formData.is_primary = formData.is_primary ? 1 : 0
        await CatalogsModel.update(formData, catalogId)
        res.send({message:'success'})
    }catch(error){
        console.error(error)
        res.status(500).send()
    }
}

export const insertCatalog = async (req: Request, res: Response) => {
    try{
        const formData = req.body
        formData.customer_id = CUSTOMER_ID
        formData.is_primary = formData.is_primary ? 1 : 0
        await CatalogsModel.insert(formData)
        
        res.send({message:'success'})
    }catch(error){
        console.error(error)
        res.status(500).send()
    }
}

export const deleteCatalogs = async (req: Request, res: Response) => {
    try{
        const catalogsObj = req.body
        const catalogIdsToDelete = Object.keys(catalogsObj).filter((id)=> catalogsObj[id]) //return id array where [id]:true
        await CatalogsModel.destroy(catalogIdsToDelete)
        res.send({message:'success'})
    }catch(error){
        console.error(error)
        res.status(500).send()
    }
}



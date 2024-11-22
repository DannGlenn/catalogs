import { queryDB } from "../../db"
import { Request, Response } from 'express';

export const handleGet = async (req: Request, res: Response) => {
    try{
        const promises = [
            queryDB('SELECT * FROM locales'),
            queryDB('SELECT * FROM verticals'),
        ];
      
        const [locales, verticals] = await Promise.all(promises);
    
        res.send({locales, verticals})
    }catch(error){
        console.error(error)
        res.status(500).send()
    }
}
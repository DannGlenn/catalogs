//query is sanitized in queryDB
import { queryDB } from "../../db"

export const getAll = async() => {
    return await queryDB('SELECT * FROM catalogs WHERE deleted_at IS NULL')
}

export const getSingle = async(catalogId:string) => {
    const catalog = await queryDB(`SELECT * FROM catalogs WHERE id = ${catalogId} AND deleted_at IS NULL LIMIT 1`); 
    return catalog[0]
}

export const update = async(formData:Record<string, string>, catalogId:string) => {
    const setClause = Object.keys(formData).map((field:string)=> `${field} = "${formData[field]}"`).join(',')

    await queryDB(`UPDATE catalogs SET ${setClause} WHERE id = ${catalogId}`); 
}

export const insert = async(formData:Record<string, string>) => {

    const colNames = Object.keys(formData).map((field:string)=> field).join(',')
    const values = Object.values(formData).map((value)=> `"${value}"`).join(',')

    await queryDB(
        `
        INSERT INTO catalogs (${colNames}) 
        VALUES (${values})
        `
    ); 
}

export const destroy = async(catalogIds:string[]) => {
    const inClause = catalogIds.map((id)=> `"${id}"`).join(',')
    await queryDB(`UPDATE catalogs SET deleted_at = CURRENT_TIMESTAMP AND is_primary = 0 WHERE id IN (${inClause})`); 
}

export const index = async() => {
    await queryDB(`UPDATE catalogs SET indexed_at = CURRENT_TIMESTAMP`); 
}


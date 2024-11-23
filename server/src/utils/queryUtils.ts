export const sanitizeSQL = (input: string): string => {
    return input.replace(/'/g, "''")
        .replace(/;/g, "")
        .replace(/--/g, "")
        .replace(/\\/g, '\\\\');
}


export const errorMessage:Record<string, string> = {
    'SQLITE_CONSTRAINT: UNIQUE constraint failed: catalogs.name' : 'Please select a unique catalog name'
    //the idea is to add here error messages for parsing (we obviously dont want to display the raw message to the client, exposing our db structure)
}

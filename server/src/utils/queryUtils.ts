export const sanitizeSQL = (input: string): string => {
    return input.replace(/'/g, "''")
        .replace(/;/g, "")
        .replace(/--/g, "")
        .replace(/\\/g, '\\\\');
}

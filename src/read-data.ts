import fetch from "node-fetch";
import parseCSVText from "./csv-helper";

interface FetchGoogleSheetsOption {
    sheetName: string,
    query: string
}

export default async function fetchRetrosheetData(sheetId: string, options: FetchGoogleSheetsOption) {
    const queryParams = new URLSearchParams({
        tqx: 'out:csv',
        sheet: options.sheetName,
        tq: options.query
    });
    try {
        const response = await fetch(`https://docs.google.com/spreadsheets/d/${ sheetId }/gviz/tq?${ queryParams }`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return parseCSVText(await response.text())
    } catch (error) {
        console.error('Error:', error);
        throw error
    }
}
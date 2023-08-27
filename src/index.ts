import fetch from "node-fetch";
import parseCSVText from "./csv-helper";

interface FetchGoogleSheetsOption {
    sheetName: string,
    query: string
}

async function fetchData(sheetId: string, options: FetchGoogleSheetsOption) {
    const queryParams = new URLSearchParams({
        tqx: 'out:csv',
        sheet: options.sheetName,
        tq: options.query
    });
    try {
        const response = await fetch(`https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?${queryParams}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return parseCSVText(await response.text())
    } catch (error) {
        console.error('Error:', error);
        throw error
    }
}

fetchData("1Xu054RgPFdI_MmAaVV6hNUZXSOOgJy9iwrc8vawsS_4", { sheetName: "notess", query: "select * limit 2" }).then((result) => {
    console.log(result)
}).catch((e)=> {
    console.log(e)
})

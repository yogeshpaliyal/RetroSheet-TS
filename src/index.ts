import fetch from "node-fetch";
import parseCSVText from "./csv-helper";

interface FetchGoogleSheetsOption {
    sheetName: string,
    query: string
}

async function fetchRetrosheetData(sheetId: string, options: FetchGoogleSheetsOption) {
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

fetchRetrosheetData("1Xu054RgPFdI_MmAaVV6hNUZXSOOgJy9iwrc8vawsS_4", { sheetName: "Form responses 1", query: "select * limit 2" }).then((result) => {
    console.log(JSON.stringify(result))
}).catch((e)=> {
    console.log(e)
})


// getFieldMapFromUrl("https://docs.google.com/forms/d/e/1FAIpQLSdYil2Gr5pSgwdi92A-NYEI9n-QQ7qdTRpYilf5ezgmLnXg6A/viewform?usp=sf_link")
//     .then((result) => {
//         console.log(result)
// }).catch((e) => {
//     console.log(e)
// })


submitForm("1FAIpQLSdYil2Gr5pSgwdi92A-NYEI9n-QQ7qdTRpYilf5ezgmLnXg6A", {
    'Title': "test title",
    'Description': 'test Description'
}).then(async (result) => {
//     console.log(await result.text())
// }).catch((e) => {
//     console.log(e)
// })
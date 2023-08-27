import fetch from "node-fetch";

const FORM_DATA_SPLIT_1 = "FB_PUBLIC_LOAD_DATA_"
const FORM_DATA_SPLIT_2 = "</script>"
const SOLUTION_UPDATE = "Please update retrosheet to latest version."

export async function getFieldMapFromUrl(formUrl: string) {
    const formRequest = await fetch(formUrl)
    if (formRequest.ok) {
        const htmlBody = await formRequest.text()
        const s1 = htmlBody.split(FORM_DATA_SPLIT_1);

        if (s1.length === 2) {
            const s2 = s1[1].split(FORM_DATA_SPLIT_2);

            if (s2.length > 0) {
                const s3 = s2[0];
                const fsb = s3.indexOf('[');
                const lsb = s3.lastIndexOf(']');
                const pageDataJson = s3.substring(fsb, lsb + 1).trim();
                const pageData = JSON.parse(pageDataJson)
                if (!pageData) {
                    throw new Error("Failed to decode google form data");
                }
                const formInfo = pageData[1];

                if (Array.isArray(formInfo)) {
                    const fields: Record<string, string> = {};
                    const columns = formInfo[1]
                    columns.forEach((_column: any) => {
                        const column = _column as any[];
                        const columnName = column[1] as string;
                        const columnIdInDouble = column[4][0][0].toString();
                        const columnId = columnIdInDouble;

                        fields[columnName] = columnId;

                    });
                    return fields;
                } else {
                    throwDataExpectationFailure();
                }
            } else {
                throwWrongSplit(FORM_DATA_SPLIT_2);
            }
        } else {
            throwWrongSplit(FORM_DATA_SPLIT_1);
        }
    } else {
        throw new Error(`Invalid form URL : ${ formUrl }. Got ${ formRequest.status }`);
    }
}


function throwDataExpectationFailure() {
    throw new Error(`Data expectation failed. ${ SOLUTION_UPDATE }`)
}

function throwWrongSplit(key: String) {
    throw new Error(`Wrong split keyword '${ key }'. ${ SOLUTION_UPDATE }`)
}


export async function submitForm(formId: string, formRequest: Record<string, string>) {
// https://docs.google.com/forms/d/e/1FAIpQLSdYil2Gr5pSgwdi92A-NYEI9n-QQ7qdTRpYilf5ezgmLnXg6A/viewform?usp=sf_link
    const viewFormUrl = `https://docs.google.com/forms/d/e/${formId}/viewform`
    const formSubmitUrl = `https://docs.google.com/forms/d/e/${formId}/formResponse`

    const fieldMap = await getFieldMapFromUrl(viewFormUrl)

    console.log("FieldMap", fieldMap)
    const formData: Record<string, string> = {};
    console.log("formRequest",formRequest)
    for (let formDataKey in formRequest) {
        const key = formDataKey.toString()
        console.log(key)
        const keyId = fieldMap[key]
        if (!keyId) {
            throw new Error(`"Couldn't find field '${formDataKey}' in the form"`)
        }
        formData[`entry.${keyId}`] = formRequest[formDataKey]
    }

    const requestFormBody = Object.keys(formData).map((key) => `${key}=${formData[key]}`).join("&")

    return await fetch(formSubmitUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: requestFormBody
    })

}
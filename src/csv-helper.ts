export  default function parseCSVText(csvText: string): Array<Record<string, string>> {
    const lines = csvText.split('\n');
    const headers = lines[0].split(',');

    const results: Record<string, string>[] = [];
    for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',');
        if (values.length === headers.length) {
            const entry: Record<string, string> = {};
            for (let j = 0; j < headers.length; j++) {
                entry[headers[j]] = values[j];
            }
            results.push(entry);
        }
    }
    return  results
}
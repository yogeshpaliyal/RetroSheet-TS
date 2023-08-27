export default function parseCSVText(csvText: string): Array<Record<string, string>> {
    const lines = csvText.split('\n');
    const headers = lines[0].split(',').map((item) => (item.startsWith('"') && item.endsWith('"')) ? item.slice(1, -1): item);

    const results: Record<string, string>[] = [];
    for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',');
        if (values.length === headers.length) {
            const entry: Record<string, string> = {};
            for (let j = 0; j < headers.length; j++) {
                let value = values[j]
                if (value.startsWith('"') && value.endsWith('"')) {
                    value = value.slice(1, -1);
                }
                entry[headers[j]] = value;
            }
            results.push(entry);
        }
    }
    return  results
}
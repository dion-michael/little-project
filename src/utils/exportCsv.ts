//@ts-ignore
import jsoncsv from 'json-csv';

interface IExportCsvParams {
    headers?: string[];
    items: any[];
    fileTitle: string;
}

export async function exportCSVFile({
    headers,
    items,
    fileTitle,
}: IExportCsvParams) {
    if (headers) {
        items.unshift(headers);
    }

    const csv: any = await toCsv(items);
    const exportedFilename = fileTitle + '.csv' || 'export.csv';

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    if (navigator.msSaveBlob) {
        // IE 10+
        navigator.msSaveBlob(blob, exportedFilename);
    } else {
        const link = document.createElement('a');
        if (link.download !== undefined) {
            // feature detection
            // Browsers that support HTML5 download attribute
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', exportedFilename);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
}

export function toCsv(data: any[]) {
    const keys = Object.keys(data[0]);
    const fields = keys.map((key) => {
        return {
            name: key,
            label: key,
        };
    });
    console.log(fields);
    const options = {
        fields,
    };

    return new Promise((resolve, reject) => {
        jsoncsv.buffered(data, options, (err: any, csv: any) => {
            if (err) {
                reject(err);
            } else {
                console.log(typeof csv);
                resolve(csv);
            }
        });
    });
}

interface CSVOptions {
  /**
   * Whether to include BOM header
   * @default true
   */
  withBOM?: boolean;
  /**
   * Header configuration, if not provided no header will be included
   */
  headers?: Array<{ key: string; label: string; formatter?: (value: any) => string }>;
  /**
   * Replacement for undefined/null values
   * @default ''
   */
  emptyFieldValue?: string;
  /**
   * Column delimiter
   * @default ','
   */
  delimiter?: string;
  /**
   * Row delimiter
   * @default '\n'
   */
  lineDelimiter?: string;
}

/**
 * Convert data to CSV format
 * @param data Data to export
 * @param options Configuration options
 * @returns CSV string
 */
function toCSV(data: Record<string, any>[], options: CSVOptions = {}): string {
  const { withBOM = true, headers = [], emptyFieldValue = '', delimiter = ',', lineDelimiter = '\n' } = options;

  // Handle BOM
  let csv = withBOM ? '\uFEFF' : '';

  // Handle headers
  if (headers.length > 0) {
    const headerLabels = headers.map(header => header.label);
    csv += headerLabels.join(delimiter) + lineDelimiter;
  }

  // Handle data rows
  data.forEach(item => {
    const row =
      headers.length > 0
        ? headers.map(header => {
            const key = header.key;
            let value = item[key] ?? emptyFieldValue;
            if (header.formatter) {
              value = header.formatter(value);
            }
            // Handle special characters
            if (
              typeof value === 'string' &&
              (value.includes(delimiter) || value.includes('"') || value.includes('\n'))
            ) {
              value = `"${value.replace(/"/g, '""')}"`;
            }
            return value;
          })
        : Object.values(item).map(value => {
            if (value === null || value === undefined) return emptyFieldValue;
            if (
              typeof value === 'string' &&
              (value.includes(delimiter) || value.includes('"') || value.includes('\n'))
            ) {
              return `"${value.replace(/"/g, '""')}"`;
            }
            return value;
          });

    csv += row.join(delimiter) + lineDelimiter;
  });

  return csv;
}

interface ExportCSVOptions extends CSVOptions {
  filename: string;
  data: Record<string, any>[];
}

/**
 * Export CSV file
 * @param options Export configuration options
 */
export function exportAsCSV({ filename, data, ...options }: ExportCSVOptions) {
  if (!filename) {
    throw new Error('Filename cannot be empty');
  }

  // Ensure the filename ends with .csv
  if (!filename.endsWith('.csv')) {
    filename += '.csv';
  }

  const csv = safeToCSV(data, options);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
}

/**
 * Safely convert data to CSV
 * @param data Data to export
 * @param options Configuration options
 * @returns CSV string
 * @throws Error when data is empty or invalid
 */
function safeToCSV(data: Record<string, any>[], options: CSVOptions = {}): string {
  if (!data || !Array.isArray(data) || data.length === 0) {
    throw new Error('Data cannot be empty and must be an array');
  }

  // Validate header keys exist in data
  if (options.headers) {
    const dataKeys = Object.keys(data[0]);
    for (const header of options.headers) {
      if (!dataKeys.includes(header.key)) {
        throw new Error(`Missing header key in data: ${header.key}`);
      }
    }
  }

  return toCSV(data, options);
}

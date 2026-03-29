export interface CsvConfigType {
  requiredColumns: string[];
  allColumns: string[];
  templateData: Record<string, string>;
  maxFileSize: number;
  acceptedFileTypes: string[];
}

export interface CsvValidationError {
  row: number;
  column: string;
  value: string;
  error: string;
}

export interface CsvParseResult<T = unknown> {
  success: boolean;
  data?: T[];
  errors: CsvValidationError[];
  missingColumns: string[];
  totalRows: number;
  validRows: number;
}

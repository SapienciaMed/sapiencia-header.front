import { EResponseCodes } from "../constants/api.enum";

interface IOperation {
  code: EResponseCodes;
  message?: string;
}

interface IDataPaging {
  total: number;
  perPage?: number;
  currentPage?: number;
  lastPage?: number;
  firstPage?: number;
  firstPageUrl?: string;
  lastPageUrl?: string;
  nextPageUrl?: string;
  previousPageUrl?: string;
}

export class ApiResponse<T> {
  data: T;
  operation: IOperation;

  constructor(data: T, code: EResponseCodes, message?: string) {
    this.data = data;
    this.operation = { code, message };
  }
}

export class ApiResponsePaginated<T> {
  data: T;
  operation: IOperation;
  dataPaging: IDataPaging;

  constructor(
    data: T,
    code: EResponseCodes,
    dataPaging: IDataPaging,
    message?: string
  ) {
    this.data = data;
    this.operation = { code, message };
    this.dataPaging = dataPaging;
  }
}

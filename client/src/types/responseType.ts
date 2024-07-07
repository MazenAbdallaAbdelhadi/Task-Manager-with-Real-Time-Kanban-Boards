export interface ResponseObject<T = null> {
  status: string;
  message: string;
  data: T;
}

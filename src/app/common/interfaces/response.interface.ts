export interface IResponse<T> {
	success: boolean;
	status?: string;
  	data: T;
  	message?: string;
}
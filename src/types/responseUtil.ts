import { ResponseDto } from "../util/responseUtil";

export interface ResponseUtilType {
    success: (message: string, data: any) => ResponseDto;
    failure: (message: string, data: any) => ResponseDto;
    error: (message: string, data: any) => ResponseDto;
}
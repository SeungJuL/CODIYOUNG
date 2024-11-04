import { ResponseUtilType } from "../types";

export class ResponseDto {
    constructor(public success: boolean, public message: string, public data: any) {}
}

export const ResponseUtil: ResponseUtilType = {
    success: (message, data) => {
        return new ResponseDto(true, message, data);
    },
    failure: (message, data) => {
        return new ResponseDto(false, message, data);
    },
    error: (message, data) => {
        return new ResponseDto(false, message, data);
    }
};
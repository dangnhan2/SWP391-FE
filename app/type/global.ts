export {};
import { UploadRequestOption as RcCustomRequestOptions } from "rc-upload/lib/interface";

declare global {
    interface IBackendRes<T> {
        msg : string;
        statusCode: number;
        total : number;
        data? : T 
    }

    interface ISupplier {
        id : number,
        name : string,
        phoneNo : string,
        address: string,
        representative : string,
        email : string
    }
}
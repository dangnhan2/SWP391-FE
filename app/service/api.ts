import axios from "./interceptor";

export const GetSuppliers = (query: string) => {
    return axios.get<IBackendRes<ISupplier[]>>(`/api/Supplier/getAll${query}`);
}

export const GetSupplierById = (id : number) => {
    return axios.get<IBackendRes<ISupplier>>(`/api/Supplier/getById/${id}`)
}

export const AddSupplier = (name: string, phone: string, email: string, address: string, representative : string) => {
    return axios.post<IBackendRes<ISupplier[]>>(`/api/Supplier/create`, {
        name,
        phone,
        email,
        address,
        representative
    });
}

export const UpdateSupplier = (id: number, name: string, phone: string, email: string, address: string, representative : string) => {
    return axios.put<IBackendRes<ISupplier[]>>(`/api/Supplier/update/${id}`, {
        name,
        phone,
        email,
        address,
        representative
    });
}

export const DeleteSupplier = (id : number) => {
    return axios.delete(`/api/Supplier/delete/${id}`)
}

export const GetUnits = () => {
    return axios.get(`/api/Unit/getAll`);
}
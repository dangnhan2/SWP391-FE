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

export const GetDishes = (query : string) => {
    return axios.get<IBackendRes<IDish[]>>(`/api/Dish/getAll${query}`);
}

export const GetDishById = (id : number) => {
    return axios.get<IBackendRes<IDish>>(`/api/Dish/getById/${id}`);
}

export const DeleteDish = (id : number) => {
    return axios.delete(`/api/Dish/deleteDish/${id}`)
}

export const AddDish = (name : string, category: string, price: number, description: string, imageUrl: string) => {
    return axios.post<IBackendRes<IDish>>(`/api/Dish/createDish`, {name, category, price, description, imageUrl})
}

export const UpdateDish = (id : number, name : string, category: string, price: number, description: string, imageUrl: string) => {
    return axios.put<IBackendRes<IDish>>(`/api/Dish/updateDish/${id}`,  {name, category, price, description, imageUrl})
}

export const UploadImage = (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  return axios.post("/api/File/image", formData); // Your controller should map to this
};

export const DeleteImage = (url : string) => {
    return axios.delete(`/api/File/image?url=${url}`)
}
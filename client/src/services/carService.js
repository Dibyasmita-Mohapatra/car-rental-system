import API from "./api";

export const getCars = () =>
  API.get("/cars");

export const createCar = (data) =>
  API.post("/cars", data);

export const deleteCar = (id) =>
  API.delete(`/cars/${id}`);

export const updateCar = (
  id,
  data
) =>
  API.put(
    `/cars/${id}`,
    data
  );
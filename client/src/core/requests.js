import { API } from "../config";
import queryString from 'query-string';

export const getProducts = async (sortBy) => {
  try {
    const response = await fetch(`${API}/products?sortBy=${sortBy}&order=desc&limit=6`, {
      method: "GET",
    });

    return response.json();
  } catch (error) {
    console.error("Catch block of getCategories: ", error);
  }
};

export const getCategories = async () => {
  try {
    const response = await fetch(`${API}/categories`, {
      method: "GET",
    });

    return response.json();
  } catch (error) {
    console.error("Catch block of getCategories: ", error);
  }
};

export const getFilteredProducts = async (skip, limit, filters) => {

  const data = { skip, limit, filters }

  try {
    const response = await fetch(`${API}/products/by/search`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return response.json();
  } catch (error) {
    console.error("Catch block of createCategory: ", error);
  }
};

export const list = async (params) => {

  const query = queryString.stringify(params)

  try {
    const response = await fetch(`${API}/products/search?${query}`, {
      method: "POST",
    });

    return response.json();
  } catch (error) {
    console.error("Catch block of getCategories: ", error);
  }
};
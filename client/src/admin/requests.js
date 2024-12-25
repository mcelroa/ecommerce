import { API } from '../config'

export const createCategory = async (userId, token, category) => {
  try {
    const response = await fetch(`${API}/category/${userId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ 'name': category }),
    });

    return response.json();
  } catch (error) {
    console.error("Catch block of createCategory: ", error);
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

export const createProduct = async (userId, token, product) => {
  try {
    const response = await fetch(`${API}/product/${userId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      },
      body: product,
    });

    return response.json();
  } catch (error) {
    console.error("Catch block of createProduct: ", error);
  }
};
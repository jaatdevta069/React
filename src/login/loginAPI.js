import api from "../axios/axios";

export const login = async (userName, password, token) => {
  console.log(userName + " " + password);
  try {
    const loginApi = await api.get(
      `/login?userName=${userName}&password=${password}`
    );
    // console.log(loginApi);
    return loginApi;
  } catch (error) {
    console.log(error.response);
    return error.response;
  }
};

export const register = async (userName, password, name, mail) => {
  try {
    const registerApi = await api.post(`/register`, {
      userName,
      password,
      name,
      mail,
    });
    console.log(registerApi);
    return registerApi;
  } catch (error) {
    return error.response;
  }
};

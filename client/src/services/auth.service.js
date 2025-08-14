import api from "./api";
import tokenService from "./token.service";

const API_URL = import.meta.env.VITE_AUTH_AP;

const register = async (username, name, email, password) => {
  return api.post(API_URL + "signup", { username, name, email, password });
};

const login = async (username, password) => {
  const response = await api.post(API_URL + "signin", { username, password });
  //seving user data to local storage
  if (!response.data.token) {
    return response;
  }
  tokenService.setUser(response.data);
};

const logout = () => {
  tokenService.removeUser();
};

const AuthService = {
  register,
  login,
  logout,
};
export default AuthService;

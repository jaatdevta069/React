import api from "./axios";
import { useContext } from "react";
import { authContext } from "../context";

async function useRefresh() {
  const { auth, setAuth } = useContext(authContext);
  const refresh = async () => {
    try {
      const token = await api.get(`/refresh`);
      console.log(`old token ${auth}`);
      console.log(`new token ${token.data?.newToken}`);
      setAuth(token?.data?.newToken);
      return token;
    } catch (error) {
      console.log(error.response);
      return error.response;
    }
  };
  return refresh;
}

export default useRefresh;
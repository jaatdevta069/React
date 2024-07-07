import { useEffect ,useContext} from "react";
import {authContext} from "../context";
import { priavteInstance } from "./axios";
import useRefresh from "./useRefresh";

const useIterceptor = ()=>{
  const refresh = useRefresh();
  const { auth } = useContext(authContext);
  useEffect(() => {
    const request = priavteInstance.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth}`;
        }
        return config;
      },
      (err) => {
        Promise.reject(err);
      }
    );
    
    const response = priavteInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const previousReq = error?.config;
        if (error?.response?.status === 403 && !previousReq.sent) {
          previousReq.sent = true;
          await refresh();
        }
      }
    );

    return () => {priavteInstance.interceptors.request.eject(request); priavteInstance.interceptors.response.eject(response);};
  }, [ auth, refresh]);

  return priavteInstance;
}

export default useIterceptor;
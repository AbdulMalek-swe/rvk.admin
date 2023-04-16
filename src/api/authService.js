import axios from "./apiService";
async function setTokens(data){
    await localStorage.setItem("access_token", data.access);
   await localStorage.setItem("refresh_token", data.refresh);
}
export const userLogin = async(data)=>{
     const res = await axios.post("/api/login/",data);
      await setTokens(res?.data?.data?.token)
     return res;
}
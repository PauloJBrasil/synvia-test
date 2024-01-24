import { redirect } from "react-router-dom";
import { getCookie } from "../config/cookies";
import { api } from "../services/api";
import toast from "react-hot-toast";

export const validateUser = async () => {
  const user = getCookie("@user");
  const token = getCookie("@token");

  if(!user || !token) return redirect('/login')

  return api.post("/usuario/validate-token", { token })
  .then((res) => {
    return null
  }).catch((err) => {
    toast.error(err.response.data?.message)
    return redirect('/login')
  })

};
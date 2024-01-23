import { redirect } from "react-router-dom";
import { getCookie } from "../config/cookies";

export const validateUser = () => {
  const user = getCookie("@user");
  const token = getCookie("@token");

  
  if (!user || !token) {
    return redirect("/login");
  }

  return null;
};
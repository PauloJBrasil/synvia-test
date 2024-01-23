import Cookies from "js-cookie";

export const getCookie = (key: string) => {
  const data = Cookies.get(key);

  if (!data) return null;
  if (data === "undefined") return null;

  return data;
};

export const getAllCokies = () => {
  return Cookies.get();
};

export const setCookie = (
  key: string,
  value: string,
  config?: Cookies.CookieAttributes
) => {
  return Cookies.set(key, value, config);
};

export const removeCookie = (
  key: string,
  config?: Cookies.CookieAttributes
) => {
  return Cookies.remove(key, config);
};

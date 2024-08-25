export function generateURL(path) {
  const baseURL = process.env.REACT_APP_PUBLIC_URL;
  console.log("baseURL", baseURL);
  let url = `${baseURL}${path}`;
  return url;
}
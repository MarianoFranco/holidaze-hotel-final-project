export const LOCAL_BASE_URL = `http://localhost:1337`;
export const PROD_BASE_URL = `https://project.herokuapp.com`;

export const DEV = true;
export const BASE_URL = DEV ? LOCAL_BASE_URL : PROD_BASE_URL;
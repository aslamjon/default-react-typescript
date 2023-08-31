const isProduction = () => {
  const env = process.env.NODE_ENV || "development";
  const isProduction = env === "production";
  return isProduction;
};

const getEnvironments = () => {
  if (isProduction())
    return process.env.REACT_APP_BASE_URL_PRODUCTION ? process.env.REACT_APP_BASE_URL_PRODUCTION : "production_env_not_found";
  else
    return process.env.REACT_APP_BASE_URL_DEVELOPMENT ? process.env.REACT_APP_BASE_URL_DEVELOPMENT : "development_env_not_found";
};

const config = {
  APP_NAME: "METALMART",
  API_ROOT: getEnvironments(),
  isProduction: isProduction(),
  DEFAULT_LANG_CODE: "uz",
  PROJECT_ID: 1,
};

export default config;
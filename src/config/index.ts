const dev = {
    API_ENDPOINT: "http://localhost:3001/api/v1",
  };
  
  const stag = {
    API_ENDPOINT: "",
  };
   
  const prod = {
    API_ENDPOINT: "",
  };
   
  const config = {
    ...(process.env.REACT_APP_STAGE === "prod" ||
    process.env.REACT_APP_STAGE === "production"
      ? prod
      : process.env.REACT_APP_STAGE === "staging"
      ? stag
      : dev),
  };
   
  export default config;
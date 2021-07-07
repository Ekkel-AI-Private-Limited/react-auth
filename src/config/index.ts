const dev = {
    // API_ENDPOINT: "http://stag-reco-backend.renesistechdemo.com:3009",
    // API_ENDPOINT: "http://localhost:8000/api/v1",
    // API_ENDPOINT: "https://reco-api-server.herokuapp.com/api/v1",
    API_ENDPOINT: "http://localhost:3000/api/v1",
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
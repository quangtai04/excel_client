const dev = {
  API_URL: "http://localhost:3011",
};

const prod = {
  API_URL: "https://excel.taipq.com",
};

const config = process.env.NODE_ENV === "production" ? prod : dev;

export default config;

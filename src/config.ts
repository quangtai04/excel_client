const dev = {
  API_URL: "http://localhost:3011",
};

const prod = {
  API_URL: "https://excelserver.taipq.com",
  // API_URL: "https://222.252.109.160",
};

const config = process.env.NODE_ENV === "production" ? prod : dev;

export default config;

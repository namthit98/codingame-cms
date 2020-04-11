export const CORE = {
  SERVER: process.env.REACT_APP_SERVER || "http://localhost:7000",
  AWS_S3:
    process.env.REACT_APP_AWS_S3 ||
    "https://codingame.s3-ap-southeast-1.amazonaws.com",
};

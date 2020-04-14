export const CORE = {
  SERVER: process.env.REACT_APP_SERVER || "http://localhost:7000",
  AWS_S3:
    process.env.REACT_APP_AWS_S3 ||
    "https://codingame.s3-ap-southeast-1.amazonaws.com",
};

export const ROLE = {
  ADMIN: "admin",
  MANAGER: "manager",
  COLLABORATOR: "collaborator",
  USER: "user",
};

export const ROLE_COLOR = {
  ADMIN: "#c62828",
  MANAGER: "#ee5b18",
  COLLABORATOR: "#1565c0",
  USER: "#2e7e32",
};

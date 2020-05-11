export const ROLES = {
  ADMIN: "admin",
  Manager: "manager",
  COLLABORATOR: "collaborator",
  USER: "user",
};

export const CORE = {
  SERVER_URL: process.env.SERVER_URL || 'http://localhost:7000/',
  S3_URL: process.env.S3_URL || 'https://codingame.s3-ap-southeast-1.amazonaws.com'
}
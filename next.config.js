module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["lh3.googleusercontent.com", "", "fakestoreapi.com"],
  },
  env: {
    stripe_public_key: process.env.KEY_ID,
  },
};

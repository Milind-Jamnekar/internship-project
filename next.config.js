module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["lh3.googleusercontent.com","scontent.fbom26-1.fna.fbcdn.net", "fakestoreapi.com"],
  },
  env: {
    stripe_public_key: process.env.KEY_ID,
  },
};

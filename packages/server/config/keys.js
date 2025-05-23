module.exports = {
  app: {
    name: 'Mern Social Media',
    apiEndpoint: process.env.API_URL ? `${process.env.API_URL}` : 'api',
  },
  database: {
    // after the pipes will be your connection string for MongoDB Atlas which you can get from pressing connect on your collection and then clicking connect to application
    url: process.env.MONGODB_URI || `mongodb+srv://karenSchick:karen@cluster0.rnexktn.mongodb.net/kenziecart?retryWrites=true`,
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'jwt-secret',
    tokenLife: '7d',
  },
}

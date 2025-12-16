const API_BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://p04-trade-up1.vercel.app'
  : 'http://localhost:3001';

export default API_BASE_URL;

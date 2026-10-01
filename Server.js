// server/server.js
// Main entry point for the Express backend

import express from 'express';
import dns from 'node:dns';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const dnsServers = process.env.MONGODB_DNS_SERVERS
  ?.split(',')
  .map((server) => server.trim())
  .filter(Boolean);

if (dnsServers?.length) {
  dns.setServers(dnsServers);
}

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
// Routes


// Root endpoint
app.get('/', (req, res) => {
  res.send('BookStore API is running');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;

if (mongoUri) {
  const schemeEnd = mongoUri.indexOf('://');
  const authorityStart = schemeEnd + 3;
  const authorityEndOffset = mongoUri.slice(authorityStart).search(/[/?#]/);
  const authorityEnd = authorityEndOffset < 0
    ? mongoUri.length
    : authorityStart + authorityEndOffset;
  const credentialsEnd = mongoUri.lastIndexOf('@', authorityEnd - 1);
  let normalizedMongoUri = mongoUri;

  if (schemeEnd >= 0 && credentialsEnd >= authorityStart) {
    const credentials = mongoUri.slice(authorityStart, credentialsEnd);
    const separator = credentials.indexOf(':');

    if (separator >= 0) {
      const encodeCredential = (value) => {
        try {
          return encodeURIComponent(decodeURIComponent(value));
        } catch {
          return encodeURIComponent(value);
        }
      };

      normalizedMongoUri = `${mongoUri.slice(0, authorityStart)}${encodeCredential(credentials.slice(0, separator))}:${encodeCredential(credentials.slice(separator + 1))}@${mongoUri.slice(credentialsEnd + 1)}`;
    }
  }

  mongoose.connect(normalizedMongoUri)
    .then(() => console.log('MongoDB connected.'))
    .catch((err) => console.error('MongoDB connection error:', err.message));
} else {
  console.warn('MONGO_URI or MONGODB_URI is not set; database connection skipped.');
}
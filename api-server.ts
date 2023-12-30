// Import necessary modules
import express from 'express';
import admin from 'firebase-admin';

// Initialize Firebase Admin with your service account key
const serviceAccount = require('./next-app-belajar-firebase-adminsdk-zw2vu-283b00caa7.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // Add any other Firebase configurations here
});

// Create an Express application
const app = express();

// Your existing API routes and other Express configurations go here

// Example route to retrieve all data from Firestore
app.get('/api/product', async (req, res) => {
  try {
    // Use Firestore to retrieve data
    const firestore = admin.firestore();
    const productsCollection = firestore.collection('products');
    const snapshot = await productsCollection.get();

    const productsData = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.status(200).json({ status: true, statusCode: 200, data: productsData });
  } catch (error) {
    console.error('Error retrieving data:', error);
    res.status(500).json({ status: false, statusCode: 500, data: null });
  }
});

// Modified route to retrieve data by ID
app.get('/api/product/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Use Firestore to retrieve data by ID
    const firestore = admin.firestore();
    const productDoc = await firestore.collection('products').doc(id).get();

    if (!productDoc.exists) {
      // Handle case where document with the given ID does not exist
      res.status(404).json({ status: false, statusCode: 404, data: null });
      return;
    }

    const productData = {
      id: productDoc.id,
      ...productDoc.data(),
    };

    res.status(200).json({ status: true, statusCode: 200, data: productData });
  } catch (error) {
    console.error('Error retrieving data by ID:', error);
    res.status(500).json({ status: false, statusCode: 500, data: null });
  }
});

// Start the Express server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

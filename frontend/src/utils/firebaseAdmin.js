// This file is used to initialize the Firebase Admin SDK
import admin from 'firebase-admin';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(Import.meta.env.VITE_SERVICE_ACCOUNT_KEY),
  });
}

export const adminAuth = admin.auth();

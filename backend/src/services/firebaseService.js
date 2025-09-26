const admin = require("firebase-admin");

const serviceAccount = require("../../firebase-adminsdk.json"); 
// Download from Firebase console > Project settings > Service accounts

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;

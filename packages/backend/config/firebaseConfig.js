const admin = require('firebase-admin');

const serviceAccount = require('./better-food-carbon-calculator-firebase-adminsdk-uw704-ff0e4809f0.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const timeStamp = admin.firestore.Timestamp

module.exports = {
  db, timeStamp
};
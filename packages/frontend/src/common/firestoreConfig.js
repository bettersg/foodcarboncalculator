const admin = require("firebase-admin");

/* consider putting in env */
const serviceAccount = require("../better-food-carbon-calculator-firebase-adminsdk-uw704-ff0e4809f0.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
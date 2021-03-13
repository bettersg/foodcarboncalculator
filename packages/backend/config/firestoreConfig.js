const admin = require('firebase-admin');
const functions = require('firebase-functions');
// import admin from 'firebase-admin';

const serviceAccount = {
  type: functions.config().service_account.type,
  project_id: functions.config().service_account.project_id,
  private_key_id: functions.config().service_account.private_key_id,
  private_key: functions.config().service_account.private_key,
  client_email: functions.config().service_account.client_email,
  client_id: functions.config().service_account.client_id,
  auth_uri: functions.config().service_account.auth_uri,
  token_uri: functions.config().service_account.token_uri,
  auth_provider_x509_cert_url: functions.config().service_account.auth_provider_x509_cert_url,
  client_x509_cert_url: functions.config().service_account.client_x509_cert_url,
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

module.exports = db;


// const admin = require("firebase-admin");
// const serviceAccount = require("./serviceKey.json"); // adjust path as needed

// admin.initializeApp({
//   credential: admin.credential.cert({
//     projectId: serviceAccount.project_id,
//     privateKey: serviceAccount.private_key,
//     clientEmail: serviceAccount.client_email,
//   }),
// });

// module.exports =admin;
const admin = require("firebase-admin");
const path = require("path");

// Use Render secret file if available, otherwise local file
const serviceAccountPath = process.env.GOOGLE_APPLICATION_CREDENTIALS 
  ? process.env.GOOGLE_APPLICATION_CREDENTIALS 
  : path.join(__dirname, "serviceKey.json");

const serviceAccount = require(serviceAccountPath);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;

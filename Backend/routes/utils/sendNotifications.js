// utils/sendPushNotification.js
const admin = require("firebase-admin");

// ✅ This function will send a notification to a specific FCM token
// const sendPushNotification = async (targetToken, title, body) => {
//   try {
//     const message = {
//       token: targetToken,
//       notification: {  title,body, },
//       token
//     };


//      // 🔍 Debugging: Log the notification data before sending it
//     console.log("🚀 Sending notification to token:", targetToken);
//     console.log("📩 Notification Payload:", message);


//     const response = await admin.messaging().send(message);
//     console.log("Notification sent successfully:", response);
//     return response;
//   } catch (error) {
//     console.error("Error sending push notification:", error);
//     throw error;
//   }
// };


const sendPushNotification = async (targetToken, title, body) => {
  try {
    if (!targetToken) {
      console.error("❌ No FCM token provided.");
      return;
    }

    const message = {
      token: targetToken,
      notification: {
        title: title,
        body: body,
      },
    };

    console.log("📩 Sending Notification:", message);

    const response = await admin.messaging().send(message);
    console.log("✅ FCM Response:", response);
    return response;
  } catch (error) {
    console.error("❌ Error sending notification:", error);
  }
};
module.exports = { sendPushNotification };

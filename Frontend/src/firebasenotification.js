// firebase-messaging.js
import { getToken , onMessage  } from "firebase/messaging";
import { messaging } from "./firebase"; // Use the same app instance
//  import { messaging } from "./firebase"; // Use the same app instance

// const messaging = getMessaging(app);

// // ✅ Get FCM Token

const requestFCMToken = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
      console.warn("Notification permission not granted.");
      return null;
    }

    const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
    
    const token = await getToken(messaging, {
      vapidKey: "BFI_UczNVLxE1_Oa9qcSHiQQrshLilWBTcIz-t-a7RKEuVwLLiLsgmoyRLlEy4r5q98D7ffVK7NdUYVUQxj2cUw",
      serviceWorkerRegistration: registration, // ✅ This is mandatory
    });

    if (token) {
      console.log("FCM Token:", token);
      return token;
    } else {
      console.warn("No registration token available. Request permission.");
      return null;
    }
  } catch (error) {
    console.error("FCMM Token Error please check:", error);
    return null;
  }
};


const listenToMessages = () => {
  onMessage(messaging, (payload) => {
    console.log("📥 Foreground message received:", payload);

    const { title, body } = payload.notification || payload.data;

    // ✅ Show browser notification manually
    if (Notification.permission === "granted") {
      new Notification(title, {
        body,
        // icon: "/logo192.png", // optional
      });
    }
  });
};
export { requestFCMToken,listenToMessages};
// public/firebase-messaging-sw.js

importScripts('https://www.gstatic.com/firebasejs/10.11.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.11.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyDotTEwOtF6RGfd6kY-Ui0ie8Tq1bBOCYs",
  authDomain: "projectcwa-e2b53.firebaseapp.com",
  projectId: "projectcwa-e2b53",
  storageBucket: "projectcwa-e2b53.appspot.com",
  messagingSenderId: "828549090799",
  appId: "1:828549090799:web:5d345e0df7724ab4f8fa1a",
  measurementId: "G-WDWPHGPK85",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  
  const notificationTitle = payload.notification?.title || 'New Message';
  const notificationOptions = {
    body: payload.notification?.body || 'you have a notifcation',
    // icon: '/.png' // optional
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});


// self.addEventListener("push", function (event) {
//   const data = event.data?.json();
//   const title = data?.title || "New Message";
//   const options = {
//     body: data?.body || "You have a new notification.",
//     // icon: "/icon.png",
//     data:data,
//   };
//   event.waitUntil(
//     self.registration.showNotification(title, options)
//   );
// });
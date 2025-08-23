import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
// ✅ Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDotTEwOtF6RGfd6kY-Ui0ie8Tq1bBOCYs",
  authDomain: "projectcwa-e2b53.firebaseapp.com",
  projectId: "projectcwa-e2b53",
  storageBucket: "projectcwa-e2b53.appspot.com",
  messagingSenderId: "828549090799",
  appId: "1:828549090799:web:5d345e0df7724ab4f8fa1a",
  measurementId: "G-WDWPHGPK85",
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const messaging = getMessaging(app);

// ✅ Correct usage should be inside an `async` function
async function verifyOtpAndGetIdToken(otp) {
  try {
    const result = await window.confirmationResult.confirm(otp);
    const user = result.user;
    const idToken = await user.getIdToken();
  console.log("ID Token:", idToken); // Log the ID token for debugging
    // Now you can send this `idToken` to your backend
    return idToken;
  } catch (error) {
    console.error("OTP Verification Error:", error);
    return null;
  }
}

// ✅ Export the auth and useful methods
export { auth, RecaptchaVerifier, signInWithPhoneNumber, verifyOtpAndGetIdToken , getMessaging, getToken, onMessage ,messaging  };

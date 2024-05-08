import {
  auth,
  signInWithEmailAndPassword,
  signOut,
  // googleAuthProvider,
  // facebookAuthProvider,
  // signInWithPopup,
  createUserWithEmailAndPassword,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "auth/FirebaseAuth";

const FirebaseService = {};

FirebaseService.signInEmailRequest = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password)
    .then((user) => user)
    .catch((err) => err);
};

FirebaseService.signOutRequest = async () =>
  await signOut(auth)
    .then((user) => user)
    .catch((err) => err);

// FirebaseService.signInGoogleRequest = async () =>
//   await signInWithPopup(auth, googleAuthProvider).then(user => user).catch(err => err);

// FirebaseService.signInFacebookRequest = async () =>
//   await signInWithPopup(auth, facebookAuthProvider).then(user => user).catch(err => err);

const reauthenticate = async (currentPassword) => {
  const user = auth.currentUser;
  const cred = EmailAuthProvider.credential(user.email, currentPassword);
  try {
    await reauthenticateWithCredential(user, cred);
    return true;
  } catch (error) {
    return false;
  }
};

FirebaseService.changePassword = async (currentPassword, newPassword) => {
  const reauthenticated = await reauthenticate(currentPassword);
  if (reauthenticated) {
    try {
      await updatePassword(auth.currentUser, newPassword);
      return true;
    } catch (error) {
      return false;
    }
  } else {
    return false;
  }
};

FirebaseService.signUpEmailRequest = async (email, password) =>
  await createUserWithEmailAndPassword(auth, email, password)
    .then((user) => user)
    .catch((err) => err);

export default FirebaseService;

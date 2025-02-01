
import { https } from "firebase-functions";
import admin from "firebase-admin";

admin.initializeApp();

const auth = admin.auth();

export const setAdminRole = https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new https.HttpsError("unauthenticated", "Request not authorized.");
  }

  const user = await auth().getUser(context.auth.uid);
  if (!user.customClaims?.admin) {
    throw new https.HttpsError("permission-denied", "Only admins can promote users.");
  }

  const uid = data.uid;
  await auth().setCustomUserClaims(uid, { admin: true });

  return { message: `User ${uid} is now an Admin.` };
});

export const getAllUsers = https.onCall(async (data, context) => {
  if (!context.auth || !context.auth.token.admin) {
    throw new https.HttpsError("permission-denied", "Only admins can fetch users.");
  }

  let users = [];
  let nextPageToken = null;

  do {
    const listUsersResult = await auth().listUsers(1000, nextPageToken);
    listUsersResult.users.forEach((userRecord) => {
      users.push({
        uid: userRecord.uid,
        email: userRecord.email,
        displayName: userRecord.displayName,
        photoURL: userRecord.photoURL,
        admin: userRecord.customClaims?.admin || false,
      });
    });
    nextPageToken = listUsersResult.pageToken;
  } while (nextPageToken);

  return { users };
});

export const removeAdminRole = https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new https.HttpsError("unauthenticated", "Request not authorized.");
  }

  const user = await auth().getUser(context.auth.uid);
  if (!user.customClaims?.admin) {
    throw new https.HttpsError("permission-denied", "Only admins can remove admin roles.");
  }

  const uid = data.uid;
  await auth().setCustomUserClaims(uid, { admin: false });

  return { message: `User ${uid} is no longer an Admin.` };
});

export const deleteUser = https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new https.HttpsError("unauthenticated", "Request not authorized.");
  }

  const user = await auth().getUser(context.auth.uid);
  if (!user.customClaims?.admin) {
    throw new https.HttpsError("permission-denied", "Only admins can delete users.");
  }

  const uid = data.uid;
  await auth().deleteUser(uid);

  return { message: `User ${uid} has been deleted.` };
});

export const promoteUsersToAdmin = https.onRequest(async (req, res) => {
  const adminUsers = [
    "tVHkl9TmZKZtwaAt0p0vpgPKp9u2",
    "TvbJWiFVqWVvFBMZR95tFOIK2y72",
    "UFW20vfGs8ZXH9XxtBu6POLc2mT2"
  ];

  try {
    // Set admin role for each user in the list
    await Promise.all(adminUsers.map(uid => auth.setCustomUserClaims(uid, { admin: true })));
    res.status(200).send({ message: "Users successfully promoted to Admin." });
  } catch (error) {
    res.status(500).send({ error: `Error setting admin role: ${error.message}` });
  }
});

export const convertUser = (rawData) => ({
    displayName: rawData.displayName,
    email: rawData.email,
    photoURL: rawData.photoURL,
    id: rawData.uid,
    phoneNumber: rawData.phoneNumber,
});

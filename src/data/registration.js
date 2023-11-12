import { db } from "./firebase";

const registrations = () => db.ref("registrations");

const registration = (registration) => registrations().child(registration);

const getRegistration = (key) => registration(key).once("value");

const addRegistration = (registration) => {
    registrations().push(registration);
};

const deleteRegistration = (key) => registration(key).remove();

const updateRegistration = (key, data) => registration(key).update(data);

export async function getAllRegistration() {
    const ref = registrations();
    const registration = await ref.once("value");
    const result = registration.val();
    return Object.keys(result).map((key) => {
        return result[key];
    });
}

export async function getRegistrationByConferenceId(conferenceId) {
    const allRegistration = await getAllRegistration();
    console.log(
        "🚀 ~ file: registration.js:28 ~ getRegistrationByConferenceId ~ allRegistration:",
        allRegistration
    );
    return allRegistration.filter((registration) => registration.conferenceId === conferenceId);
}

export const registrationService = {
    getRegistration,
    addRegistration,
    deleteRegistration,
    updateRegistration,
    getAllRegistration,
    getRegistrationByConferenceId,
};

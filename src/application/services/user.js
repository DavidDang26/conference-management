import { db } from './firebase';

const admins = () => db.ref('admin');

const admin = (admin) => admins().child(admin);

const addAdmin = (admin) => {
    const customChild = admins().child(admin.id);
    if (customChild.id) {
        return;
    } else customChild.set(admin);
};

const deleteAdmin = (key) => admin(key).remove();

const updateAdmin = (key, data) => admin(key).update(data);

export const adminService = {
    admins,
    admin,
    addAdmin,
    deleteAdmin,
    updateAdmin,
};

import React from "react";
import { withAuthorization } from "../auth/auth-hoc";
import SideBar from "../components/SideBar";

const RegistrationPage = withAuthorization((authUser) => !!authUser)(() => {
    return (
        <div className="flex gap-5">
            <div className="w-1/6 ml-12">
                <SideBar />
            </div>
        </div>
    );
});
export default RegistrationPage;

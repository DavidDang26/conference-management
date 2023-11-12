import React from "react";
import { withAuthorization } from "../auth/auth-hoc";
import SideBar from "../components/SideBar";

const RegistrationPage = withAuthorization((authUser) => !!authUser)(() => {
    return (
        <div className="flex gap-5 h-full">
            <div className="w-1/6 ml-12">
                <SideBar />
            </div>
            <div className="w-5/6 bg-blue-400 pt-16 py-4 px-3 px-3 mr-8"></div>
        </div>
    );
});
export default RegistrationPage;

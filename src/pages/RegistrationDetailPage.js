import React from "react";
import { withAuthorization } from "../auth/auth-hoc";
import SideBar from "../components/SideBar";
import RegistrationTable from "../components/RegistrationTable";

const RegistrationDetailPage = withAuthorization((authUser) => !!authUser)((props) => {
    const conferenceId = props.match?.params?.conferenceId;
    return (
        <div className="flex gap-5 h-full">
            <div className="w-1/6 ml-12">
                <SideBar />
            </div>
            <div className="w-5/6 pt-16 py-4 px-3 px-3 mr-8">
                <RegistrationTable conferenceId={conferenceId} />
            </div>
        </div>
    );
});
export default RegistrationDetailPage;

import React from "react";
import { BookOutlined, UserSwitchOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { useStateValue } from "../context/state-provider";
import { actionTypes } from "../auth/reducer";

const sideBarComponent = [
    {
        id: 1,
        text: "Conferences",
        icon: BookOutlined,
        path: "/boards",
    },
    {
        id: 2,
        text: "Registrations",
        icon: UserSwitchOutlined,
        path: "/registration",
    },
];

const SideBar = () => {
    const history = useHistory();
    const [state, dispatch] = useStateValue();
    return (
        <div className="h-full pt-24 flex flex-col gap-3    ">
            {sideBarComponent.map((component) => (
                <div
                    key={component.id}
                    className={`flex items-center px-5 py-3 text-center ${
                        component.id === state.sideBarId ? "bg-blue-100" : ""
                    } text-black text-lg font-bold cursor-pointer rounded-xl text`}
                    onClick={() => {
                        dispatch({
                            type: actionTypes.SET_SIDE_BAR,
                            sideBarId: component.id,
                        });
                        history.push(component.path);
                    }}
                    onKeyDown={() => {}}
                    role="button"
                    tabIndex={-1}
                >
                    <component.icon className="mr-5" />
                    <div>{component.text}</div>
                </div>
            ))}
        </div>
    );
};

export default SideBar;

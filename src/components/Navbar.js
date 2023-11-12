import { Dropdown, Menu } from "antd";
import { HomeOutlined, SettingOutlined } from "@ant-design/icons";
import { Link, withRouter } from "react-router-dom";
import React from "react";
import { signOut } from "../application/services/auth";
import { ROUTES } from "../application/constants";
import { useStateValue } from "../application/state-provider";

export const Navbar = withRouter(() => {
    const [state, dispatch] = useStateValue();
    const { user } = state;
    return (
        <nav
            className={`flex justify-between bg-gray-500 text-white px-10 py-1 absolute z-10 top-0 left-0 right-0`}
        >
            <Link to={ROUTES.BOARDS}>
                <div
                    className={`w-10 h-10 flex bg-gray-400 justify-center items-center rounded text-white`}
                >
                    <HomeOutlined />
                </div>
            </Link>
            <Dropdown
                overlay={
                    <Menu>
                        <Menu.Item key="0" onClick={() => signOut()}>
                            Sign Out
                        </Menu.Item>
                    </Menu>
                }
                trigger={["click"]}
            >
                <div className={`w-10 h-10 flex  justify-center items-center rounded text-white`}>
                    {user && user.photoURL ? (
                        <img src={user.photoURL} alt="avatar" className="w-10 h-10 rounded-full" />
                    ) : (
                        <SettingOutlined />
                    )}
                </div>
            </Dropdown>
        </nav>
    );
});

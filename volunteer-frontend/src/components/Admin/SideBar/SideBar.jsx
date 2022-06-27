import React from 'react';
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";

import "./SideBar.scss";

const SideBar = ({setTab}) => {
    return (
        <div className="sidebar">
            <div className="top">
                <span className="logo">Admin Panel</span>
            </div>
            <hr/>
            <div className="center">
                <ul>
                    <li onClick={() => setTab(1)}>
                        <PersonOutlineIcon className="icon"/>
                        <span>Користувачі</span>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default SideBar;
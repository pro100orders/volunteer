import React, {useState} from 'react';
import SideBar from "../../components/Admin/SideBar/SideBar";
import Users from "../../components/Admin/Users/Users";

const Admin = () => {

    const [tab, setTab] = useState(0);

    return (
        <div style={{display: "flex", minHeight: "100vh"}}>
            <SideBar setTab={setTab}/>
            <div style={{width: "80%"}}>
                {
                    tab === 1 &&
                    <Users/>
                }
            </div>
        </div>
    );
};

export default Admin;
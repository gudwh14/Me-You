import Main from "../pages/Main";
import Meeting from "../pages/Meeting";
import BlindDate from "../pages/BlindDate";
import CreateMeeting from "../pages/CreateMeeting";
import Inform from "../pages/Inform";
import MeetingInform from "../pages/MeetingInform";
import SetProfile from "../pages/SetProfile";
import ChatMenu from "../pages/ChatMenu";
import BlindInform from "../pages/BlindInform";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import NotFound from "../pages/NotFound";

const homeRoute = [
    {
        path : "/home",
        component : Main,
        exact : true
    },
    {
        path : "/home/meeting",
        component : Meeting,
        exact : false
    },
    {
        path : "/home/blind",
        component : BlindDate,
        exact : false
    },
    {
        path : "/home/createMeeting",
        component : CreateMeeting,
        exact : false
    },
    {
        path : "/home/inform",
        component : Inform,
        exact: false
    },
    {
        path : "/home/meetingInform/:meetingID",
        component : MeetingInform,
        exact: false
    },
    {
        path: "/home/blindInform/:blindMemberID",
        component : BlindInform,
        exact: false
    },
    {
        path : "/home/setProfile",
        component : SetProfile,
        exact: false
    },
    {
        path: "/home/chatMenu",
        component : ChatMenu,
        exact: false
    },
    {
        path: "/login",
        component : Login,
        exact: false
    },
    {
        path : "/home/profile/:profileMemberID",
        component : Profile,
        exact: false
    },
    {
        component : NotFound,
        exact: false
    }
]

export default homeRoute;
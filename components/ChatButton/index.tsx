import { useRouter } from "next/router";
import navbarStyles from "../Navbar/Navbar.module.css"

const ChatButton = () => {
    const router = useRouter();
    return (
        <div onClick={() => router.push("/view_application/messages")} className={navbarStyles.chatButtonContainer}> 
            {/* <div className={navbarStyles.newMessagesDot}></div> */}
            <img className={navbarStyles.chatImage} src="/icons/chat.svg" />
        </div>
    );
}

export default ChatButton;
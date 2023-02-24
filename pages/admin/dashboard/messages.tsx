import { useContext, useEffect, useRef, useState } from "react";
import DashboardNavContainer from "../../../components/Admin/DashboardNav";
import ChatBox from "../../../components/Chatbox";
import { AdminContext } from "../../../components/Context/AdminContext";
import LottieAnimation from "../../../components/Lottie";
import Message from "../../../components/Message";
import SearchInput from "../../../components/SearchInput";
import styles from "../../../styles/MessagePage.module.css";
import client from "../../api/Services/AxiosClient";
import Loader from "../../../components/Lottie/loader.json";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import TimeAgo from "react-timeago";
import { useCookies } from "react-cookie";

const MessagePage = () => {
    const [cookies, setCookie, removeCookie] = useCookies(["admin"]);
  const { chatBoxes, fetchChatboxes, selectedChatbox, setSelectedChatbox } =
    useContext(AdminContext);
  const [selectedChatBoxObject, setSelectedChatboxObject] = useState<any>({});
  const [messageContent, setMessageContent] = useState("");
  const [messageLoading, setMessageLoading] = useState(false);
  const messagesContainer = useRef<HTMLDivElement>(null);
  const [searchValue, setSearchValue] = useState("");
  const messageBottom = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { user_id } = router.query;

  useEffect(() => {
    if (!router.isReady) return;
    if (
      user_id &&
      chatBoxes.find((chatBox: any) => chatBox.applicant._id == user_id)
        ?.length !== 0
    )
      setSelectedChatbox(user_id);
  }, [router.isReady]);

  useEffect(() => {
    setSelectedChatboxObject(
      chatBoxes.find((chatBox: any) => chatBox.applicant._id == selectedChatbox)
    );
  }, [selectedChatbox, chatBoxes]);

  useEffect(() => {
    console.log(messageBottom);
  }, [selectedChatbox]);

  const sendMessage = async () => {
    if (messageContent)
      try {
        setMessageLoading(true);
        const payload = { content: messageContent, from: "admin" };
        const { data } = await client.post(
          `/messages/send_message/${selectedChatbox}`,
          payload
        );
        setMessageContent("");
        fetchChatboxes();
        // console.log(messageBottom.current);
        // console.log(data);
      } catch (error) {
        alert("Something went wrong while sending the message!");
      } finally {
        setMessageLoading(false);
      }
    };
    
    useEffect(() => {
      setTimeout(() => messageBottom.current?.scrollIntoView({behavior: "smooth"}), 50)
      // messageBottom.current?.scrollIntoView({behavior: "smooth"})
      
  }, [chatBoxes, selectedChatbox])

  useEffect(() => {
    fetchChatboxes();
  }, []);

  useEffect(() => {
    if (!cookies.admin) router.push("/admin")
  })
  return (
    <DashboardNavContainer selectedNav="Messages">
      <div className={styles.pageContainer}>
        <section className={styles.dashboardSection}>
          <h1 className={styles.dashboardHeader}>Messages</h1>
          <section className={styles.searchInputSection}>
            <div className={styles.searchInputContainer}>
              <SearchInput
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                placeholder="Search For Applicants . . . "
              />
            </div>
          </section>
          <div className={styles.chatSection}>
            {chatBoxes
              .filter((chatbox: any) =>
                [
                  chatbox.applicant.contactDetails.firstName.toLowerCase(),
                  chatbox.applicant.contactDetails.lastName.toLowerCase(),
                  chatbox.applicant._id.toLowerCase(),
                ].some((item) => item.includes(searchValue.toLowerCase()))
              )
              .map((chatbox: any, index: any) => (
                <ChatBox
                  profilePicUrl={chatbox.applicant.documents.profilePicture.secure_url}
                  setSelectedChatbox={setSelectedChatbox}
                  lastMessage={
                    chatbox.messages.length
                      ? chatbox.messages[chatbox.messages.length - 1]?.content
                      : ""
                  }
                  lastMessageFrom={
                    chatbox.messages.length
                      ? chatbox.messages[chatbox.messages.length - 1]?.from
                      : ""
                  }
                  createdAt={
                    chatbox.messages.length
                      ? chatbox.messages[chatbox.messages.length - 1]?.createdAt
                      : ""
                  }
                  fetchChatboxes={fetchChatboxes}
                  unreadCount={
                    chatbox.messages
                      .filter((message: any) => message.from == "applicant")
                      .filter(
                        (message: any) => message.status.applicant == "unread"
                      ).length
                  }
                  selected={selectedChatbox == chatbox.applicant._id}
                  id={chatbox.applicant._id}
                  name={`${chatbox.applicant?.contactDetails?.firstName} ${chatbox.applicant?.contactDetails?.lastName}`}
                  key={index}
                />
              ))}
          </div>
        </section>
        <AnimatePresence>
          {selectedChatbox && (
            <>
              <section className={styles.messageSection}>
                <div className={styles.messageSectionHeader}>
                  <div className={styles.recipientDetails}>
                    <div className={styles.headerProfileImage}>
                      <img src="https://v3.traincdn.com/genfiles/cms/pg/412/images/1f1073e2eb3241e8bf0cbd5088b8d2ae.svg" />
                    </div>
                    <div>
                      <p
                        className={styles.recipientName}
                      >{`${selectedChatBoxObject?.applicant?.contactDetails?.firstName} ${selectedChatBoxObject?.applicant?.contactDetails?.lastName}`}</p>
                      <p className={styles.recipientId}>
                        ID: {selectedChatBoxObject?.applicant?._id}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      router.push(
                        `/admin/dashboard?applicantId=${selectedChatbox}`
                      )
                    }
                    className={styles.viewApplicationButton}
                  >
                    View Application
                  </button>
                </div>
                <div
                  ref={messagesContainer}
                  className={styles.messagesContainer}
                >
                  {" "}
                  {selectedChatBoxObject?.messages?.map(
                    (message: any, index: number) => (
                      <Message
                        content={message.content}
                        // profilePic={selectedChatBoxObject?.applicant?.documents?.profilePicture}
                        layoutId={index}
                        adminSide
                        from={message.from}
                        name={
                          message.from == "admin"
                            ? "You"
                            : `${selectedChatBoxObject?.applicant?.contactDetails?.firstName} ${selectedChatBoxObject?.applicant?.contactDetails?.lastName}`
                        }
                        createdAt={message.createdAt}
                      />
                    )
                  )}
                  <div ref={messageBottom}></div>
                </div>
                <div className={styles.sendMessageContainer}>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      sendMessage();
                    }}
                    className={styles.messageInputGroup}
                  >
                    <input
                      value={messageContent}
                      onChange={(e: any) => setMessageContent(e.target.value)}
                      className={styles.messageInput}
                      placeholder="Type something . . ."
                    />
                    <button className={styles.messageButton}>
                      {!messageLoading && (
                        <>
                          <p>Send</p>
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clip-path="url(#clip0_282_611)">
                              <path
                                d="M15.894 0.627955C15.8941 0.618295 15.8941 0.608987 15.894 0.599328C15.8933 0.575794 15.891 0.552612 15.8873 0.529429C15.8861 0.522228 15.8857 0.515203 15.8841 0.508003C15.8782 0.479025 15.8697 0.450573 15.8588 0.423C15.8557 0.414922 15.8516 0.40737 15.8481 0.399467C15.8388 0.378567 15.8283 0.35837 15.8162 0.3387C15.8113 0.330622 15.8063 0.322543 15.8009 0.314464C15.783 0.288647 15.7637 0.263884 15.741 0.241228C15.7182 0.218397 15.6931 0.198903 15.6671 0.180813C15.6597 0.17572 15.6521 0.170978 15.6444 0.166412C15.6237 0.153592 15.6024 0.142527 15.5805 0.132868C15.5736 0.129882 15.5671 0.12637 15.5601 0.12356C15.5318 0.112495 15.5027 0.103714 15.4728 0.0977428C15.4674 0.096689 15.4618 0.0963378 15.4563 0.095284C15.4314 0.091069 15.4063 0.0886103 15.381 0.0880834C15.3725 0.0879078 15.3643 0.0879078 15.356 0.0880834C15.3313 0.0886103 15.3065 0.091069 15.2817 0.095284C15.2756 0.0963378 15.2696 0.096689 15.2635 0.0979184C15.2364 0.103363 15.2097 0.110739 15.1834 0.120574L0.429666 5.6568C0.232264 5.73091 0.0980863 5.9155 0.0884269 6.12625C0.0789432 6.33682 0.195909 6.53299 0.38576 6.62467L6.43692 9.54496L9.35704 15.5961C9.44538 15.7789 9.63031 15.8942 9.83175 15.8942C9.83983 15.8942 9.84773 15.894 9.85581 15.8936C10.0664 15.884 10.2511 15.7498 10.3253 15.5524L15.8617 0.798838C15.8715 0.77267 15.8787 0.74615 15.8841 0.71928C15.8855 0.712079 15.8861 0.705054 15.8871 0.697853C15.891 0.674671 15.8933 0.651313 15.894 0.627955ZM13.2749 1.96218L6.72389 8.51317L1.95286 6.2109L13.2749 1.96218ZM9.77116 14.0292L7.46889 9.25834L14.0201 2.70718L9.77116 14.0292Z"
                                fill="white"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_282_611">
                                <rect width="16" height="16" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                        </>
                      )}
                      {messageLoading && (
                        <LottieAnimation
                          animationData={Loader}
                          width={40}
                          height={40}
                        />
                      )}
                    </button>
                  </form>
                </div>
              </section>
            </>
          )}
          {!selectedChatbox && (
            <section className={styles.preview}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                Select a chat to start messaging
              </motion.div>
            </section>
          )}
        </AnimatePresence>
      </div>
    </DashboardNavContainer>
  );
};

export default MessagePage;

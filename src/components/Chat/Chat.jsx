import { useEffect } from 'react';
import { useChat } from 'context';
import { getChats, ChatEngine } from 'react-chat-engine';
import { LeftRail, ChatToolbar, ChatInput, MessageList } from 'components';
/*
CREATED BY BISWARUP BHATTACHARJEE
EMAIL    : bbiswa471@gmail.com
PHONE NO : 6290272740
*/
export const Chat = () => {
  const {
    myChats,
    setMyChats,
    chatConfig,
    selectedChat,
    selectChatClick,
    setSelectedChat,
  } = useChat();

  useEffect(() => {
    console.log('My Chats: ', myChats);
  }, [myChats]);

  useEffect(() => {
    console.log('Selected Chat: ', selectedChat);
  }, [selectedChat]);

  return (
    <>
      {!!chatConfig && (
        <ChatEngine
          hideUI={true}
          userName={chatConfig.userName}
          projectID={chatConfig.projectID}
          userSecret={chatConfig.userSecret}
          onConnect={() => {
            getChats(chatConfig, setMyChats);
          }}
          onNewChat={chat => {
            if (chat.admin.username === chatConfig.userName) {
              selectChatClick(chat);
            }
            setMyChats([...myChats, chat].sort((a, b) => a.id - b.id));
          }}
          onDeleteChat={chat => {
            if (selectedChat?.id === chat.id) {
              setSelectedChat(null);
            }
            setMyChats(
              myChats.filter(c => c.id !== chat.id).sort((a, b) => a.id - b.id),
            );
          }}
          onNewMessage={(chatId, message) => {
            if (selectedChat && chatId === selectedChat.id) {
              setSelectedChat({
                ...selectedChat,
                messages: [...selectedChat.messages, message],
              });
            }
            const chatThatMessageBelongsTo = myChats.find(c => c.id === chatId);
            const filteredChats = myChats.filter(c => c.id !== chatId);
            const updatedChat = {
              ...chatThatMessageBelongsTo,
              last_message: message,
            };
            setMyChats(
              [updatedChat, ...filteredChats].sort((a, b) => a.id - b.id),
            );
          }}
        />
      )}

      <div className="chat-container">
        <LeftRail />
        <div className="current-chat">
          {selectedChat ? (
            <div className="chat">
              <ChatToolbar />
              <MessageList />
              <ChatInput />
            </div>
          ) : (
            <div className="no-chat-selected">
              <img
                  src="https://image.emojipng.com/680/653680.jpg"
                className="point-left"
                alt="point-left"
              />
              ALL Chats
            </div>
          )}
        </div>
      </div>
    </>
  );
};

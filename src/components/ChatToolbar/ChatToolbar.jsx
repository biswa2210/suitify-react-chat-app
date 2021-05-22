import { useState } from 'react';
import { useChat } from 'context';
import { joinUsernames } from 'helpers';
import { Icon } from 'semantic-ui-react';
import { SearchUsers } from 'components';
/*
CREATED BY BISWARUP BHATTACHARJEE
EMAIL    : bbiswa471@gmail.com
PHONE NO : 6290272740
*/

export const ChatToolbar = () => {
  const { selectedChat, chatConfig } = useChat();
  const [searching, setSearching] = useState(false);

  return (
    <>
      <div className="chat-toolbar">
        <div className="chat-header-text">
          {joinUsernames(selectedChat.people, chatConfig.userName).slice(
            0,
            100,
          )}
        </div>

        <div className="add-user-icon">
          <Icon
            color="black"
            name="user plus"
            size='big'
            onClick={() => setSearching(true)}
          />
        </div>
      </div>

      <SearchUsers closeFn={() => setSearching(false)} visible={searching} />
    </>
  );
};

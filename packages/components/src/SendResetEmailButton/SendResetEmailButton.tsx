

/*
 *  @TODO
 *  Make a button to send a new welcome email to the provided user,
 *  use the necessary Auth checks to make sure the current user is 
 *  allowed to make this request.
 *  Take into account which system (validig/other) is using the button 
 *  if necessary.
 *  Add a confirmation dialog for when pressing the button.
 * */
import React from "react";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';

import I18n from "@vocollege/app/dist/modules/Services/I18n";

export interface SendResetEmailButtonProps {
  userId: any;
  onClick?: (userId: any) => void;
}

const SendResetEmailButton: React.FC<SendResetEmailButtonProps> = (props) => {
  const { userId, onClick } = props;
  const label = I18n.get.user.labels.sendResetEmail;

  const handleClick = () => {
    if (onClick) {
      onClick(userId);
    }
  };

  return (
    <Tooltip title={label} >
      <IconButton
        size="large"
        onClick={handleClick}
        sx={(theme: any) => ({
          "&:hover": {
            color: "primary.main",
          },
        })}
        >
        <ForwardToInboxIcon/>
      </IconButton>
    </Tooltip>
  );
};

export default SendResetEmailButton;

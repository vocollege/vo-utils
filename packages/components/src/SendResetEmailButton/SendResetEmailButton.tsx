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
import { useConfirm } from "material-ui-confirm";
import { ApolloClient, useMutation } from "@apollo/client";
import { toast } from "react-toastify";

import I18n from "@vocollege/app/dist/modules/Services/I18n";
import { SEND_RESET_EMAIL_TO_USER } from "@vocollege/app/dist/modules/VoApi/mutations/users";
import VoAuth from "@vocollege/app/dist/modules/VoAuth";

export interface SendResetEmailButtonProps {
  userId: any;
  client?: ApolloClient<object>;
  onClick?: (userId: any) => void;
}

const SendResetEmailButton: React.FC<SendResetEmailButtonProps> = (props) => {
  const { 
    userId, 
    onClick,
    client
  } = props;

  const confirm = useConfirm();

  const label = I18n.get.user.labels.sendResetEmail;

  const handleClick = () => {
    confirm({
      description: I18n.trans(
        I18n.get.user.labels.confirmResetEmail, 
        {uid: userId},
      ),
    }).then(()=>{
      if (onClick) {
        onClick(userId);
      }
      sendReset({ variables: {id: userId}});
    }).catch(()=>{});
  };

  const getToastAutoCloseTime = (message: string) => {
    let time = Math.round(message.length / 6) * 1000;
    if (time > 20000) {
      return 20000;
    }
    return time > 4000 ? time : 4000;
  };

  const [sendReset, { loading }] = useMutation(
    SEND_RESET_EMAIL_TO_USER,
    {
      client: client || undefined,
      onError: (error: any) => {
       toast.error(error.message, { autoClose: getToastAutoCloseTime(error.message)}); 
      },
      onCompleted: (data: any) => {
        const message = I18n.get.user.messages.resetEmailSent;
        toast.success(message, { autoClose: getToastAutoCloseTime(message)});
      },
    }
  );
  if (VoAuth.ability.cannot("create", "Users")) {
    return (<></>);
  }
  return (
    <Tooltip title={label} >
      <IconButton
        size="large"
        onClick={handleClick}
        sx={(theme: any) => ({
          "&:hover": {
            color: loading ? "grey.500" :"primary.main",
          },
        })}
        disabled={loading}
        >
        <ForwardToInboxIcon/>
      </IconButton>
    </Tooltip>
  );
};

export default SendResetEmailButton;

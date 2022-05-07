import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useMutation, useQuery } from "@apollo/client";

// Custom.
import I18n from "@vocollege/app/dist/modules/Services/I18n";
import EditDialog from "../../EditDialog";
import { AccountDialogProps } from "./global";
import { useStyles } from "./styles";
import AccountForm from "./AccountForm";
import VoAuth from "@vocollege/app/dist/modules/VoAuth";
import VoApi from "@vocollege/app/dist/modules/VoApi";
import { GeneralObject } from "@vocollege/app/dist/global";
import {
  GET_ACCOUNT,
  UPDATE_USER,
} from "@vocollege/app/dist/modules/VoApi/graphql";
import VoLoader from "../../VoLoader";
import { getError } from "@vocollege/app/dist/modules/VoHelpers";

const AccountDialog: React.FC<AccountDialogProps> = (props) => {
  const { open, onChange, onCancel, client } = props;
  const classes = useStyles();
  const [formState, setFormState] = useState<GeneralObject | null>(null);
  const [formData, setFormData] = useState<GeneralObject | null>(null);

  const handleSave = async () => {
    try {
      const variables: { [key: string]: any } = {
        id: VoAuth.currentUser.id,
        input: { ...formData },
      };
      await update({
        variables,
      });
    } catch (error: any) {
      toast.error(error.message, { autoClose: false });
    }
  };

  const isLoading = () => {
    return loading || updateLoading;
  };

  // Api.

  const { loading, called, data, refetch } = useQuery(GET_ACCOUNT, {
    fetchPolicy: "network-only",
    client: client || undefined,
    variables: {
      id: VoAuth.currentUser && VoAuth.currentUser.id,
    },
  });

  const [update, { loading: updateLoading }] = useMutation(UPDATE_USER, {
    client: client || undefined,
    onError: (error) => {
      let parsedError = getError(error);
      console.error(parsedError);
      let messages = [];
      if (parsedError.fields) {
        Object.keys(parsedError.fields).map((field: string) => {
          if (parsedError?.fields) {
            messages.push(parsedError.fields[field]);
          }
        });
      }
      if (parsedError.message) {
        messages.push(parsedError.message);
      }
      toast.error(messages.join(", "), { autoClose: false });
    },
    onCompleted: () => {
      onChange && onChange("updated");
      toast.success(I18n.get.user.messages.accountUpdated);
    },
  });

  // Effects.

  useEffect(() => {
    if (open) {
      refetch();
    }
  }, [open]);

  return (
    <EditDialog
      className={classes.root}
      open={open}
      title={I18n.get.misc.myAccount}
      saveDisabled={!formState?.isDirty || !formState?.isValid}
      onConfirm={handleSave}
      onCancel={onCancel}
      loading={isLoading()}
      //   dialogProps={{ hideBackdrop: true, open }}
      //   draggable
    >
      {isLoading() && <VoLoader />}
      {!loading && (
        <AccountForm
          onChange={(state) => setFormData(state)}
          onFormStateChange={(formState) => setFormState(formState)}
          initialData={data?.user}
          settings={data?.userSettings}
          client={client}
        />
      )}
    </EditDialog>
  );
};

export default AccountDialog;

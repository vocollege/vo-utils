import { ApolloClient } from "@apollo/client";

// Custom.
import { GeneralObject } from "@vocollege/app/dist/global";

export interface AccountDialogProps {
  open: boolean;
  onChange?: (action: string) => void;
  onCancel?: () => void;
  client?: ApolloClient<object>;
}

export interface AccountFormProps {
  onChange?: (state: any) => void;
  onFormStateChange?: (formState: any) => void;
  initialData?: GeneralObject;
  settings?: GeneralObject;
  client?: ApolloClient<object>;
}

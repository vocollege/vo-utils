import { DrawerProps } from "@mui/material/Drawer";
import { ApolloClient, DocumentNode } from "@apollo/client";
import { GeneralObject } from "@vocollege/app";

// Custom.

export interface HelpProps extends DrawerProps {
  settingName?: string;
  category?: string;
  operation?: DocumentNode;
  variables?: GeneralObject;
  client?: ApolloClient<object>;
  enlargeImages?: boolean;
  onLoadData?: (data: any) => void;
}

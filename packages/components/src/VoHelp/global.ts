import { DrawerProps } from "@mui/material/Drawer";
import { ApolloClient, DocumentNode } from "@apollo/client";

// Custom.

export interface HelpProps extends DrawerProps {
  settingName?: string;
  category?: string;
  operation?: DocumentNode;
  client?: ApolloClient<object>;
  enlargeImages?: boolean;
}

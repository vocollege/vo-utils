import { gql } from "@apollo/client";

// Queries.
export * from "./queries/applications";
export * from "./queries/articles";
export * from "./queries/acl";
export * from "./queries/books";
export * from "./queries/cards";
export * from "./queries/events";
export * from "./queries/help";
export * from "./queries/navigation";
export * from "./queries/pages";
export * from "./queries/queues";
export * from "./queries/users";
export * from "./queries/vodocs";
export * from "./queries/vogroups";
export * from "./queries/settings";
export * from "./queries/search";
export * from "./queries/sections";

// Mutations.
export * from "./mutations/users";
export * from "./mutations/acl";
export * from "./mutations/applications";
export * from "./mutations/articles";
export * from "./mutations/books";
export * from "./mutations/cards";
export * from "./mutations/events";
export * from "./mutations/navigation";
export * from "./mutations/pages";
export * from "./mutations/queues";
export * from "./mutations/settings";
export * from "./mutations/sections";
export * from "./mutations/vodocs";
export * from "./mutations/vogroups";

export const fakeMutation = gql`
  mutation fake {
    id
  }
`;

export const fakeQuery = gql`
  query fake {
    id
  }
`;

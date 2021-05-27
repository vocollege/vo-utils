import { gql } from "@apollo/client";

export const GET_QUEUE = gql`
  query Queue($id: ID!) {
    queue(id: $id) {
      id
      title
      status
      body
      url
      author
      template
      tags {
        id
        label
      }
      items {
        ... on Article {
          id
          title
          type
        }
        ... on Page {
          id
          title
          type
        }
        ... on Section {
          id
          title
          type
        }
        ... on User {
          id
          name
          type
        }
        ... on Event {
          id
          title
          type
        }
      }
      created_at
      updated_at
    }
  }
`;

// export const SEARCH_QUEUEABLE_ITEMS = gql`
//   query searchQueueableItems($search: String) {
//     searchQueueableItems(search: $search) {
//       ... on Article {
//         id
//         title
//       }
//       ... on Page {
//         id
//         title
//       }
//     }
//   }
// `;

export const GET_QUEUES = gql`
  query Queues(
    $search: String
    $page: Int
    $limit: Int
    $orderBy: [GetQueuesOrderByOrderByClause]
  ) {
    queues(search: $search, page: $page, limit: $limit, orderBy: $orderBy) {
      paginatorInfo {
        total
        currentPage
        hasMorePages
      }
      data {
        id
        title
        status
        items {
          ... on Article {
            id
          }
          ... on Page {
            id
          }
          ... on User {
            id
          }
          ... on Event {
            id
          }
        }
        created_at
        updated_at
      }
    }
  }
`;

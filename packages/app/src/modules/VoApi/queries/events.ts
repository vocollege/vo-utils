import { gql } from "@apollo/client";

export const GET_EVENT = gql`
  query Event($id: ID!) {
    event(id: $id) {
      id
      title
      body
      status
      author {
        ... on User {
          id
          name
          type
        }
      }
      allday
      start_date
      start_time
      end_date
      end_time
      location
      tags {
        id
        label
      }
      attachments {
        id
        title
        filename
        filesize
        filetype
        url
        type
      }
      created_at
      updated_at
    }
  }
`;

export const GET_EVENTS = gql`
  query Events(
    $search: String
    $start_date: Date
    $end_date: Date
    $page: Int
    $limit: Int
    $orderBy: [GetEventsOrderByClause]
    $filters: [GetEventsFilter]
  ) {
    events(
      search: $search
      start_date: $start_date
      end_date: $end_date
      page: $page
      limit: $limit
      orderBy: $orderBy
      filters: $filters
    ) {
      paginatorInfo {
        total
        currentPage
        hasMorePages
      }
      data {
        id
        title
        status
        allday
        start_date
        start_time
        author {
          ... on User {
            id
            name
            type
          }
        }
        created_at
        updated_at
      }
    }
  }
`;

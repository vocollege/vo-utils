import { gql } from "@apollo/client";

export const GET_MENU = gql`
  query Menu($name: String!) {
    menu(name: $name) {
      name
      title
      description
      links {
        id
        title
        parent_id
        position
        urlAlias {
          id
          usage_id
          usage_type
          alias
        }
      }
    }
  }
`;

export const GET_MENUS = gql`
  query Menus(
    $search: String
    $page: Int
    $limit: Int
    $orderBy: [GetMenusOrderByClause]
  ) {
    menus(search: $search, page: $page, limit: $limit, orderBy: $orderBy) {
      paginatorInfo {
        total
        currentPage
        hasMorePages
      }
      data {
        name
        title
        description
        links {
          id
        }
      }
    }
  }
`;

export const GET_MENU_LINK = gql`
  query MenuLink($id: ID!) {
    menuLink(id: $id) {
      id
      menu_name
      parent
      url
    }
  }
`;

export const GET_MENU_LINKS = gql`
  query MenuLinks(
    $search: String
    $page: Int
    $limit: Int
    $orderBy: [GetMenusOrderByClause]
  ) {
    menuLinks(search: $search, page: $page, limit: $limit, orderBy: $orderBy) {
      paginatorInfo {
        total
        currentPage
        hasMorePages
      }
      data {
        id
        menu_name
        url
      }
    }
  }
`;

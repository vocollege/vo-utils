import { gql } from "@apollo/client";

export const GET_EDUCATIONS_FIELDS = gql`
  fragment EducationsFields on Education {
    id
    status
    title
    code
    created_at
    updated_at
  }
`;
export const GET_EDUCATION = gql`
  query Education($id: ID!) {
    education(id: $id) {
      ...EducationsFields
    }
  }
  ${GET_EDUCATIONS_FIELDS}
`;

export const GET_EDUCATIONS = gql`
  query Educations(
    $search: String
    $page: Int
    $limit: Int
    $orderBy: [GetEducationsOrderByClause]
  ) {
    educations(search: $search, page: $page, limit: $limit, orderBy: $orderBy) {
      paginatorInfo {
        total
        currentPage
        hasMorePages
      }
      data {
        ...EducationsFields
      }
    }
  }
  ${GET_EDUCATIONS_FIELDS}
`;

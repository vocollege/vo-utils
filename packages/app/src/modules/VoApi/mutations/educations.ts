import { gql } from "@apollo/client";

import { GET_EDUCATIONS_FIELDS } from "../queries/educations";

export const CREATE_EDUCATION = gql`
  mutation CreateEducation($input: UpdateEducationInput!) {
    createEducation(input: $input) {
      ...EducationsFields
    }
  }
  ${GET_EDUCATIONS_FIELDS}
`;

export const UPDATE_EDUCATION = gql`
  mutation UpdateEducation($id: ID!, $input: UpdateEducationInput!) {
    updateEducation(id: $id, input: $input) {
      ...EducationsFields
    }
  }
  ${GET_EDUCATIONS_FIELDS}
`;

export const DELETE_EDUCATION = gql`
  mutation DeleteEducation($id: ID!) {
    deleteEducation(id: $id) {
      id
    }
  }
`;

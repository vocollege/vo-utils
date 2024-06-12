import { gql } from "@apollo/client";

export const GET_GROUP_FIELDS = gql`
  fragment GroupFields on Group {
    id
    name
    title
    category
    educator_type
    employer_type
    certified
    created_at
  }
`;

export const GET_GENERAL_STATISTICS = gql`
  query GeneralStatistics($filters: StatisticsFilters) {
    statistics(filters: $filters) {
      regions {
        ...GroupFields
      }
      localColleges {
        ...GroupFields
      }
      employers {
        ...GroupFields
      }
      educators {
        ...GroupFields
      }
      educations {
        id
        title
        total_usages
        # groups {
        #   id
        #   title
        #   educator_type
        #   educations {
        #     id
        #     title
        #     pivot {
        #       education_id
        #       education_usage_id
        #       education_usage_type
        #       field
        #       certified
        #     }
        #   }
        # }
      }
      # educatorsGymVO {
      #   ...GroupFields
      # }
      # educatorsGymBF {
      #   ...GroupFields
      # }
      # educatorsVuxVO {
      #   ...GroupFields
      # }
      # educatorsVuxBF {
      #   ...GroupFields
      # }
      # educatorsFolkhogskolor {
      #   ...GroupFields
      # }
      # educatorsYrkeshogskolor {
      #   ...GroupFields
      # }
    }
  }
  ${GET_GROUP_FIELDS}
`;

export const GET_CERTIFICATIONS_STATISTICS = gql`
  query CertificationsStatistics($filters: StatisticsFilters) {
    statistics(filters: $filters) {
      certifiedRegions {
        id
        name
        title
        certified
        created_at
        # groups {
        #   id
        #   title
        #   certified
        #   groups {
        #     id
        #     title
        #     certified
        #   }
        # }
      }
      certifiedLocalColleges {
        id
        name
        title
        certified
        created_at
        parentGroups {
          id
          name
          title
          certified
        }
      }
      certifiedEducators {
        id
        name
        title
        certified
        created_at
        parentGroups {
          id
          name
          title
          certified
          parentGroups {
            id
            title
            certified
          }
        }
      }
      certifiedEducations {
        education_id
        education_certified
        education_title
        educator_id
        educator_title
        educator_certified
        local_college_id
        local_college_title
        local_college_certified
        region_id
        region_title
        region_certified
        # groups {
        #   id
        #   name
        #   title
        #   certified
        #   created_at
        #   parentGroups {
        #     id
        #     name
        #     title
        #     parentGroups {
        #       id
        #       name
        #       title
        #     }
        #   }
        #   pivot {
        #     education_id
        #     education_usage_id
        #     education_usage_type
        #     field
        #     certified
        #   }
        # }
      }
      # certifications {
      #   # id
      #   # name
      #   # title
      #   # certified
      #   # created_at
      #   # parentGroups {
      #   #   id
      #   #   title
      #   #   certified
      #   #   parentGroups {
      #   #     id
      #   #     title
      #   #     certified
      #   #   }
      #   # }
      #   # educations {
      #   id
      #   title
      #   # pivot {
      #   #   education_id
      #   #   education_usage_id
      #   #   education_usage_type
      #   #   field
      #   #   certified
      #   # }
      #   groups {
      #     id
      #     name
      #     title
      #     certified
      #     created_at
      #     parentGroups {
      #       id
      #       title
      #       certified
      #       parentGroups {
      #         id
      #         title
      #         certified
      #       }
      #     }
      #     pivot {
      #       education_id
      #       education_usage_id
      #       education_usage_type
      #       field
      #       certified
      #     }
      #   }
      #   # }
      # }
    }
  }
`;

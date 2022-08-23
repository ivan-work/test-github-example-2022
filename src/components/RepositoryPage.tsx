import React from "react";
import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import { Repository, Issue } from "@octokit/graphql-schema";
import isObject from "../util/isObject";
import NewIssue from "./NewIssue";

const query = gql`
  query getRepo($name: String!, $owner: String!) {
    repository(name: $name, owner: $owner ) {
      id
      name
      nameWithOwner
      issues (first: 10, orderBy: {field: CREATED_AT, direction: DESC}) {
        edges {
          node {
            id
            title
          }
        }
      }
    }
  }
`


export default () => {
  const { userLogin, repoName } = useParams();

  const { data, error, refetch } = useQuery<{ repository: Repository }>(query, {
    variables: { owner: userLogin, name: repoName },
    skip: !userLogin || !repoName
  });

  const repo = data?.repository;
  const issues: Issue[] = (repo?.issues?.edges || []).map((edge) => edge?.node).filter(isObject);

  return (
    <div className='RepositoryPage'>
      <div>Repository: {repo?.nameWithOwner}</div>
      <NewIssue repositoryId={repo?.id} onCreate={refetch}/>
      <div>
        Issues:
        {/*// Sometimes github api returns old data, without newly created issue =/*/}
        <button onClick={() => refetch()}>Refresh</button>
      </div>
      <ul>
        {issues.map(issue => {
          return (<li key={issue.id}>{issue.title}</li>);
        })}
      </ul>
    </div>
  )
}
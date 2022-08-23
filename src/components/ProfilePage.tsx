import React from "react";
import { gql, useQuery } from "@apollo/client";
import { Repository, User } from "@octokit/graphql-schema";
import isObject from "../util/isObject";
import { Link, Outlet, useParams } from "react-router-dom";

// Normally I used to store them in separate files and run the whole codegen
const query = gql`
  query getUser($login: String!) {
    user(login: $login) {
      login
      name
      repositories(first: 10, orderBy: {field: CREATED_AT, direction: DESC}, privacy: PUBLIC) {
        edges {
          node {
            id
            name
          }
        }
      }
    }
  }
`

export default () => {
  const { userLogin, repoName } = useParams();
  const { data, error } = useQuery<{ user: User }>(query, { variables: { login: userLogin }, skip: !userLogin });
  const user = data?.user;
  const repos: Repository[] = (user?.repositories?.edges || []).map((edge) => edge?.node).filter(isObject);

  if (error) {
    return <div className='Profile'>
      {error?.message}
    </div>
  }

  return <div className='ProfilePage'>
    <div>User login: {user?.login}</div>
    <div>User name: {user?.name}</div>
    <div>User repos:</div>
    <ul>
      {repos.map(repo => {
        return (
          <li key={repo.id}>
            <Link
              to={`/${userLogin}/${repo.name}`}
              className={`${repoName === repo.name ? 'selected' : ''}`}
            >
              {repo.name}
            </Link>
          </li>
        );
      })}
    </ul>
    <Outlet/>
  </div>
}
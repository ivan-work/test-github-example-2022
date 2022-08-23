import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";

interface NewIssueProps {
  repositoryId: string | undefined;
  onCreate?: () => void;
}

const createNewIssueMutation = gql`
  mutation createIssue($repositoryId: ID!, $title: String!) {
    createIssue(input: {repositoryId: $repositoryId, title: $title}) {
      issue {
        id
        title
      }
    }
  }
`

export default ({ repositoryId, onCreate }: NewIssueProps) => {
  const [issueTitle, setIssueTitle] = useState('');
  const [errorInfo, setErrorInfo] = useState('');

  const [createIssue, { data, loading, error }] = useMutation(createNewIssueMutation)

  const handleCreate = () => {
    if (issueTitle && repositoryId) {
      return createIssue({
        variables: {
          repositoryId: repositoryId,
          title: issueTitle
        }
      })
        .then(() => {
          setErrorInfo('');
          setIssueTitle('');
          onCreate?.();
        })
        .catch((e) => {
          setErrorInfo(e?.message ?? 'Error');
        });
    }
  }

  return (
    <div className='NewIssue flex-inline'>
      <button className='m-1 btn-create' disabled={!issueTitle} onClick={handleCreate}>Create new issue:</button>
      <input className='m-1' value={issueTitle} onChange={e => setIssueTitle(e.target.value)}/>
      {loading && <span className='m-1 loading'>loading</span>}
      {errorInfo && <span className='m-1 error' onClick={() => setErrorInfo('')}>{errorInfo}</span>}
    </div>
  )
}
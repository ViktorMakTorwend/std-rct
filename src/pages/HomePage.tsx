import React, { useEffect, useState } from "react";
import { useLazyGetUserReposQuery, useSearchUsersQuery } from "../store/gitHub/github.api";
import { useDebounce } from "../hooks/debounse";
import { RepoCard } from "../components/RepoCard";

export function HomePage() {
  const [search, setSearch] = useState('');
  const [dropdown, setDropdown] = useState(false);
  const debounced = useDebounce(search);
  const { isLoading, isError, data } = useSearchUsersQuery(debounced, {
    skip: debounced.length < 3,
    refetchOnFocus: true
  });
  const [fetchRepos, { isLoading: areReposLoading, data: repos }] = useLazyGetUserReposQuery()

  useEffect(() => {
    setDropdown(debounced.length > 3 && data?.length! > 0)
  }, [debounced])

  const clickHandler = (username: string) => {
    fetchRepos(username);
    setDropdown(false);
  }

  return (
    <div className="flex justify-center pt-10 mx-auto h-screen w-screen">
      {isError && <p className="text-center text-red-600">Something went</p>}

      <div className="relative w-[560px]">
        <input
          type="text"
          className="border py-2 px-4 w-full h-[42px] mb-2"
          placeholder="Search for Github user name..."
          value={search}
          onChange={e => setSearch(e.target.value)}>
        </input>

        {dropdown && <ul className="absolute top-[42px] left-0 right-0 max-h-[200px] overflow-y-scroll shadow-md bg-white list-none">
          {isLoading && <p className="text-center">Loading...</p>}
          {data?.map(user => (
            <li
              key={user.id}
              onClick={() => clickHandler(user.login)}
              className="py-2 hover:bg-gray-500 hover:text-white transition-colors cursor-pointer"
            >{user.login}
            </li>
          ))}
          <div className="container">
            {areReposLoading && <p className="text-center">Repos is loading</p>}
            {repos?.map(repo => <RepoCard repo={repo} key={repo.id}></RepoCard>)}
          </div>
        </ul>}
      </div>
    </div>
  )
}
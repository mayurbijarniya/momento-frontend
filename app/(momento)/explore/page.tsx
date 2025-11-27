"use client";

import GridPostList from "@/components/shared/GridPostList";
import Loader from "@/components/shared/Loader";
import SearchResults from "@/components/shared/SearchResults";
import ExternalSearchResults from "@/components/shared/ExternalSearchResults";
import { Input } from "@/components/ui/input";
import useDebounce from "@/hooks/useDebounce";
import {
  useGetPosts,
  useSearchPosts,
  useSearchExternal,
} from "@/lib/react-query/queriesAndMutation";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

type SearchType = "local" | "external";

const Explore = () => {
  const [ref, InView] = useInView();
  const { data: posts, fetchNextPage, hasNextPage } = useGetPosts();
  const [searchValue, setsearchValue] = useState("");
  const [searchType, setSearchType] = useState<SearchType>("local");

  const debouncedValue = useDebounce(searchValue, 500); // used in searchbox so that searchPosts() is not called after every keystroke instead after a certain miliseconds
  const { data: searchedPosts, isFetching: isSearchFetching } =
    useSearchPosts(debouncedValue);
  const { data: searchedPhotos, isFetching: isExternalSearchFetching } =
    useSearchExternal(debouncedValue, 1);

  useEffect(() => {
    if (InView && !searchValue && hasNextPage && searchType === "local") {
      fetchNextPage();
    }
  }, [InView, searchValue, hasNextPage, fetchNextPage, searchType]);

  if (!posts) {
    return (
      <div className="flex-center w-full h-screen">
        <Loader />
      </div>
    );
  }

  const shouldShowSearchResults = searchValue !== "";
  const shouldShowPosts =
    !shouldShowSearchResults &&
    posts.pages.every((item) => item?.documents.length === 0); // 2nd condition means we have posts

  return (
    <div className="explore-container">
      <div className="explore-inner_container">
        <h2 className="h3-bold md:h2-bold w-full">Search</h2>
        <div className="flex gap-1 px-4 w-full rounded-lg bg-dark-2">
          <img
            src="/assets/icons/search.svg"
            alt="search"
            width={24}
            height={24}
          />
          <Input
            type="text"
            placeholder="Search posts or photos..."
            className="explore-search"
            value={searchValue}
            onChange={(e) => {
              setsearchValue(e.target.value);
            }}
          />
        </div>
      </div>

      {/* Search Type Tabs */}
      {shouldShowSearchResults && (
        <div className="flex gap-2 mt-4 mb-4">
          <button
            onClick={() => setSearchType("local")}
            className={`px-4 py-2 rounded-lg transition ${
              searchType === "local"
                ? "bg-white text-black"
                : "bg-dark-4 text-light-2 hover:bg-dark-3"
            }`}
          >
            <p className="small-medium md:base-medium">Local Posts</p>
          </button>
          <button
            onClick={() => setSearchType("external")}
            className={`px-4 py-2 rounded-lg transition ${
              searchType === "external"
                ? "bg-white text-black"
                : "bg-dark-4 text-light-2 hover:bg-dark-3"
            }`}
          >
            <p className="small-medium md:base-medium">External Photos</p>
          </button>
        </div>
      )}

      <div className="flex-between w-full max-w-5xl mt-16 mb-7">
        <h3 className="body-bold md:h3-bold">
          {shouldShowSearchResults
            ? searchType === "local"
              ? "Search Results - Posts"
              : "Search Results - Photos"
            : "Popular today"}
        </h3>

        {!shouldShowSearchResults && (
          <div className="flex-center gap-3 bg-dark-3 rounded-xl px-4 py-2 cursor-pointer">
            <p className="small-medium md:base-medium text-light-2">All</p>
            <img
              src="/assets/icons/filter.svg"
              width={20}
              height={20}
              alt="filter"
            />
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-9 w-full max-w-5xl">
        {shouldShowSearchResults ? (
          searchType === "local" ? (
            <SearchResults
              isSearchFetching={isSearchFetching}
              searchedPosts={searchedPosts}
            />
          ) : (
            <ExternalSearchResults
              isSearchFetching={isExternalSearchFetching}
              searchedPhotos={searchedPhotos}
            />
          )
        ) : shouldShowPosts ? (
          <p className="text-light-1 mt-10 text-center w-full">End of Posts</p>
        ) : (
          <>
            {posts.pages.map((item, index) => {
              return (
                <GridPostList key={`page-${index}`} posts={item.documents} />
              );
            })}
          </>
        )}
      </div>
      {hasNextPage && !searchValue && searchType === "local" && (
        <div ref={ref} className="mt-5">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default Explore;

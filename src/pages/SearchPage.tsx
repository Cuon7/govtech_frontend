import React, { useState, useCallback } from "react";
import SearchBar from "../components/SearchBar";
import SearchResults from "../components/SearchResults";
import { ApiService } from "../services/api.service";

const SearchPage: React.FC = () => {
  const [results, setResults] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [resultCount, setResultCount] = useState(0);
  const [currentQuery, setCurrentQuery] = useState("");

  const fetchResults = useCallback((query: string) => {
    setCurrentQuery(query);
    ApiService.getQueryResult()
      .then((res) => {
        setResults(res.data.ResultItems);
        setTotalResults(res.data.TotalNumberOfResults);
        setResultCount(res.data.ResultItems.length);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-top bg-gray-100">
      <h1 className="mb-12"></h1>
      <SearchBar onSearch={fetchResults} />
      {totalResults > 0 && (
        <div className="text-lg text-gray-700 my-4 text-center">
          Showing 1-{resultCount} of {totalResults} results
        </div>
      )}
      <SearchResults results={results} query={currentQuery} />
    </div>
  );
};

export default SearchPage;

import React, { useState } from "react";
import axios from "axios";
import SearchBar from "../components/SearchBar";
import SearchResults from "../components/SearchResults";

const SearchPage: React.FC = () => {
    const [results, setResults] = useState([]);
    const [totalResults, setTotalResults] = useState(0);
    const [resultCount, setResultCount] = useState(0);

    const fetchResults = (query: string) => {
        axios
            .get(
                "https://gist.githubusercontent.com/yuhong90/b5544baebde4bfe9fe2d12e8e5502cbf/raw/44deafab00fc808ed7fa0e59a8bc959d255b9785/queryResult.json"
            )
            .then((res) => {
                setResults(res.data.ResultItems);
                setTotalResults(res.data.TotalNumberOfResults);
                setResultCount(res.data.ResultItems.length);
            })
            .catch((err) => console.error(err));
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-top bg-gray-100">
            <h1 className="text-3xl font-bold mb-12"></h1>
            <SearchBar onSearch={fetchResults} />
            {totalResults > 0 && (
                <div className="text-lg text-gray-700 my-4 text-center">
                    Showing 1-{resultCount} of {totalResults} results
                </div>
            )}

            <SearchResults results={results} />
        </div>
    );
};

export default SearchPage;

import React, { useState, useEffect, useCallback } from "react";
import { ApiService } from "../services/api.service";

interface SearchBarProps {
    onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [selectedSuggestion, setSelectedSuggestion] = useState(false);
    const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (query.length > 2 && !selectedSuggestion) {
            setLoading(true);
            const timer = setTimeout(() => {
                ApiService.getSuggestions()
                    .then((res) => {
                        setSuggestions(res.data.suggestions);
                        setShowSuggestions(true);
                        setActiveSuggestionIndex(-1);
                        setLoading(false);
                    })
                    .catch((err) => {
                        console.error(err);
                        setLoading(false);
                    });
            }, 1000);

            return () => clearTimeout(timer);
        } else {
            setShowSuggestions(false);
        }
    }, [query, selectedSuggestion]);

    const handleSelectSuggestion = useCallback((suggestion: string) => {
        setQuery(suggestion);
        setSelectedSuggestion(true);
        setShowSuggestions(false);
        setActiveSuggestionIndex(-1);
        onSearch(suggestion);
    }, [onSearch]);

    const resetValue = useCallback(() => {
        setQuery("");
        setSelectedSuggestion(false);
        setShowSuggestions(false);
        setActiveSuggestionIndex(-1);
    }, []);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "ArrowDown") {
            setActiveSuggestionIndex((prev) =>
                Math.min(prev + 1, suggestions.length - 1)
            );
        } else if (e.key === "ArrowUp") {
            setActiveSuggestionIndex((prev) => Math.max(prev - 1, 0));
        } else if (e.key === "Enter") {
            if (activeSuggestionIndex >= 0) {
                handleSelectSuggestion(suggestions[activeSuggestionIndex]);
            } else {
                onSearch(query);
                setShowSuggestions(false);
                setActiveSuggestionIndex(-1);
            }
        }
    };

    return (
        <div className="flex flex-col items-center w-full">
            <div className="relative flex w-full max-w-screen-lg">
                <input
                    type="text"
                    className="w-full px-6 py-4 text-xl border border-gray-300 rounded-l-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Search..."
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setSelectedSuggestion(false);
                    }}
                    onKeyDown={handleKeyDown}
                />
                {query && (
                    <button
                        className="absolute right-48 top-1/2 transform -translate-y-1/2 px-3 py-1 text-gray-600"
                        onClick={resetValue}
                    >
                        ✖
                    </button>
                )}
                <button
                    onClick={() => {
                        onSearch(query);
                        setShowSuggestions(false);
                        setActiveSuggestionIndex(-1);
                    }}
                    className="px-10 py-4 text-xl bg-blue-500 text-white shadow-md hover:bg-blue-600 transition flex items-center justify-center gap-2 rounded-tr-lg rounded-br-lg"
                >
                    <span className="text-2xl">🔍</span>
                    <span>Search</span>
                </button>
            </div>

            {loading && (
                <div className="flex items-center justify-center mt-2">
                    <svg
                        className="animate-spin h-8 w-8 text-blue-500"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        ></circle>
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v8H4z"
                        ></path>
                    </svg>
                </div>
            )}


            {showSuggestions && suggestions.length > 0 && (
                <ul className="relative mt-2 bg-white border border-gray-200 rounded-lg shadow-lg w-full max-w-screen-lg">
                    {suggestions.map((suggestion, index) => (
                        <li
                            key={index}
                            className={`p-2 cursor-pointer ${activeSuggestionIndex === index ? "bg-gray-200" : ""
                                }`}
                            onClick={() => handleSelectSuggestion(suggestion)}
                        >
                            {suggestion}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default React.memo(SearchBar);

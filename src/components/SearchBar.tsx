import React, { useState, useEffect } from "react";
import axios from "axios";

interface SearchBarProps {
    onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [selectedSuggestion, setSelectedSuggestion] = useState(false);

    useEffect(() => {
        if (query.length > 2 && !selectedSuggestion) {
            axios
                .get(
                    "https://gist.githubusercontent.com/yuhong90/b5544baebde4bfe9fe2d12e8e5502cbf/raw/e026dab444155edf2f52122aefbb80347c68de86/suggestion.json"
                )
                .then((res) => {
                    setSuggestions(res.data.suggestions);
                    setShowSuggestions(true);
                })
                .catch((err) => console.error(err));
        } else {
            setShowSuggestions(false);
        }
    }, [query]);

    const handleSelectSuggestion = (suggestion: string) => {
        setQuery(suggestion);
        setSelectedSuggestion(true);
        setShowSuggestions(false);
        onSearch(suggestion);
    };

    const resetValue = () => {
        setQuery("");
        setSelectedSuggestion(false);
    }

    return (
        <div className="flex flex-col items-center w-full">
            <div className="relative flex w-full max-w-screen-lg">
                <input
                    type="text"
                    className="w-full px-6 py-4 text-xl border border-gray-300 rounded-l-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Search..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                {query && (
                    <button
                        className="absolute right-36 top-1/2 transform -translate-y-1/2 px-3 py-1 text-gray-600"
                        onClick={() => resetValue()}
                    >
                        ✖
                    </button>
                )}
                <button
                    onClick={() => onSearch(query)}
                    className="px-10 py-4 text-xl bg-blue-500 text-white shadow-md hover:bg-blue-600 transition flex items-center justify-center gap-2"
                >
                    <span className="text-2xl">🔍</span>
                    <span>Search</span>
                </button>

            </div>

            {showSuggestions && (
                <ul className="relative mt-2 bg-white border border-gray-200 rounded-lg shadow-lg w-full max-w-screen-lg">
                    {suggestions.map((suggestion, index) => (
                        <li
                            key={index}
                            className="p-2 hover:bg-gray-200 cursor-pointer"
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

export default SearchBar;

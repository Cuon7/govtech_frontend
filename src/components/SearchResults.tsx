import React from "react";

interface ResultItem {
  DocumentId: string;
  DocumentTitle: { Text: string };
  DocumentExcerpt: { Text: string };
  DocumentURI: string;
}

interface SearchResultsProps {
  results: ResultItem[];
  query: string;
}

const highlightText = (text: string, query: string) => {
  if (!query) return text;
  const regex = new RegExp(`(${query})`, "gi");
  const parts = text.split(regex);
  return parts.map((part, i) =>
    regex.test(part) ? <mark key={i}>{part}</mark> : part
  );
};

const SearchResults: React.FC<SearchResultsProps> = ({ results, query }) => {
  return (
    <div className="w-full max-w-2xl mx-auto mt-6">
      {results.map((item) => (
        <div key={item.DocumentId} className="p-4 border-b">
          <a
            href={item.DocumentURI}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline font-semibold text-lg"
          >
            {highlightText(item.DocumentTitle.Text, query)}
          </a>
          <p className="text-gray-600">
            {highlightText(item.DocumentExcerpt.Text, query)}
          </p>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;

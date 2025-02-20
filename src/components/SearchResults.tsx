import React from "react";

interface ResultItem {
  DocumentId: string;
  DocumentTitle: { Text: string };
  DocumentExcerpt: { Text: string };
  DocumentURI: string;
}

interface SearchResultsProps {
  results: ResultItem[];
}

const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
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
            {item.DocumentTitle.Text}
          </a>
          <p className="text-gray-600">{item.DocumentExcerpt.Text}</p>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;

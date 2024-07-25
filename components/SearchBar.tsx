"use client";
import React, { useState } from 'react';

const SearchBar = ({ onSearch }: { onSearch: (query: string) => void }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <div>
      <input 
        type="text" 
        placeholder="Search..." 
        value={searchTerm} 
        onChange={handleInputChange} 
      />
      <button type="button" className="search-button" onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;


// "use client";

// import React, { useState } from 'react';

// interface SearchBarProps {
//   onSearch: (query: string) => void;
// }

// const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
//   const [query, setQuery] = useState('');

//   const handleSearch = (e: React.FormEvent) => {
//     e.preventDefault();
//     onSearch(query);
//   };

//   return (
//     <form onSubmit={handleSearch} className="search-bar">
//       <input
//         type="text"
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//         placeholder="Search posts..."
//         className="search-input"
//       />
//       <button type="submit" className="search-button">Search</button>
//     </form>
//   );
// };

// export default SearchBar;
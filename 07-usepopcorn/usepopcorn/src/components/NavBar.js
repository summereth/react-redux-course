import SearchBar from "./SearchBar";

export default function NavBar() {
  const logo = (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );

  const searchResult = (
    <p className="num-results">
      Found <strong>X</strong> results
    </p>
  );

  return (
    <nav className="nav-bar">
      {logo}
      <SearchBar />
      {searchResult}
    </nav>
  );
}

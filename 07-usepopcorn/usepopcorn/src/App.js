import NavBar from "./components/NavBar";
import SearchResultBox from "./components/SearchResultBox";
import WatchedMovieBox from "./components/WatchedMovieBox";

export const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App() {
  return (
    <>
      <NavBar />
      <Main />
    </>
  );
}

function Main() {
  return (
    <main className="main">
      <SearchResultBox />
      <WatchedMovieBox />
    </main>
  );
}

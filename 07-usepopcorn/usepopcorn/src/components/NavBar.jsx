export default function NavBar({ children }) {
  const logo = (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );

  return (
    <nav className="nav-bar">
      {logo}
      {children}
    </nav>
  );
}

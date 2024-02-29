const NavSearchResult = ({ resultNum }) => {
  return (
    <p className="num-results">
      Found <strong>{resultNum}</strong> results
    </p>
  );
};

export default NavSearchResult;

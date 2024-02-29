export default function ExpandButton({ isOpen, onClickButton }) {
  return (
    <button
      className="btn-toggle"
      onClick={() => onClickButton((open) => !open)}
    >
      {isOpen ? "–" : "+"}
    </button>
  );
}

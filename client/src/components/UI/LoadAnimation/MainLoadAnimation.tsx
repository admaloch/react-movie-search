import "./MainLoadAnimation.css";

export default function MainLoadAnimation(): JSX.Element {
  return (
    <div className="loader ">
      <div className="dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className="loading">Loading</div>
    </div>
  );
}

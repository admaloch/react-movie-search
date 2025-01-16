import "./MainBtn.css";
interface MainBtnProps {
  children: String;
}

export default function MainBtn({ children }: MainBtnProps) {
  let ariaLabelText = children as string;
  return (
    <button aria-label={ariaLabelText} className="main-btn">
      {children}
    </button>
  );
}

import './MainBtn.css'
interface MainBtnProps {
    children: String;
}

export default function MainBtn({children}: MainBtnProps) {
  return (
    <button className="main-btn">
        {children}
    </button>
  )
}

import ModalBtns from './ModalBtns'
import ResultInfo from './ResultInfo'

export default function ModalContent({ open, item }) {
// console.log(item)
  const year = new Date(item.Released).getFullYear()
  const searchLink = `https://www.google.com/search?q=${item.Title}+${year}`

  return (
    <div className="result-info-container">
      <ResultInfo
        item={item}
        year={year}
      />
      <ModalBtns
        item={item}
        searchLink={searchLink}
      />
    </div>
  )
}

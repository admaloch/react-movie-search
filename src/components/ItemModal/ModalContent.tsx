import SearchBtn from './SearchBtn'
import ResultInfo from './ResultInfo'
import APIItem from "../../models/ItemApiProps"

interface ModalContentProps {
    item: APIItem;
}
export default function ModalContent({  item }) {
// console.log(item)
  const year = new Date(item.Released).getFullYear()
  const searchLink = `https://www.google.com/search?q=${item.Title}+${year}`

  return (
    <div className="result-info-container">
      <ResultInfo
        item={item}
        year={year}
      />
      <SearchBtn
        type={item.Type}
        searchLink={searchLink}
      />
    </div>
  )
}

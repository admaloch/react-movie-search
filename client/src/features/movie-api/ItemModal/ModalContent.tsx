import SearchBtn from './SearchBtn'
import ResultInfo from './ResultInfo'
import { ModalContentProps } from '../../../models/ListItemProps'
import React from 'react'
import UpdateLikedList from '../../users/update-liked-list/UpdateLikedList'
import NewReview from '../../reviews/NewReview'
import DeleteReview from '../../reviews/DeleteReview'
import UpdateHasWatched from '../../users/update-liked-list/UpdateHasWatched'

export default function ModalContent({ item }: ModalContentProps): React.JSX.Element {

  const year = new Date(item.Released).getFullYear()
  const searchLink = `https://www.google.com/search?q=${item.Title}+${year}`

  return (
    <div className="result-info-container">
      <ResultInfo
        item={item}
        year={year}
      />
      <div className="results-icons">
        <SearchBtn
          type={item.Type}
          searchLink={searchLink}
        />
        <UpdateLikedList
          title={item.Title}
          imdbId={item.imdbID}
          size={30}
        />
        <UpdateHasWatched
          imdbId={item.imdbID}
          size={30}
        />
        <NewReview
          size={30}
          imdbId={item.imdbID}
          title={item.Title} />
      </div>

    </div>
  )
}

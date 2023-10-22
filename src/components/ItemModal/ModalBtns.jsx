export default function ModalBtns({ closeModal, searchLink }) {
  return (
    <div className="modal-buttons">
        <button onClick={closeModal}  >Return to Search
        </button>
        <a
          href={searchLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div>Search</div>
        </a>
      </div>
  )
}

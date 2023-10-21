export default function ModalBtns({ setIsModalOpen, searchLink }) {
  return (
    <div className="modal-buttons">
        <button onClick={() => setIsModalOpen(false)}  >Return to Search
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

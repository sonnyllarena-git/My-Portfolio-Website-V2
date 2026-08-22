import chatIcon from './assets/icons/chat icon.png'

function BlogChatButton({ onClick, isOpen }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isOpen ? 'Minimize chat' : 'Open chat'}
      className="h-[50px] w-[50px] shrink-0 cursor-pointer overflow-hidden rounded-full shadow-lg transition hover:scale-105"
    >
      <img src={chatIcon} alt="" className="h-full w-full object-cover" />
    </button>
  )
}

export default BlogChatButton

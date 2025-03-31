import { useState, useEffect } from "react"
import BirthdayMessage from "../components/birthday-message"
import BookCube from "../components/book-cube"
import BookModal from "../components/book-modal"
import Confetti from "../components/confetti"
import "./globals.css"

export default function Home() {
  const [showMessage, setShowMessage] = useState(false)
  const [selectedBook, setSelectedBook] = useState(null)
  const [showConfetti, setShowConfetti] = useState(false)

  const books = [
    {
      id: 1,
      title: "The Housemaid",
      volume: "Volume 1",
      author: "Freida McFadden",
      description:
        "Every day I clean the Winchesters' beautiful house top to bottom. I collect their daughter from school. And I cook a delicious meal for the whole family before heading up to eat alone in my tiny room on the top floor. I try to ignore how Nina makes a mess just to watch me clean it up. How she tells strange lies about her own daughter. And how her husband Andrew seems more broken every day. But as I look into Andrew's handsome but haunted eyes, I think I understand what he's going through. I know what it's like to be trapped in your own home. To love a family that isn't yours. To want something you can never have...",
      image: "/images/housemaid-1.jpg",
    },
    {
      id: 2,
      title: "The Housemaid's Secret",
      volume: "Volume 2",
      author: "Freida McFadden",
      description:
        "I can't believe I'm working for her. A woman who drove my sister to suicide. She doesn't know who I am. She just needs a housemaid, and I need a job. But I have other reasons to be here. I've been watching her for months. I know her daily routine, her weekly schedule, her habits and preferences. I've learned that she's arrogant, demanding, and rude. That she has a secret lover. That she's having an affair with my new employer. She doesn't know that I'm the sister of the woman she destroyed. Or that I know all her secrets. But she's about to find out...",
      image: "/images/housemaid-2.jpg",
    },
    {
      id: 3,
      title: "The Housemaid Is Watching",
      volume: "Volume 3",
      author: "Freida McFadden",
      description:
        "I'm Millie, the housemaid. I know all your secrets. I see everything that happens in this house. I know you sneak out at night. I know you're lying to your husband. I know you swear you're alone when I hear voices. I know you said your last housemaid left for a better job. But I saw the way you watched her. The way you followed her. The way you scared her. You didn't know I was watching. But I saw what you did. And now I'm the housemaid. And I'm watching you...",
      image: "/images/housemaid-3.jpg",
    },
  ]

  useEffect(() => {
    const hasShownMessage = localStorage.getItem("hasShownMessage")
  
    if (!hasShownMessage) {
      const timer = setTimeout(() => {
        setShowMessage(true)
        setShowConfetti(true)
        localStorage.setItem("hasShownMessage", "true") // Store that message has been shown
      }, 1000)
  
      return () => clearTimeout(timer)
    } else {
      setShowMessage(true)
      setShowConfetti(true)
    }
  }, [])  

  const handleBookClick = (book) => {
    setSelectedBook(book)
  }

  const handleCloseModal = () => {
    setSelectedBook(null)
  }

  return (
    <main className="birthday-container">
      {showConfetti && <Confetti />}
      <div className="doodle-border"></div>
      <div className="content">
        <h1 className="birthday-title">Happy Birthday, Naina!</h1>
        <div className="balloon-container">
          {[...Array(5)].map((_, i) => (
            <div key={i} className={`balloon balloon-${i + 1}`}></div>
          ))}
        </div>
        <BirthdayMessage show={showMessage} />
        <h2 className="gift-title">Your Gift</h2>
        <p className="gift-subtitle">I didn't know what to give you, so I just asked you what you like, you remember me asking?</p>
        <div className="book-cube-container">
          <BookCube books={books} onBookClick={handleBookClick} />
        </div>
        {selectedBook && <BookModal book={selectedBook} onClose={handleCloseModal} />}
      </div>
      <div className="doodle-corner top-left"></div>
      <div className="doodle-corner top-right"></div>
      <div className="doodle-corner bottom-left"></div>
      <div className="doodle-corner bottom-right"></div>
    </main>
  )
}


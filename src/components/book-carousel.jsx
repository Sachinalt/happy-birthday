import { useState, useRef, useEffect } from "react"
import styles from "./book-carousel.module.css"

export default function BookCarousel({ books, onBookClick }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const carouselRef = useRef(null)

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex === 0 ? books.length - 1 : prevIndex - 1))
  }

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex === books.length - 1 ? 0 : prevIndex + 1))
  }

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext()
    }, 5000)

    return () => clearInterval(interval)
  }, [activeIndex])

  return (
    <div className={styles.carouselContainer}>
      <button className={`${styles.carouselButton} ${styles.prevButton}`} onClick={handlePrev}>
        ←
      </button>

      <div className={styles.carouselTrack} ref={carouselRef}>
        {books.map((book, index) => (
          <div
            key={book.id}
            className={`${styles.carouselCard} ${index === activeIndex ? styles.active : ""}`}
            onClick={() => onBookClick(book)}
            style={{
              transform: `rotateY(${(index - activeIndex) * 45}deg) translateZ(${index === activeIndex ? 0 : -100}px)`,
              opacity: index === activeIndex ? 1 : 0.7,
              zIndex: books.length - Math.abs(index - activeIndex),
            }}
          >
            <div className={styles.bookCover}>
              <img src={book.image || "/placeholder.svg"} alt={book.title} />
              <div className={styles.bookInfo}>
                <h3>{book.title}</h3>
                <p className={styles.volume}>{book.volume}</p>
                <p className={styles.author}>by {book.author}</p>
                <button className={styles.viewButton}>View Details</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className={`${styles.carouselButton} ${styles.nextButton}`} onClick={handleNext}>
        →
      </button>

      <div className={styles.carouselDots}>
        {books.map((_, index) => (
          <span
            key={index}
            className={`${styles.dot} ${index === activeIndex ? styles.activeDot : ""}`}
            onClick={() => setActiveIndex(index)}
          ></span>
        ))}
      </div>
    </div>
  )
}

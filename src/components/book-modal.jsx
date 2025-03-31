"use client"

import { useEffect, useRef } from "react"
import styles from "./book-modal.module.css"

export default function BookModal({ book, onClose }) {
  const modalRef = useRef(null)

  useEffect(() => {
    // Close modal when clicking outside
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose()
      }
    }

    // Close modal when pressing Escape key
    function handleEscKey(event) {
      if (event.key === "Escape") {
        onClose()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("keydown", handleEscKey)

    // Prevent scrolling when modal is open
    document.body.style.overflow = "hidden"

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleEscKey)
      document.body.style.overflow = "auto"
    }
  }, [onClose])

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal} ref={modalRef}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>
        <div className={styles.modalContent}>
          <div className={styles.modalImage}>
            <img src={book.image || "/placeholder.svg"} alt={book.title} />
          </div>
          <div className={styles.modalInfo}>
            <h2>{book.title}</h2>
            <p className={styles.volume}>{book.volume}</p>
            <p className={styles.author}>by {book.author}</p>
            <div className={styles.divider}></div>
            <p className={styles.description}>{book.description}</p>
            <div className={styles.bookmarkContainer}>
              <div className={styles.bookmark}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


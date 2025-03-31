import { useState, useRef, useEffect } from "react"
import styles from "./book-cube.module.css"

export default function BookCube({ books, onBookClick }) {
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [currentFace, setCurrentFace] = useState(0)
  const cubeRef = useRef(null)
  const startX = useRef(null)
  const startY = useRef(null)
  const isDragging = useRef(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  const rotateToCubeFace = (faceIndex) => {
    setCurrentFace(faceIndex)

    switch (faceIndex) {
      case 0:
        setRotateX(0)
        setRotateY(0)
        break
      case 1:
        setRotateX(0)
        setRotateY(-90)
        break
      case 2: 
        setRotateX(0)
        setRotateY(-180)
        break
      case 3:
        setRotateX(0)
        setRotateY(90)
        break
      case 4:
        setRotateX(-90)
        setRotateY(0)
        break
      case 5:
        setRotateX(90)
        setRotateY(0)
        break
      default:
        setRotateX(0)
        setRotateY(0)
    }
  }

  const handleMouseDown = (e) => {
    if (isMobile) return;

    isDragging.current = true
    startX.current = e.clientX
    startY.current = e.clientY
    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)
  }

  const handleTouchStart = (e) => {
    isDragging.current = true
    startX.current = e.touches[0].clientX
    startY.current = e.touches[0].clientY
    document.addEventListener("touchmove", handleTouchMove)
    document.addEventListener("touchend", handleTouchEnd)
  }

  const handleMouseMove = (e) => {
    if (!isDragging.current) return

    const deltaX = e.clientX - startX.current
    const deltaY = e.clientY - startY.current

    setRotateY(rotateY + deltaX * 0.5)
    setRotateX(rotateX - deltaY * 0.5)

    startX.current = e.clientX
    startY.current = e.clientY
  }

  const handleTouchMove = (e) => {
    if (!isDragging.current) return

    const deltaX = e.touches[0].clientX - startX.current
    const deltaY = e.touches[0].clientY - startY.current

    setRotateY(rotateY + deltaX * 0.5)
    setRotateX(rotateX - deltaY * 0.5)

    startX.current = e.touches[0].clientX
    startY.current = e.touches[0].clientY
  }

  const handleMouseUp = () => {
    isDragging.current = false
    document.removeEventListener("mousemove", handleMouseMove)
    document.removeEventListener("mouseup", handleMouseUp)
    snapToNearestFace()
  }

  const handleTouchEnd = () => {
    isDragging.current = false
    document.removeEventListener("touchmove", handleTouchMove)
    document.removeEventListener("touchend", handleTouchEnd)
    snapToNearestFace()
  }

  const handleWheel = (e) => {
    e.preventDefault()
    const deltaY = e.deltaY

    setRotateY(rotateY - deltaY * 0.1)

    if (window.wheelTimeout) {
      clearTimeout(window.wheelTimeout)
    }

    window.wheelTimeout = setTimeout(() => {
      snapToNearestFace()
    }, 150)
  }

  const snapToNearestFace = () => {
    let normalizedY = rotateY % 360
    if (normalizedY < 0) normalizedY += 360

    let normalizedX = rotateX % 360
    if (normalizedX < 0) normalizedX += 360

    if (normalizedX > 45 && normalizedX < 135) {
      rotateToCubeFace(5)
    } else if (normalizedX > 225 && normalizedX < 315) {
      rotateToCubeFace(4)
    } else {
      if (normalizedY > 315 || normalizedY < 45) {
        rotateToCubeFace(0)
      } else if (normalizedY >= 45 && normalizedY < 135) {
        rotateToCubeFace(3)
      } else if (normalizedY >= 135 && normalizedY < 225) {
        rotateToCubeFace(2)
      } else {
        rotateToCubeFace(1)
      }
    }
  }

  useEffect(() => {
    const cube = cubeRef.current
    if (cube) {
      cube.addEventListener("wheel", handleWheel, { passive: false })
    }

    return () => {
      if (cube) {
        cube.removeEventListener("wheel", handleWheel)
      }
      if (window.wheelTimeout) {
        clearTimeout(window.wheelTimeout)
      }
    }
  }, [rotateX, rotateY])

  useEffect(() => {
    let rotationInterval

    rotationInterval = setInterval(() => {
      setRotateY((prev) => prev - 0.5)
    }, 30)

    const stopTimeout = setTimeout(() => {
      clearInterval(rotationInterval)
      snapToNearestFace()
    }, 5000)

    return () => {
      clearInterval(rotationInterval)
      clearTimeout(stopTimeout)
    }
  }, [])

  return (
    <div className={styles.cubeWrapper}>

      <div className={styles.scene} ref={cubeRef} onMouseDown={handleMouseDown} onTouchStart={handleTouchStart}>
        <div
          className={styles.cube}
          style={{
            transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          }}
        >
          <div className={`${styles.cubeFace} ${styles.cubeFaceFront}`} onClick={() => onBookClick(books[0])}>
            <div className={styles.bookCover}>
              <img src={books[0].image || "/placeholder.svg"} alt={books[0].title} />
              <div className={styles.bookInfo}>
                <h3>{books[0].title}</h3>
                <p className={styles.volume}>{books[0].volume}</p>
                <p className={styles.author}>by {books[0].author}</p>
                <button className={styles.viewButton}>View Details</button>
              </div>
            </div>
          </div>

          <div className={`${styles.cubeFace} ${styles.cubeFaceRight}`} onClick={() => onBookClick(books[1])}>
            <div className={styles.bookCover}>
              <img src={books[1].image || "/placeholder.svg"} alt={books[1].title} />
              <div className={styles.bookInfo}>
                <h3>{books[1].title}</h3>
                <p className={styles.volume}>{books[1].volume}</p>
                <p className={styles.author}>by {books[1].author}</p>
                <button className={styles.viewButton}>View Details</button>
              </div>
            </div>
          </div>

          <div className={`${styles.cubeFace} ${styles.cubeFaceBack}`} onClick={() => onBookClick(books[2])}>
            <div className={styles.bookCover}>
              <img src={books[2].image || "/placeholder.svg"} alt={books[2].title} />
              <div className={styles.bookInfo}>
                <h3>{books[2].title}</h3>
                <p className={styles.volume}>{books[2].volume}</p>
                <p className={styles.author}>by {books[2].author}</p>
                <button className={styles.viewButton}>View Details</button>
              </div>
            </div>
          </div>

          <div className={`${styles.cubeFace} ${styles.cubeFaceTop}`}>
            <div className={styles.giftBox}>
              <div className={styles.giftBoxTop}>
                <div className={styles.giftBoxRibbon}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.cubeControls}>
        <button onClick={() => rotateToCubeFace(0)} className={currentFace === 0 ? styles.activeButton : ""}>
          Book 1
        </button>
        <button onClick={() => rotateToCubeFace(1)} className={currentFace === 1 ? styles.activeButton : ""}>
          Book 2
        </button>
        <button onClick={() => rotateToCubeFace(2)} className={currentFace === 2 ? styles.activeButton : ""}>
          Book 3
        </button>
      </div>
    </div>
  )
}


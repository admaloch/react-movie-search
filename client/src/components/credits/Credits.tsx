import MoodIcon from '@mui/icons-material/Mood'; // Import the happy face icon


import './Credits.css';
export default function Credits() {
  return (
    <main className='main-item-content'>
      <section className="credits-section">
      <MoodIcon sx={{ fontSize: 100 }} /> {/* Happy face icon */}

         <h1>A special thanks to the artists who took the photos and created the icons used in this app</h1>
      <ul>
        <li><a href="https://www.flaticon.com/free-icons/brain" title="brain icons">Brain icons created by Freepik - Flaticon</a></li>
    </ul>
      </section>
     
    </main>
  )
}

import { useCallback, useEffect, useState } from 'react';
import LoadingScreen from './components/LoadingScreen.jsx';
import Cursor from './components/Cursor.jsx';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Story from './components/Story.jsx';
import Timeline from './components/Timeline.jsx';
import Invitation from './components/Invitation.jsx';
import EventDetails from './components/EventDetails.jsx';
import Countdown from './components/Countdown.jsx';
import Footer from './components/Footer.jsx';
import MusicPlayer from './components/MusicPlayer.jsx';
import { useParallax } from './hooks/useParallax.js';
import { useScrollLock } from './hooks/useScrollLock.js';

export default function App() {
  const [loaded, setLoaded] = useState(false);
  useScrollLock(!loaded);
  useParallax(loaded);

  // Always open at the top (browsers restore scroll positions otherwise).
  useEffect(() => {
    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
  }, []);

  const enter = useCallback(() => {
    document.getElementById('story')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return (
    <>
      <LoadingScreen onDone={() => setLoaded(true)} />
      <Cursor />
      <Navbar visible={loaded} />
      <main className={`site ${loaded ? 'is-ready' : ''}`}>
        <Hero ready={loaded} onEnter={enter} />
        <Story />
        <Timeline />
        <Invitation />
        <EventDetails />
        <Countdown />
      </main>
      <Footer />
      <MusicPlayer visible={loaded} />
    </>
  );
}

import InfoTglMerah from './components/InfoTglMerah'
import TodaysHeader from './components/TodaysHeader'
import Footer from './components/Footer'

function Home() {
  // get today's date
  const todaysDate = new Date()
  const dateOptions = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }

  return (
    <div className="h-screen flex flex-col justify-between px-4 md:px-6 lg:px-8 py-2 md:py-3 lg:py-4 bg-ivory">
      <TodaysHeader todaysDate={todaysDate} dateOptions={dateOptions} />
      <InfoTglMerah todaysDate={todaysDate} dateOptions={dateOptions} />
      <Footer />
    </div>
  )
}

export default Home
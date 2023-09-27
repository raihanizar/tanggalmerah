function TodaysHeader({ todaysDate, dateOptions }) {
  let dateOptionsOverride = { weekday: 'long', 
                              day: 'numeric',  
                              month: 'long', 
                              year: 'numeric',
                              hour: 'numeric',
                              minute: 'numeric',
                              second: 'numeric' }
  const todayIDDateString = todaysDate.toLocaleDateString('id-ID', dateOptionsOverride)

  return (
    <div className="flex flex-row justify-center items-center">
      <p className="text-left lg:text-center text-xs font-bold text-black">Hari Ini: <span className="text-darkivory">{todayIDDateString}</span></p>
    </div>
  )
}

export default TodaysHeader
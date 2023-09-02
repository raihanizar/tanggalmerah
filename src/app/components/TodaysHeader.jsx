function TodaysHeader({ todaysDate, dateOptions }) {
  const todayIDDateString = todaysDate.toLocaleDateString('id-ID', dateOptions)

  return (
    <div className="flex flex-row justify-center items-center">
      <p className="text-left lg:text-center text-xs font-bold text-black">Hari Ini: <span className="text-darkivory">{todayIDDateString}</span></p>
    </div>
  )
}

export default TodaysHeader
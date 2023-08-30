import Link from 'next/link'

export default async function Home() {
  // get today's date
  const todayDate = new Date()
  const dateOptions = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }
  const todayIDDateString = todayDate.toLocaleDateString('id-ID', dateOptions)

  // get nearest tanggal merah
  const merah = await getMerah(todayDate, dateOptions)

  return (
    <div className="h-screen flex flex-col justify-between px-4 md:px-6 lg:px-8 py-2 md:py-3 lg:py-4 bg-ivory">
      <div className="flex flex-row justify-center items-center">
        <p className="text-left lg:text-center text-xs font-bold text-black">Hari Ini: <span className="text-darkivory">{todayIDDateString}</span></p>
      </div>
      <div className="flex flex-col justify-between items-center">
        <div className="flex flex-col justify-between items-center">
          <h1 className="text-center text-md md:text-lg lg:text-xl mb-2 md:mb-3 lg:mb-4 font-bold text-black">Jadi, kapan tanggal merah terdekat?</h1>
          <p className="text-center text-3xl md:text-4xl lg:text-5xl font-bold text-orange">{merah.holiday_date}</p>
          <p className="text-center text-xl md:text-2xl lg:text-3xl font-bold text-orange">{merah.holiday_name}</p>
        </div>
        <div className="flex flex-col justify-between items-center mt-2 md:mt-3 lg:mt-4">
          <p className="text-center text-md md:text-lg lg:text-xl font-bold text-black">{untilMerahMsg(merah.days_to_holiday)}</p>
        </div>
        <div className="flex flex-col justify-between items-center mt-6 md:mt-8 lg:mt-10 p-1 md:p-2 bg-shadeivory rounded-lg">
          <p className="text-center text-xs font-bold text-darkivory">{merahGapMsg(merah.holiday_date)}</p>
        </div>
      </div>
      <div className="flex flex-row justify-center items-center gap-x-1">
        <footer className="text-right lg:text-center text-xxs font-bold text-black">
          situs oleh <Link className="text-darkivory hover:underline" href="https://github.com/raihanizar">@raihanizar </Link> 
          /
          data dari <Link className="text-violet hover:underline" href="https://api-harilibur.vercel.app/">API Hari Libur </Link>
        </footer>
      </div>
    </div>
  )
}

async function getMerah(todayDate, dateOptions) {
  try {
    const res = await fetch("https://api-harilibur.vercel.app/api", {
      method: "GET",
      headers: {
        "accept": "application/json"
      },
      cache: "no-store" // SSR in app router
    })

    const merahJson = await res.json()
    let merahIDString = ''
    let merahName = ''
    let nearestTimeToMerah = ''

    for (let i = 0; i < merahJson.length; i++) {
      if (merahJson[i].is_national_holiday) {
        let merahString = merahJson[i].holiday_date
        let merahDate = new Date(merahString)
        // because holiday_date on json response is descending...
        let timeToMerah = merahDate - todayDate
        if (timeToMerah > 0) {
          merahIDString = merahDate.toLocaleDateString('id-ID', dateOptions)
          merahName = merahJson[i].holiday_name
          nearestTimeToMerah = timeToMerah
        }
      }
    }

    // timeToMerah has precision of milisecond
    const nearestDaysToMerah = Math.ceil(nearestTimeToMerah / (1000 * 60 * 60 * 24))

    let nearestHoliday = {
      holiday_date: merahIDString,
      holiday_name: merahName,
      days_to_holiday: nearestDaysToMerah
    }
    return nearestHoliday

  } catch (error) {
    return "error tidak ada tanggal"
  }
}

function untilMerahMsg(days) {
  if (days > 5) {
    return `Sabar, masih ${days} hari lagi...`
  } else if (days > 1) {
    return `Siap-siap, liburan tinggal ${days} hari lagi!`
  } else {
    return "Siap-siap, besok libur!"
  }
}

function merahGapMsg(merahString) {
  const weekdayString = merahString.split(", ")[0]
  if (weekdayString === "Selasa" || weekdayString === "Kamis") {
    return "Tanggal merah dekat hari kejepit tuh, bisa siapkan cuti. 👌"
  } else if (weekdayString === "Senin" || weekdayString === "Jumat") {
    return "Tanggal merah dan weekend berturut-turut tuh, siap-siap liburan panjang! 🏖️"
  }
}
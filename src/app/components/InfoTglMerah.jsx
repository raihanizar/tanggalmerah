async function getMerah(todayDate, dateOptions) {
  try {
    const res = await fetch("https://api-harilibur.vercel.app/api", {
      method: "GET",
      headers: {
        "accept": "application/json"
      },
      cache: "no-store" // SSR in app router
    })
    const resultJson = await res.json()

    // only national holidays will be considered
    let merahJson = resultJson.filter(result => result.is_national_holiday === true);

    let merahString = ''
    let merahIDString = ''
    let merahName = ''
    let nearestTimeToMerah = ''
    let nextMerahString = ''
    let nextMerahIDString = ''
    let nextMerahName = ''

    for (let i = 0; i < merahJson.length; i++) {
      merahString = merahJson[i].holiday_date

      // if stops on first element, next holiday must be new year
      if (i === 0) {
        let merahStringParts = merahString.split("-")
        let merahYear = parseInt(merahStringParts[0])
        nextMerahString = `${merahYear + 1}-01-01`
      } else {
        nextMerahString = merahJson[i - 1].holiday_date
      }

      let merahDate = dateStringToDate(merahString)
      let nextMerahDate = dateStringToDate(nextMerahString)

      let timeToMerah = merahDate - todayDate

      // loop merahDate descending order, get date difference, until merahDate preceeds todayDate by 1 day
      if (timeToMerah >= -86400000) {
        merahIDString = merahDate.toLocaleDateString('id-ID', dateOptions)
        merahName = merahJson[i].holiday_name
        nearestTimeToMerah = timeToMerah

        // next holiday information
        nextMerahIDString = nextMerahDate.toLocaleDateString('id-ID', dateOptions)
        // if stops on first element, next holiday must be new year
        if (i === 0) {
          let merahStringParts = merahString.split("-")
          let merahYear = parseInt(merahStringParts[0])
          nextMerahName = `Tahun baru ${merahYear + 1}`
        } else {
          nextMerahName = merahJson[i - 1].holiday_name
        }
      }
    }

    // timeToMerah has precision of milisecond
    const nearestDaysToMerah = Math.ceil(nearestTimeToMerah / (1000 * 60 * 60 * 24))

    let nearestHoliday = {
      holiday_date: merahIDString,
      holiday_name: merahName,
      days_to_holiday: nearestDaysToMerah,
      next_holiday_date: nextMerahIDString,
      next_holiday_name: nextMerahName
    }
    return nearestHoliday

  } catch (error) {
    return "error tidak ada tanggal"
  }
}

function dateStringToDate(dateString) {
  let dateStringParts = dateString.split("-")
  var year = parseInt(dateStringParts[0])
  var month = parseInt(dateStringParts[1]) - 1
  var day = parseInt(dateStringParts[2])
  return new Date(year, month, day)
}

function openingMsg(days) {
  if (days > 0) {
    return 'Jadi, kapan tanggal merah terdekat?'
  } else {
    return 'Hari ini tanggal merah! 🎉'
  }
}

function untilMerahMsg(days) {
  if (days > 5) {
    return `Sabar, masih ${days} hari lagi...`
  } else if (days > 1) {
    return `Siap-siap, liburan tinggal ${days} hari lagi!`
  } else if (days === 0) {
    return `Selamat liburan... 🏖️`
  } else {
    return "Siap-siap, besok libur!"
  }
}

function bottomMsg(merah) {
  // if today is tanggal merah, show next holiday info
  if (merah.days_to_holiday === 0) {
    return `Selanjutnya: ${merah.next_holiday_date} (${merah.next_holiday_name})`

    // else, show off-work info & strategy
  } else {
    let weekdayString = merah.holiday_date.split(", ")[0]
    if (weekdayString === "Selasa" || weekdayString === "Kamis") {
      return "Tanggal merah dekat hari kejepit tuh, bisa siapkan cuti. 👌"
    } else if (weekdayString === "Senin" || weekdayString === "Jumat") {
      return "Tanggal merah dan weekend berturut-turut tuh, siap-siap liburan panjang! 🏖️"
    }
  }
}

async function InfoTglMerah({ todaysDate, dateOptions }) {
  // get nearest tanggal merah
  const merah = await getMerah(todaysDate, dateOptions)

  return (
    <div className="flex flex-col justify-between items-center">
      <div className="flex flex-col justify-between items-center">
        <h1 className="text-center text-md md:text-lg lg:text-xl mb-2 md:mb-3 lg:mb-4 font-bold text-black">{openingMsg(merah.days_to_holiday)}</h1>
        <p className="text-center text-3xl md:text-4xl lg:text-5xl font-bold text-orange">{merah.holiday_date}</p>
        <p className="text-center text-xl md:text-2xl lg:text-3xl font-bold text-orange">{merah.holiday_name}</p>
      </div>
      <div className="flex flex-col justify-between items-center mt-2 md:mt-3 lg:mt-4">
        <p className="text-center text-md md:text-lg lg:text-xl font-bold text-black">{untilMerahMsg(merah.days_to_holiday)}</p>
      </div>
      <div className="flex flex-col justify-between items-center mt-6 md:mt-8 lg:mt-10 p-1 md:p-2 bg-shadeivory rounded-lg">
        <p className="text-center text-xs font-bold text-darkivory">{bottomMsg(merah)}</p>
      </div>
    </div>
  )
}

export default InfoTglMerah
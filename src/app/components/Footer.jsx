import Link from 'next/link'

function Footer() {
  return (
    <div className="flex flex-row justify-center items-center gap-x-1">
      <footer className="text-right lg:text-center text-xxs font-bold text-black">
        situs oleh <Link className="text-darkivory hover:underline" href="https://github.com/raihanizar">@raihanizar </Link>
        /
        data dari <Link className="text-violet hover:underline" href="https://api-harilibur.vercel.app/">API Hari Libur </Link>
      </footer>
    </div>
  )
}

export default Footer
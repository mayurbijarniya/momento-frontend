import { bottombarLinks } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation"


const Bottombar = () => {
  const pathname = usePathname();

  return (
    <section className='bottom-bar '>
      {bottombarLinks.map((link) => {
        const isActive = pathname === link.route;
        return (
          
            <Link href={link.route} key={link.label} className={`flex-center flex-col gap-1 transition p-2 group ${isActive && 'bg-black invert rounded-[10px]'}`}>
              <img src={link.imgURL} alt={link.label} className={`group-hover:invert-white ${isActive && 'invert-white'} h-7`} />
            </Link>
          
        )
      })}
    </section>
  )
}

export default Bottombar
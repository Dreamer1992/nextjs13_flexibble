import Link from 'next/link'
import Image from 'next/image'

import { NavLinks } from '@/constant'
// import { getCurrentUser } from '@/lib/session'

const Navbar = async () => {
  //   const session = await getCurrentUser()
  const session = {}

  return (
    <nav className="flexBetween navbar">
      <div className="flex-1 flexStart gap-10">
        <Link href="/">
          <Image src="/logo.svg" width={116} height={43} alt="logo" />
        </Link>
        <ul className="xl:flex hidden text-small gap-7">
          {NavLinks.map((link) => (
            <Link href={link.href} key={link.text}>
              {link.text}
            </Link>
          ))}
        </ul>
      </div>

      <div className="flexCenter gap-4">
        {session ? (
          <>
            {/* <ProfileMenu session={session} /> */}
            ProfileMenu
            <Link href="/create-project">
              Share work
              {/* <Button title="Share work" /> */}
            </Link>
          </>
        ) : (
          'AuthProviders'
          //   <AuthProviders />
        )}
      </div>
    </nav>
  )
}

export default Navbar

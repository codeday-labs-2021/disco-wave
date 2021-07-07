
import { signIn, signOut, useSession } from 'next-auth/client'




export default function Home() {
  
  const [ session, loading ] = useSession()

  return <>
    {!session && <>
      Not signed in <br/>
      <button className="bg-accent-primary hover:bg-accent-primary-darker transition ease-in-out p-2 rounded-lg text-white" onClick={() => signIn()}>Sign in</button>
    </>}
    {session && <>
      Signed in as {session.user.name} <br/>
      <button className="bg-accent-primary hover:bg-accent-primary-darker transition ease-in-out p-2 rounded-lg text-white text-base" onClick={() => signOut()}>Sign out</button>
    </>}
  </>
}

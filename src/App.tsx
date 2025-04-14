import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'

export default function App() {
  return (
    <>
    <header style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem' }}>
      <SignedOut>
        <div style={{ marginLeft: 'auto' }}>
          <SignInButton />
        </div>
      </SignedOut>
      <SignedIn>
        <div style={{ marginLeft: 'auto' }}>
          <UserButton />
        </div>
      </SignedIn>
    </header>
    <h1>Hello My name is BHumi</h1>
    </>
  )
}

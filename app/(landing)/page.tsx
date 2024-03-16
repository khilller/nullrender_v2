import React from 'react'
import { Button } from "@/components/ui/button"
import Link from 'next/link'

const LandingPage = () => {
  return (
    <div>
      <h2 className="text-6xl text-green-500">Welcome to your nullrender!</h2>
      <Link href='/sign-in'>
        <Button variant="outline">Login</Button>
      </Link>
      <Link href='/sign-up'>
        <Button variant="outline">Register</Button>
      </Link>
    </div>
  )
}

export default LandingPage
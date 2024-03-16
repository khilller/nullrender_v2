import Image from "next/image";
import { Button } from "@/components/ui/button"
import { UserButton } from "@clerk/nextjs";


const DashboardPage = () => {
  return (
    <div>
      <h2 className="text-6xl text-green-500">Welcome to your dashboard!</h2>
      <UserButton afterSignOutUrl="/" />
    </div>
  )

}

export default DashboardPage;

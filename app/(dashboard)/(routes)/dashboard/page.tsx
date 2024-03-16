import Image from "next/image";
import { Button } from "@/components/ui/button"
import { UserButton } from "@clerk/nextjs";


const DashboardPage = () => {
  return (
  <section className="mt-10 px-4">
    <div className="mb-8 space-y-4">
      <h2 className="text-2xl md:text-4xl font-bold text-center">Explore the power of AI</h2>
    </div>
    <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
      Chat with the smartest AI - Expreience the power of AI
    </p>
  </section>
  )

}

export default DashboardPage;

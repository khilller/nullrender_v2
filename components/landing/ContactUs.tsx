import React from 'react'
import { Button } from '../ui/button'

export default function ContactUs() {
  return (
  <section className="contact-us-section py-6 md:py-16 md:px-4 px-4  font-mulish text-center">
      <h2 className="text-4xl md:text-5xl font-bold mb-8 text-slate-300">Contact Us</h2>
      <p className="text-lg text-slate-400 mb-8">Have questions or feedback? Reach out to us using the form below.</p>

      <form action="https://submit-form.com/fZQqC6EIs" className="w-full max-w-md mx-auto text-start">
        <label htmlFor="name" className="text-lg text-slate-400 mb-2">Name:</label>
        <input type="text" id="name" name="name" required placeholder="Name"className="w-full mt-2 px-4 py-2 border rounded-md mb-4 focus:outline-none focus:border-green-400" />

        <label htmlFor="email" className="text-lg text-slate-400 mb-2">Email:</label>
        <input type="email" id="email" name="email" required placeholder='jane@doe.com' className="w-full mt-2 px-4 py-2 border rounded mb-4 focus:outline-none focus:border-green-400" />

        <label htmlFor="message" className="text-lg text-slate-400 mb-2">Message:</label>
        <textarea id="message" name="message" placeholder="Message"rows={4} required className="w-full mt-2 px-4 py-2 border rounded mb-6 focus:outline-none focus:border-green-400"></textarea>

        <Button type="submit" variant="outline" className="">Submit</Button>
      </form>
  </section>
  )
}

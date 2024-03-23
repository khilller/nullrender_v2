"use client"

import { faq } from "@/constants";
import { Minus, Plus } from "lucide-react";
import Link from "next/link";
import React from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


export default function FAQ() {

    const [toggle, setToggle] = React.useState<boolean[]>(new Array(faq.length).fill(false));

    const handleToggle = (index: number): void => {
      setToggle(prevToggle =>
        prevToggle.map((item, i) => (index === i ? !item : item))
      );
    };
  
    return (
      <section className="flex flex-col items-center justify-center font-mulish px-10 py-5">
        <div className="flex flex-col ">
          <h1 className="home_page_text">Frequently Asked Questions</h1>
          <p className="text-center text-lg mt-4 text-slate-300">
            Have other questions? Ask our personal assistant Juno or Contact us by{' '}
            <span
              className="underline cursor-pointer"
              onClick={() => window.open('mailto:info@archquest.org?subject=Contact%20ArchQuest')}
            >
              mail
            </span> or use the form below 👇🏼.
          </p>
        </div>
        <div className=" md:w-[75%] mt-7 px-4 bg-[#192339] text-slate-300 rounded-2xl">
          {faq.map((item, index) => (
            <div key={index} className="">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value={faq.length.toString()} className="p-4 md:p-0">
                  <AccordionTrigger className="font-normal">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-slate-400">{item.answer}</p>
                  </AccordionContent>
                </AccordionItem>

              </Accordion>
            </div>

          ))}
        </div>
      </section>
    );
}
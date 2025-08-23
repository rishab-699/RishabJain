"use client"
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import emailjs from '@emailjs/browser';

const ContactPage = ()=>{
  const motionText = "Say Hello!"
  const [success, setSuccess]=useState(false);
  const [error, setError]=useState(false);

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(process.env.NEXT_PUBLIC_mailserviceID, process.env.NEXT_PUBLIC_mailtemplateID, form.current, {
        publicKey: process.env.NEXT_PUBLIC_keyID,
      })
      .then(
        () => {
          setSuccess(true);
          form.current.reset()
          setTimeout(()=>{
            setSuccess(false);
          },500);
          console.log('SUCCESS!');
        },
        (error) => {
          console.log('FAILED...', error.text);
          setError('true');
          setTimeout(()=>{
            setError(false);
          },500);
        },
      );
  };

    return(
        <motion.div className="h-full"
    initial={{y:"-200vh"}}
    animate={{y:"0%"}}
    transition={{duration:1}}
  >
    <div className="h-full flex flex-col md:flex-row items-center justify-center gap-4 px-4 sm:px-8 md:px-12 lg:px-20 xl:px-48">
      <div className="text-6xl w-1/2">
        {motionText.split("").map((letter,index)=>{
          return <motion.span
           key={index}
           initial={{opacity:0}}
           animate={{opacity:1}}
           transition={{duration:2, ease:"easeIn", delay:index*0.1, repeat:Infinity}}
          >
            {letter}
            </motion.span>
        })}
      </div>
      
        <form ref={form} onSubmit={(e)=>sendEmail(e)} className="h-full w-1/2 bg-white rounded-xl text-xl opacity-80 flex flex-col gap-4 justify-center items-center">
          {success &&<span className="text-green-800 bg-green-300 px-4 py-2 rounded-lg border-2 border-green-500 bg-opacity-50">Message sent Successfully!</span>}
          {error &&<span className="text-red-800 bg-red-300 px-4 py-2 rounded-lg border-2 border-red-500 bg-opacity-50">Something went wrong!</span>}
          <div className="w-1/2 flex flex-col justify-start gap-4">
            <span className="text-xl">Dear Rishab,</span>
            <textarea type="text" name="user_message" className="border-b-black h-40 border-b-2 outline-none bg-none resize-none" />
          </div>
          <div className="w-1/2 flex flex-col justify-start gap-4">
            <span className="text-xl">My Email Address is:</span>
            <input type="text" name="user_email" className="border-b-black border-b-2 outline-none bg-none" />
          </div>
          <div className="w-1/2 flex flex-col justify-start gap-4">
            <span className="text-xl">Regards</span>
          </div>
          <button className="w-1/2 p-4 text-xl text-center bg-red-200 hover:scale-140 transition">Send</button>
        </form>
    </div>
  </motion.div>
        
    )
}

export default ContactPage;
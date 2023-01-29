import React from 'react'
import "../About.css";

export const About = () => {
  return (
    <div className="container-outer flex flex-col items-center h-[100vh] justify-between">
        <div className="header">            
            <div className="cover relative">
                <p className="absolute pl-[2rem] pt-5 primary-blue font-bold text-xl"><a href="../">Ask Eric</a></p>
                <img className="h-[20rem] w-[100vw] object-cover" src="/cover.jpg" alt="healthcare worker"></img>
                <h1 className="text-5xl font-bold cover-img">About Us</h1>
            </div>
        </div>
        <div className="container max-w-6xl flex flex-col tracking-tight gap-4 pb-11 mt-[5rem]">
            <h3 className="text-2xl font-bold mb-5">We connect the world with transparent answers to their healthcare related questions.</h3>
            <h2 className="text-3xl font-bold primary-blue">🌎 Our Mission</h2>
            <p>Commonly, we have more questions about our healthcare policies than we have answers. Our bot, “Eric”, works to close the knowledge gap between the consumer and the provider at health insurance agencies. Our team of healthcare experts and NLP specialists have worked tirelessly to ensure that Eric is able to provide accurate and up-to-date information on a wide range of health topics.</p>
            <p>We’re constantly updating and improving Eric to ensure that you have access to the most accurate and reliable information possible. We believe that everyone has the right to accurate and reliable healthcare information. That's why we've made our chatbot available to everyone, free of charge. So whether you're a patient, a caregiver, or just someone looking for information, we're here to help.</p>
            <h2 className="text-3xl font-bold primary-blue mt-8">💻 Our Technology</h2>
            <p>At AskEric, we understand that navigating the healthcare system can be a difficult and confusing task. That's why we created "AskEric", a chatbot that uses natural language processing (NLP) to provide accurate and truthful answers to your healthcare and health-related questions. </p>
            <p>Our "i-message-like" interface makes it easy for you to have a conversation with Eric and get the information you need. Whether you're looking for information about a specific condition, trying to understand your insurance coverage, or just have general health-related questions, Eric is here to help. </p>
            <p>Thank you for choosing AskEric. We're here to help you navigate the healthcare system and make informed decisions about your health.</p>
        </div>
        <footer>
            <ul className="flex gap-10 place-content-between text-sm opacity-70 border-t-2 p-4">
                <li><a href="../">Home</a></li>
                <li><a href="../Chat">Chat</a></li>
                <li><a href="../About">About</a></li>
            </ul>
        </footer>
    </div>
  )
}

export default About;

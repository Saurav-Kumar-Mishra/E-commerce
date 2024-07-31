import React, { useRef } from 'react'
import { GrSend } from 'react-icons/gr'
import { toast, ToastContainer } from 'react-toastify'    // Library for displaying notifications
import 'react-toastify/dist/ReactToastify.css'            // importing css for toast notification      
import emailjs from '@emailjs/browser'                    // Library for sending emails
import './Contact.css'

const Contact = () => {
    const form = useRef()
    const sendEmail = (e) => {
        e.preventDefault()

        // Sends an email using the EmailJS service
        emailjs
            .sendForm(
                process.env
                    .REACT_APP_service_id,               // Bringing the values form .env file /
                process.env
                    .REACT_APP_template_id,              // Bringing the values form .env file //
                form.current,
                process.env
                    .REACT_APP_public_key                // Bringing the values form .env file //
            )
            .then(
                () => {
                    toast.success('Message sent successfully')
                },
                (error) => {
                    toast.error('Failed to send message')
                }
            )

        form.current.reset()   // Reset the form after sending the email
    }

    return (
        <div className="contact-container">
            <h1>Contact Us</h1>
            <p>
                If you have any questions, feel free to reach out to us using
                the form below.
            </p>
            <form onSubmit={sendEmail} ref={form} className="contact-form">
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="from_name" required />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="from_email" required />
                </div>
                <div className="form-group">
                    <label htmlFor="message">Message:</label>
                    <textarea
                        id="message"
                        name="message"
                        rows="4"
                        required
                    ></textarea>
                </div>
                <button type="submit" className="submit-button">
                    <GrSend className="inline text-xl mr-2" />
                    Send
                </button>
            </form>
            <ToastContainer />
        </div>
    )
}

export default Contact

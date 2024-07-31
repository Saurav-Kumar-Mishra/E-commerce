import React, { useRef } from 'react'
import { GrSend } from 'react-icons/gr'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import emailjs from '@emailjs/browser'
import './Contact.css'

const Contact = () => {
    const form = useRef()
    const sendEmail = (e) => {
        e.preventDefault()
        emailjs
            .sendForm(
                process.env.REACT_APP_service_id,
                process.env.REACT_APP_template_id,
                form.current,
                process.env.REACT_APP_public_key
            )
            .then(
                () => {
                    toast.success('Message sent successfully')
                },
                (error) => {
                    toast.error('Failed to send message')
                }
            )

        form.current.reset()
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

import React, { useState } from "react";

import "./ContactSeller.css"


const ContactSeller = ({ car }) => {

  let { year, make, model, trim, price } = car;

  let _new = car.new ? "New" : "Used"

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [content, setContent] = useState(`I'd like to know if the ${_new} ${year} ${make} ${model} ${trim} you have listed for $${price.toLocaleString()} is still available.`);

  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.includes('@')) return alert('Not a valid email.  There was no @ sign.')
    setSent(true)
  }

  if (!sent) {
    return (
      <div id="contact-seller-overall-container">
        <div id="contact-seller-title">Contact Seller</div>
        <div id="contact-seller-sellers-phone">Call (773) 355-4365</div>
        <div id="contact-seller-form-wrapper">
          <form onSubmit={handleSubmit}>
            <div id="contact-seller-names-wrapper">
              <div>
                <input
                  id='contact-seller-firstName-textfield'
                  className='contact-seller-fields-class'
                  name='firstName'
                  type='text'
                  value={firstName}
                  required
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <span className="floating-label-contact-seller">First name</span>
              </div>
              <div>
                <input
                  id='contact-seller-lastName-textfield'
                  className='contact-seller-fields-class'
                  name='lastName'
                  type='text'
                  value={lastName}
                  required
                  onChange={(e) => setLastName(e.target.value)}
                />
                <span className="floating-label-contact-seller">Last name</span>
              </div>
            </div>
            <div>
              <input
                id='contact-seller-email-textfield'
                className='contact-seller-fields-class'
                name='email'
                type='text'
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <span className="floating-label-contact-seller">Email</span>
            </div>
            <div>
              <span id="contact-seller-comments-label">Comments</span>
              <textarea
                id='contact-seller-content-textfield'
                className='contact-seller-fields-class'
                name='content'
                type='text'
                value={content}
                required
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
            <button className='contact-seller-submit-button' type='submit'>Check availability</button>
          </form>
        </div>
      </div>
    );
  }

  if (sent) {
    return (
      <div id="contact-seller-sent-overall-container">
        <div id="contact-seller-sent-checkmark"><i class="fa-regular fa-square-check"></i></div>
        <div id="contact-seller-sent-message-container">
          <div id="contact-seller-sent-message-title">Message sent</div>
          <div id="contact-seller-sent-message-small-text">The dealer will reach out to you with next steps.</div>
        </div>
      </div>
    );
  }
};

export default ContactSeller;

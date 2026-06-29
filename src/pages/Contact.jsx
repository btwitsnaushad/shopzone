import React, { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Please enter your name.';
    if (!formData.email.trim()) newErrors.email = 'Please enter your email.';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Please enter a valid email.';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required.';
    if (!formData.message.trim()) newErrors.message = 'Message is required.';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validate();
    
    if (Object.keys(formErrors).length === 0) {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setIsSubmitted(false), 5000);
      }, 2000);
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <div className="contact-container">
      <div className="contact-header">
        <h2>Contact Us</h2>
        <p>We'd love to hear from you. Please fill out the form below.</p>
      </div>

      <div className="contact-content">
        <div className="contact-form-section">
          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            {['name', 'email', 'subject'].map((field) => (
              <div className="form-group" key={field}>
                <input 
                  type={field === 'email' ? 'email' : 'text'} 
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className={`form-control ${errors[field] ? 'error' : ''}`} 
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)} 
                />
                {errors[field] && <span className="error">{errors[field]}</span>}
              </div>
            ))}
            
            <div className="form-group">
              <textarea 
                name="message"
                value={formData.message}
                onChange={handleChange}
                className={`form-control ${errors.message ? 'error' : ''}`} 
                placeholder="Message" 
                rows="5" 
              ></textarea>
              {errors.message && <span className="error">{errors.message}</span>}
            </div>

            {isSubmitted && (
              <div className="success-message">
                ✔ Message Sent Successfully! <br/>
                <span style={{fontSize: '12px'}}>We'll contact you within 24 hours.</span>
              </div>
            )}

            <button type="submit" className="btn-purple hero-btn submit-btn" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>

        <div className="contact-info-section">
          <div className="info-card">
            {[
              { icon: '📍', title: 'Address', text: '123 ShopZone Street, EC 560001' },
              { icon: '📞', title: 'Phone', text: '+91 98765 43210' },
              { icon: '📧', title: 'Email', text: 'support@shopzone.com' },
              { icon: '🕒', title: 'Working Hours', text: 'Mon - Fri: 9:00 AM - 6:00 PM' }
            ].map((item, idx) => (
              <div className="info-item" key={idx}>
                <span className="info-icon">{item.icon}</span>
                <div>
                  <h4>{item.title}</h4>
                  <p>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
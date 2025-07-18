'use client';

import React, { useState } from 'react';

type ContactSectionProps = {
  onSubmit?: () => void;
};

const ContactSection: React.FC<ContactSectionProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 3000);
    }, 1500);
  };

  const socialLinks = [
    {
      name: 'GitHub',
      icon: 'ri-github-line',
      url: 'https://github.com/Fanet000',
      color: 'hover:text-gray-300'
    },
    {
      name: 'LinkedIn',
      icon: 'ri-linkedin-line',
      url: 'https://www.linkedin.com/in/bhuvan-b-krishna-13266326a/',
      color: 'hover:text-blue-400'
    },
    
    {
      name: 'Instagram',
      icon: 'ri-instagram-line',
      url: 'https://www.instagram.com/kbhuvanb/',
      color: 'hover:text-pink-400'
    }
  ];

  return (
    <section id="contact" className="py-20 bg-black/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Get In <span className="text-purple-400">Touch</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-6"></div>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Let's collaborate on something amazing! Feel free to reach out for project discussions, 
            game development opportunities, or just to say hello.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-white mb-6">Let's Create Something Amazing Together</h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                I'm always excited to work on new projects and collaborate with fellow developers, 
                designers, and creative minds. Whether you have a game idea, need help with development, 
                or want to discuss opportunities, I'd love to hear from you!
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4 text-gray-300">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <i className="ri-map-pin-line text-white"></i>
                </div>
                <div>
                  <div className="text-white font-medium">Location</div>
                  <div>Bangalore, Karnataka, India</div>
                </div>
              </div>

              <div className="flex items-center gap-4 text-gray-300">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <i className="ri-mail-line text-white"></i>
                </div>
                <div>
                  <div className="text-white font-medium">Email</div>
                  <div>alphabhuvan28@gmail.com</div>
                </div>
              </div>

              <div className="flex items-center gap-4 text-gray-300">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <i className="ri-graduation-cap-line text-white"></i>
                </div>
                <div>
                  <div className="text-white font-medium">Education</div>
                  <div>BCA Game Development - Alliance University</div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Follow Me</h4>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    className={`w-12 h-12 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center text-gray-400 ${social.color} transition-all duration-300 cursor-pointer`}
                  >
                    <i className={`${social.icon} text-xl`}></i>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20">
            <form id="contact-form" onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-black/50 border border-purple-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors text-sm"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-black/50 border border-purple-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors text-sm"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-black/50 border border-purple-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors text-sm"
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  maxLength={500}
                  className="w-full bg-black/50 border border-purple-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors resize-none text-sm"
                  placeholder="Tell me about your project or just say hi!"
                ></textarea>
                <div className="text-right text-xs text-gray-400 mt-1">
                  {formData.message.length}/500 characters
                </div>
              </div>

              {submitStatus === 'success' && (
                <div className="bg-green-900/50 border border-green-500/20 rounded-lg p-4 text-green-400 text-center">
                  <i className="ri-check-line text-xl mr-2"></i>
                  Message sent successfully! I'll get back to you soon.
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting || submitStatus === 'success'}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed px-6 py-3 rounded-lg text-white font-semibold transition-all duration-300 whitespace-nowrap"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Sending...
                  </span>
                ) : submitStatus === 'success' ? (
                  'Message Sent!'
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-purple-500/20 text-center">
          <p className="text-gray-400">
            © 2025 Bhuvan B Krishna. Made with ❤️ and lots of ☕
          </p>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
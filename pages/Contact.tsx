import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-2xl mx-auto text-center mb-12">
        <h1 className="text-3xl font-black uppercase mb-4">Get In Touch</h1>
        <p className="text-gray-600">
          Have a question about your order, sizing, or just want to say hey? We're here to help.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="bg-gray-50 p-8 rounded-sm">
          <h3 className="text-xl font-bold mb-6 text-brand-black">Contact Info</h3>
          <div className="space-y-4 text-gray-600">
            <p><span className="font-bold text-black block">Headquarters</span> 123 Sneaker St, Los Angeles, CA 90012</p>
            <p><span className="font-bold text-black block">Email</span> support@walkin.com</p>
            <p><span className="font-bold text-black block">Phone</span> +1 (555) 123-4567</p>
            <p><span className="font-bold text-black block">Hours</span> Mon-Fri: 9am - 6pm PST</p>
          </div>
        </div>

        <div>
          {sent ? (
             <div className="bg-green-50 border border-green-200 text-green-700 p-8 rounded text-center">
               <h3 className="font-bold text-xl mb-2">Message Sent!</h3>
               <p>Thanks for reaching out. We'll get back to you shortly.</p>
             </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input required type="text" placeholder="Name" className="w-full border p-3 rounded focus:outline-none focus:border-black bg-white text-gray-900 placeholder-gray-400" />
              <input required type="email" placeholder="Email" className="w-full border p-3 rounded focus:outline-none focus:border-black bg-white text-gray-900 placeholder-gray-400" />
              <select className="w-full border p-3 rounded focus:outline-none focus:border-black text-gray-900 bg-white">
                <option>General Inquiry</option>
                <option>Order Status</option>
                <option>Returns</option>
              </select>
              <textarea required rows={4} placeholder="Message" className="w-full border p-3 rounded focus:outline-none focus:border-black bg-white text-gray-900 placeholder-gray-400" />
              <button type="submit" className="w-full bg-black text-white py-4 font-bold uppercase hover:bg-gray-900 transition-colors shadow-md">Send Message</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
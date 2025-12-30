import React from 'react';

const HelpCenter: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20 animate-fade-in">
      <h1 className="text-4xl font-black uppercase mb-4 text-center">Help Center</h1>
      <p className="text-gray-500 text-center mb-12 max-w-2xl mx-auto">Find answers to frequently asked questions about orders, shipping, returns, and more.</p>

      <div className="space-y-6">
        <div className="bg-gray-50 p-8 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Shipping & Delivery</h2>
          <div className="space-y-4">
            <details className="group">
              <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                <span>How long does shipping take?</span>
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <p className="text-gray-600 mt-3 group-open:animate-fade-in">
                Standard shipping typically takes 3-5 business days. Express shipping options are available at checkout for 1-2 day delivery.
              </p>
            </details>
            <hr className="border-gray-200" />
            <details className="group">
              <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                <span>Do you ship internationally?</span>
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <p className="text-gray-600 mt-3 group-open:animate-fade-in">
                Yes! We ship to over 50 countries worldwide. International shipping rates and times vary by location.
              </p>
            </details>
          </div>
        </div>

        <div className="bg-gray-50 p-8 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Returns & Refunds</h2>
          <div className="space-y-4">
            <details className="group">
              <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                <span>What is your return policy?</span>
                <span className="transition group-open:rotate-180">
                   <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <p className="text-gray-600 mt-3 group-open:animate-fade-in">
                We accept returns within 30 days of purchase. Items must be unworn, in original packaging, and with all tags attached.
              </p>
            </details>
            <hr className="border-gray-200" />
            <details className="group">
              <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                <span>How do I start a return?</span>
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <p className="text-gray-600 mt-3 group-open:animate-fade-in">
                Visit your profile page and select the order you wish to return, or contact our support team if you checked out as a guest.
              </p>
            </details>
          </div>
        </div>

        <div className="bg-brand-black text-white p-8 rounded-lg text-center">
            <h3 className="text-xl font-bold mb-2">Still need help?</h3>
            <p className="text-gray-400 mb-6">Our support team is available Mon-Fri, 9am - 6pm PST.</p>
            <a href="#/contact" className="bg-brand-orange text-white px-8 py-3 rounded font-bold hover:bg-white hover:text-black transition-colors inline-block">
                Contact Support
            </a>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;

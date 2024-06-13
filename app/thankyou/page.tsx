import React from 'react';

const ThankYouPage = () => {
  return (
    <div className="container min-vh-100 d-flex justify-content-center align-items-center ">
      <div className="col-md-8 ">
        <div className="shadow-lg max-w-[800px] mx-auto py-14 my-6">
          <h3 className="font-bold text-lg mb-3 text-center">Thank You For Contacting Us</h3>
          <p className='px-8'>
            We have received your message. Someone from our team will contact you
            shortly. For more information, please visit our LinkedIn page:
            <a
              href="https://www.linkedin.com/company/codessync/"
              target="_blank"
              className="text-[#0052aa] break-words cursor-pointer hover:text-[#0099ff]"
              rel="noopener noreferrer"
            >
              https://www.linkedin.com/company/codessync/
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;
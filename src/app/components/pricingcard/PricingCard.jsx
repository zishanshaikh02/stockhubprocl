import React from 'react';

const PricingCard = ({ title, price, discount, features, link }) => {
  return (
    <div className="bg-opacity-70 bg-cover bg-center text-black rounded-lg shadow-md border border-black p-8 text-white">
      <h2 className="text-2xl font-semibold mb-4 text-black">{title}</h2>
      <p className="text-3xl font-bold mb-4 text-black">{price}<span className="text-base"></span></p>
      <p className="text-black">Save {discount}</p>
      <hr className="my-4 border-t border-white" />
      <ul className="list-disc list-inside mb-4">
        {features.map((feature, index) => (
          <li key={index} className="text-black">{feature}</li>
        ))}
      </ul>
      <a href={link} className="bg-blue-500 text-white py-2 px-4 rounded-full block text-center hover:bg-black transition duration-300 ease-in-out">
        Buy Now
      </a>
    </div>
  );
};

export default PricingCard;


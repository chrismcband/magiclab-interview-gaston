import React from "react";

const Tweet = ({ imageURL, userName, tweetText }) => (
  <div className="container mx-auto max-w-lg bg-gray-100 p-4 rounded shadow-md mb-6">
    <div className="flex flex-row">
      <div className="w-1/5 flex">
        <img
          className="w-16 h-16 rounded-full mt-2 ml-2"
          src={imageURL}
          alt="Profile of user"
        />
      </div>
      <div className="w-4/5 flex flex-col">
        <p className="text-xl pb-2">{userName}</p>
        <p>{tweetText}</p>
      </div>
    </div>
  </div>
);

export default Tweet;

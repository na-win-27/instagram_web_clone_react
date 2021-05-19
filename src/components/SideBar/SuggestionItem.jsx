import React from "react";

const SuggestionItem = ({ username }) => {
  return (
    <React.Fragment>
      <div className="flex flex-row justify-between">
        <div className="flex mt-3 flex-col">
          <div className="flex flex-row justify-start">
            <img
              src="/images/avatars/orwell.jpg"
              className="h-9 w-9 rounded-full"
              alt="User Dp"
            />
            <div className="flex flex-col">
              <p className="pl-3  text-sm font-semibold">{username}</p>
              <p className="pl-3  text-xs  text-gray-base">New to Instagram</p>
            </div>
          </div>
        </div>
        <div className="">
          <p className="text-xs text-gray-base pt-6 font-semibold">Follow</p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SuggestionItem;

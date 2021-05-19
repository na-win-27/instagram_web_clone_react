import React from "react";
import Skeleton from "react-loading-skeleton";

const User = ({ username, fullname }) => {
  // consolelog(username, fullname);
  return !username || !fullname ? (
    <Skeleton count={1} height={60} />
  ) : (
    <div className="flex flex-row">
      <img
        src="/images/avatars/karl.jpg"
        className="h-12 w-12 rounded-full"
        alt="UserDp"
      />
      <div className="flex flex-col justify-start mx-5 ">
        <p className="font-semibold text-sm">{username}</p>
        <p className="text-gray-base text-sm">{fullname}</p>
      </div>
    </div>
  );
};

export default User;

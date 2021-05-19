import React from "react";
import SuggestionItem from "./SuggestionItem";
import { Link } from "react-router-dom";
const Suggestions = ({ users }) => {
  return (
    <div className="flex flex-col mt-4">
      <div className="flex flex-row justify-between">
        <p className="text-gray-base font-semibold  text-sm">
          Suggestion For You
        </p>
        <Link to="">
          <p className="text-blue-medium font-semibold text-xs">See All</p>
        </Link>
      </div>
      {users.slice(0, 5).map((user) => (
        <SuggestionItem key={user.userId} username={user.username} />
      ))}
    </div>
  );
};

export default Suggestions;

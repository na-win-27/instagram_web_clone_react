import React, { useEffect, useState } from "react";
import useUser from "../../hooks/useUser";
import User from "./User";
import Suggestions from "./Suggestions";
import { getUsers } from "../../services/firebase";
import Skeleton from "react-loading-skeleton";

const SideBar = () => {
  const user = useUser();
  const [suggestions, setSuggestions] = useState();

  async function getSuggestions() {
    const res = await getUsers();
    return res;
  }
  useEffect(() => {
    const results = getSuggestions();
    return results.then((re) => setSuggestions(re));
    // return results();
    // setSuggestions(results);
  }, []);

  return (
    <React.Fragment>
      {user && suggestions ? (
        <div className="p-4 flex flex-col">
          <User fullname={user[0].fullname} username={user[0].username} />
          <Suggestions
            users={suggestions.filter(
              (suggestion) => suggestion.username !== user[0].username
            )}
          />
        </div>
      ) : (
        <div className="p-4 flex flex-col">
          <Skeleton count={6} height={60} />
        </div>
      )}
    </React.Fragment>
  );
};

export default SideBar;

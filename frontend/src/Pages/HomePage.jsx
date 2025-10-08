import React, { useEffect, useState, useRef } from "react";
import Navbar from "../Components/Navbar";
import RateLimitedUi from "../Components/RateLimitedUi";
import NoteCard from "../Components/NoteCard";

import api from "../lib/Axios";
import toast from "react-hot-toast";
import { Search } from "lucide-react";
import NoSearchUi from "../Components/NoSearchUi";
import NoNotesUi from "../Components/NoNotesUi";

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [isLoading, SetIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const searchInputRef = useRef(null);

  const handleIconClick = () => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes");
        console.log(res.data);
        setNotes(res.data);
        setIsRateLimited(false);
      } catch (error) {
        console.log("Error in fetching notes");
        console.log(error);

        if (error.response?.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error("Failed to get notes");
        }
      } finally {
        SetIsLoading(false);
      }
    };
    fetchNotes();
  }, []);
  const filteredItems = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar />
      {isRateLimited && <RateLimitedUi />}

      <div className="max-w-7xl mx-auto mt-6">
        {isLoading && (
          <div className="text-center text-primary">Loading notes....</div>
        )}
        {/* <div className=" py-7 px-6 w-3/4  mb-13 border-t-5 mx-auto  border-secondary  rounded-xl lg:w-2/5 align-center justify-center">
          <div className="mb-6 relative mx-auto w-full max-w-md  ">
            <Search
              size={20}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
              onClick={handleIconClick}
            />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 bg-gray-950 py-2 rounded-lg border border-gray-600  text-white focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div> */}

        {filteredItems.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 size-3/4  lg:size-full mx-auto  md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}
        {filteredItems.length === 0 && searchTerm && !isRateLimited && (
          <div className="max-w-3/4  mx-auto align-center text-center justify-center py-7 px-5 ">
            <NoSearchUi />
          </div>
        )}
        {!isLoading && !searchTerm && notes.length === 0 && !isRateLimited && (
          <NoNotesUi />
        )}
      </div>
    </div>
  );
};

export default HomePage;

import React, { useState } from "react";
import { ArrowLeftIcon } from "lucide-react";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";

import api from "../lib/Axios";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error("All fields required");
      return;
    }
    setIsLoading(true);
    try {
      await api.post("/notes", {
        title,
        content,
      });
      toast.success("Note created");
      navigate("/");
    } catch (error) {
      if (error.response.status === 429) {
        toast.error("Slow down you're creating notes too fast", {
          duration: 400,
          icon: "",
        });
      } else {
        console.log(error, "Error in creating notes");
        toast.error("Failed to create note , try again later");
      }
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container  mx-auto px-4 py-8">
        <div className="max-w-2xl  mx-auto">
          <Link
            className="btn btn-ghost  mb-6 hover:bg-gray-800 transition-all"
            to={"/"}
          >
            <ArrowLeftIcon className="size-4" />
            Back to notes
          </Link>
          <div className="card bg-base-100">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Create New Note</h2>

              <form onSubmit={handleSubmit}>
                <label className="label mb-2 ml-2">
                  <span className="label-text1">Title</span>
                </label>
                <div className="form-control mb-8 ">
                  <input
                    placeholder="Note Title"
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                    type="text"
                    className="focus:outline-none w-full pl-7 pt-5 pb-7 focus:border-secondary focus:ring-1 focus:ring-primary input input-bordered"
                  />
                </div>
                <label className="label mb-2 ml-2">
                  <span className="label-text">Content</span>
                </label>
                <div className="form-control mb-8 ">
                  <textarea
                    placeholder="Write your note's content here"
                    value={content}
                    onChange={(e) => {
                      setContent(e.target.value);
                    }}
                    type="text"
                    className="focus:outline-none w-full h-32 pl-6 pt-8 focus:border-primary focus:ring-1 focus:ring-primary textarea textarea-bordered"
                  />
                </div>
                <div className="card-actions justify-end">
                  <button
                    className="btn-primary btn"
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating..." : "Create Note"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;

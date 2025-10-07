import React, { useEffect, useState } from "react";
import api from "../lib/Axios";
import { useNavigate, useParams } from "react-router";
import { Link, Navigate } from "react-router";
import toast from "react-hot-toast";

import { LoaderIcon, ArrowLeftIcon, Trash2Icon } from "lucide-react";

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete")) return;
    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted");
      navigate("/");
    } catch (error) {
      console.log("error in the Note Detail delete page", error);
      toast.error("Error deleting note ");
    }
  };
  const handleSave = async () => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Please add a title or content");
      return;
    }
    setIsSaving(true);
    try {
      await api.put(`/notes/${id}`, note);
      toast.success("Note successfully updated");
      navigate("/");
    } catch (error) {
      toast.error("Failed to update note");
      return error;
    } finally {
      setIsSaving(false);
    }
  };
  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNote();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto  px-7 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link
              className="btn btn-ghost p-6 mt-5  mb-6 hover:bg-gray-800 transition-all"
              to={"/"}
            >
              <ArrowLeftIcon className="size-5" />
              Back to notes
            </Link>
            <button
              className="btn btn-error btn-outline"
              onClick={(e) => {
                handleDelete(e, note._id);
              }}
            >
              <Trash2Icon className="size-5" />
              Delete Note
            </button>
          </div>
          <div className="carg bg-base-100">
            <div className="card-body">
              <label className="label">
                <span className="label-text mb-2">Title</span>
              </label>
              <div className="form-control mb-2">
                <input
                  type="text"
                  value={note.title}
                  placeholder="Text"
                  onChange={(e) => setNote({ ...note, title: e.target.value })}
                  className="focus:ring-1 focus:ring-primary focus:outline-none rounded-full input focus:border-primary min-h-12 w-full px-4  py-5"
                />
              </div>
              <label className="label mb-2 ml-2">
                <span className="label-text">Content</span>
              </label>
              <div className="form-control mb-8 ">
                <textarea
                  placeholder="Write your note's content here"
                  value={note.content}
                  onChange={(e) => {
                    setNote({ ...note, content: e.target.value });
                  }}
                  type="text"
                  className="focus:outline-none w-full h-32 pl-6 pt-8 focus:border-primary focus:ring-1 focus:ring-primary textarea textarea-bordered"
                />
              </div>
              <div className="card-actions justify-end">
                <button
                  className="btn btn-primary"
                  disabled={isSaving}
                  onClick={handleSave}
                >
                  {isSaving ? "Saving" : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;

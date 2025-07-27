import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";
import api from "../lib/axios";
import { LoaderIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router";
import { ArrowLeftIcon } from "lucide-react";

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const { id } = useParams();
  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        console.log("Error fetching note", error);
        toast.error("Failed to load note");
        console.error("Error fetching note", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) {
      return;
    }
    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted successfully");
      navigate("/");
    } catch (error) {
      console.error("Error deleting note", error);
      if (error.response && error.response.status === 429) {
        toast.error("Too many requests. Please try again later.", {
          duration: 5000,
          icon: "💀",
        });
      } else {
        toast.error("Failed to delete note. Please try again.");
      }
    }
  };

  const handleSave = async () => {
    try {
      await api.put(`/notes/${id}`, note);
      toast.success("Note saved successfully");
      navigate("/");
    } catch (error) {
      console.error("Error saving note", error);
      if (error.responss && error.response.status === 429) {
        toast.error("Too many requests. Please try again later.", {
          duration: 5000,
          icon: "💀",
        });
      } else {
        toast.error("Failed to save note. Please try again.");
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center ">
        <LoaderIcon className="animate-spin size-6" />
        Loading note...
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link to={"/"} className="rounded-full btn btn-ghost mb-6">
              <ArrowLeftIcon className="size-5" />
              Back to notes
            </Link>
            <button
              onClick={handleDelete}
              className="btn   mb-6 rounded-2xl bg-accent/70 hover:bg-error transition:color duration-300 hover:shadow-xl "
            >
              <Trash2Icon className="h-5 w-5" />
              Delete Note
            </button>
          </div>
          <div className="card bg-base-100 shadow-xl bg-wide sm:max-w-3xl mx-auto rounded-xl">
            <div className="card-body">
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text text-xl font-thin">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Note Title"
                  className="input input-bordered rounded-3xl"
                  value={note.title}
                  onChange={(e) => setNote({ ...note, title: e.target.value })}
                />
              </div>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text text-xl font-thin">Content</span>
                </label>
                <textarea
                  placeholder="Note Content"
                  className="textarea textarea-bordered rounded-3xl"
                  rows="10"
                  value={note.content}
                  onChange={(e) =>
                    setNote({ ...note, content: e.target.value })
                  }
                />
              </div>
              <div className="card-actions justify-end">
                <button
                  className="btn btn-primary rounded-2xl px-10"
                  disabled={saving}
                  onClick={handleSave}
                >
                  Save
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

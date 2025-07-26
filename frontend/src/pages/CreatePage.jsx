import { ArrowLeftIcon, Contact } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import api from "../lib/axios";
const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setloading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error("Title and content are required");
      return;
    }

    setloading(true);
    try {
      await api.post("/notes", {
        title,
        content,
      });
      toast.success("Note created successfully");
      navigate("/");
    } catch (error) {
      console.log("Error creating note", error);
      if (error.response.status === 429) {
        toast.error("Too many requests. Please try again later.", {
          duration: 5000,
          icon: "💀",
        });
      } else {
        toast.error("Failed to create note. Please try again.");
      }
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <Link to={"/"} className="rounded-full btn btn-ghost mb-6">
          <ArrowLeftIcon className="size-5" />
          Back to notes
        </Link>
        <div className="card bg-base-100 shadow-xl bg-wide sm:max-w-3xl mx-auto rounded-xl">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-4"> Create a New Note</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text text-xl font-thin">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Note Title"
                  className="input input-bordered rounded-3xl"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text text-xl font-thin">Content</span>
                </label>
                <textarea
                  type="text"
                  placeholder="Write your note here..."
                  className="textarea textarea-bordered rounded-3xl h-32"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>
              <div className="card-actions justify-end">
                <button
                  type="submit"
                  className="btn btn-primary rounded-3xl"
                  disabled={loading}
                >
                  {loading ? "Creating..." : "Create Note"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;

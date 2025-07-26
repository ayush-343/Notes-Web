import { Link } from "react-router";
import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { formatDate } from "../lib/utils";
import api from "../lib/axios";
import toast from "react-hot-toast";

const NoteCard = ({ note, setNotes }) => {
  const handleDelete = async (e, id) => {
    e.preventDefault();
    if (!window.confirm("Are you sure you want to delete this note?")) {
      return;
    }
    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted successfully");
      // Optionally, you can refresh the notes list or redirect
      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
      toast.success("Note deleted successfully");
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

  return (
    <Link
      to={`/note/${note._id}`}
      className="card rounded-xl bg-accent/70 hover:shadow-xl transition-all duration-300 border-t-4  border-solid border-green-800"
    >
      <div className="card-body ">
        <h3 className="card-title text-base-content line-clamp-3">
          {note.title}
        </h3>
        <p className="text-base-content line-clamp-3">{note.content}</p>
        <div className="card-actions justify-between items-center mt-4">
          <span className="text-sm text-base-content/50">
            {formatDate(new Date(note.createdAt))}
          </span>
          <div className="flex items-center gap-1">
            <PenSquareIcon className="size-4" />
            <button
              className="btn btn-ghost btn-xs text-error"
              onClick={(e) => handleDelete(e, note._id)}
            >
              <Trash2Icon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;

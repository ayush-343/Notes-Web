import Note from "../models/Note.js"

// function
export async function getAllNotes(_, res) {
    try {
        const notes = await Note.find().sort({createdAt:-1}); // sort by date (newest first)
        res.status(200).json(notes);
    }
    catch (error) {
        console.error("Error in getAllNotes controller", error);
        res.status(500).json({ message: "Internal server error" });
     }
}

export async function getNoteById(req, res) {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) return req.status(404), json({ message: "Note not found" });
        res.json(note);
    }catch(error){
        console.error("Error in getNoteById controller", error);
        res.status(500).json({ message: "Internal server error" });}
}
export async function createNote(req, res) {
    try
    {
        const { title, content } = req.body;
        const node = new Note({ title, content });
        const savedNode = await node.save()
        res.status(201).json({ savedNode });
    } catch (error) {
        console.error("Error in createNote controller", error);
        res.status(500).json({ message: "Internal server error" });
    }

}

export async function updateNote(req, res) {
    try {
        const { title, content } = req.body
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, { title, content }, {
            new: true, // return updated document
        }
        );
        if (!updatedNote) { return res.status(404).json({ message: "Node not found" }) }

        res.status(200).json(updatedNote)
    } catch (error) {
        console.error("Error in updateNote controller", error);
        res.status(500).json({ message: "Internal server error" });

    }
 }

export async function deleteNote(req, res) {
    try {
        const { title, content } = req.body
        const deletedNote = await Note.findByIdAndDelete(req.params.id, { title, content }, { new: true, });
        if (!deletedNote) {
            return res.status(404).json({ message: "Node not found" });
        }
        res.status(200).json({message:"Node deleted successfully"})
    } catch (error) {
        console.error("Error in deleteNote controller", error);
        res.status(500).json({message:"Internal server error"});
    }
}
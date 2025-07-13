//function
export function getAllNotes(req, res)  {
    res.status(200).send("You just fetched the notes")
}
 

 export function createNote(req, res) {
    res.status(201).json({ message: "post created sucessfully!" });
}
    
export function updateNote(req, res) {
    (req, res) => {
    res.status(200).json({ message: "post updated suessfully!" });
    }
 }

export function deleteNote(req, res) {
     (req, res) => {
    res.delete(200).json({ message: "Node deleted suessfully!" });
    }
 }
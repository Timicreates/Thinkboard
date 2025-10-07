import Note from "../Models/Note.js";

export const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    return res.status(200).json(notes);
  } catch (error) {
    console.error("ERROR IN GET ALL NOTES CONTROLLER", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getNotesById = async (req, res) => {
  try {
    const id = req.params.id;
    const note = await Note.findById(id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json(note);
  } catch (error) {
    console.error("ERROR IN GET NOTE BY ID CONTROLLER", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const createNotes = async (req, res) => {
  try {
    const { title, content } = req.body;
    const note = new Note({ title, content });
    const savedNote = await note.save();
    res.status(201).json(savedNote);
  } catch (error) {
    console.error("ERROR IN CREATE NOTES CONTROLLER", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const putNotes = async (req, res) => {
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      {
        title,
        content,
      },
      { new: true }
    );
    if (!updatedNote)
      return res.status(404).json({ message: "Note not found" });

    res.status(200).json(updatedNote);
  } catch (error) {
    console.error("ERROR  IN UPDATE NOTES CONTROLLER", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteNotes = async (req, res) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deletedNote)
      return res.status(404).json({ Message: "note not found " });
    res.json({ message: "note deleted" });
  } catch (error) {
    console.error("Error in deleteNotes", error);
    return res.status(200).json({ message: "Notes not deleted " });
  }
};

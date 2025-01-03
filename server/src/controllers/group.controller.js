import Group from "../models/group.model.js";

export const createGroup = async (req, res) => {
  try {
    const { name, members } = req.body;
    if (!name || !members) {
      return res.status(400).json({ message: "Name and members are required" });
    }

    const existingGroup = await Group.findOne({ name });
    if (existingGroup) {
      return res.status(400).json({ message: "Group name is already taken" });
    }
    const group = new Group({ name, members });
    await group.save();
    res.status(201).json({ message: "Group created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

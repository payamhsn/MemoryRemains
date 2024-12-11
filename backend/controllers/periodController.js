import { User } from "../models/user.model.js";

export const getInactivityPeriod = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.json({ inactivityPeriod: user.inactivityPeriod });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateInactivityPeriod = async (req, res) => {
  try {
    const { inactivityPeriod } = req.body;
    const user = await User.findByIdAndUpdate(
      req.userId,
      { inactivityPeriod },
      { new: true }
    );
    res.json({ message: "Inactivity period updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

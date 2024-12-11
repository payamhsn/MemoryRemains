import { User } from "../models/user.model.js";

export const getTrustedPerson = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("trustedPerson");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, trustedPerson: user.trustedPerson });
  } catch (error) {
    console.error("Error in getTrustedPerson:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const saveTrustedPerson = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, predefinedMessage } = req.body;
    const user = await User.findById(req.userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    user.trustedPerson = { fullName, email, phoneNumber, predefinedMessage };
    await user.save();
    res.status(200).json({ success: true, trustedPerson: user.trustedPerson });
  } catch (error) {
    console.error("Error in saveTrustedPerson:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const updateTrustedPerson = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, predefinedMessage } = req.body;
    const user = await User.findById(req.userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    user.trustedPerson = { fullName, email, phoneNumber, predefinedMessage };
    await user.save();
    res.status(200).json({ success: true, trustedPerson: user.trustedPerson });
  } catch (error) {
    console.error("Error in updateTrustedPerson:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const deleteTrustedPerson = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    user.trustedPerson = null;
    await user.save();
    res
      .status(200)
      .json({ success: true, message: "Trusted person deleted successfully" });
  } catch (error) {
    console.error("Error in deleteTrustedPerson:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

import Account from "../models/Account.js";

export const getAccounts = async (req, res) => {
  try {
    const accounts = await Account.find({ user: req.userId }).sort({
      createdAt: -1,
    });
    res.json(accounts);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching accounts", error: error.message });
  }
};

export const createAccount = async (req, res) => {
  try {
    const { platform, username, password, description } = req.body;
    const newAccount = new Account({
      user: req.userId,
      platform,
      username,
      password,
      description,
    });
    const savedAccount = await newAccount.save();
    res.status(201).json(savedAccount);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating account", error: error.message });
  }
};

export const updateAccount = async (req, res) => {
  try {
    const { platform, username, password, description } = req.body;
    const updatedAccount = await Account.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      { platform, username, password, description },
      { new: true }
    );
    if (!updatedAccount) {
      return res.status(404).json({ message: "Account not found" });
    }
    res.json(updatedAccount);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error updating account", error: error.message });
  }
};

export const deleteAccount = async (req, res) => {
  try {
    const deletedAccount = await Account.findOneAndDelete({
      _id: req.params.id,
      user: req.userId,
    });
    if (!deletedAccount) {
      return res.status(404).json({ message: "Account not found" });
    }
    res.json({ message: "Account deleted successfully" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error deleting account", error: error.message });
  }
};

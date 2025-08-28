const { User, Message, Chatroom, ChatMembers } = require("../models"); // Import models
const { Op } = require("sequelize"); // Import Sequelize operators for querying

// **Create a New Group Chat**
exports.createGroup = async (req, res) => {
  try {
    const { roomName, createdBy, description, members } = req.body; // Extract data from request body

    // Validate required fields
    if (!roomName || !createdBy || members.length === 0) {
      return res.status(400).json({ message: "Please provide all required fields" });
    }

    // Create the new group chat in the database
    const newGroup = await Chatroom.create({
      roomName,
      createdBy,
      chatType: "group",
      description,
    });

    // Add the creator as an admin
    await ChatMembers.create({
      roomId: newGroup.roomId,
      userId: createdBy,
      role: "admin",
    });

    // Filter members to exclude the creator
    const filteredMembers = members.filter((userId) => userId !== createdBy);

    // Prepare bulk insertion for group members
    const memberData = filteredMembers.map((userId) => ({
      roomId: newGroup.roomId,
      userId,
      role: "member",
    }));

    // Bulk insert members if available
    if (memberData.length > 0) {
      await ChatMembers.bulkCreate(memberData);
    }

    res.status(201).json({
      message: "Group created successfully",
      group: newGroup,
      members: [createdBy, ...members],
    });
  } catch (error) {
    console.error("Error creating group:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// **Update Group Details**
exports.updateGroup = async (req, res) => {
  try {
    const { roomId } = req.params; // Extract room ID from request parameters
    const { roomName, description } = req.body; // Extract updated details

    // Find the group in the database
    const group = await Chatroom.findByPk(roomId);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    // Update group details
    await group.update({ roomName, description });

    res.status(200).json({ message: "Group updated successfully", group });
  } catch (error) {
    console.error("Error updating group:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// **Get Group Details**
exports.getGroupdetails = async (req, res) => {
  try {
    const { roomName } = req.params; // Extract group name from request parameters

    // Find group details including the creator's information
    const group = await Chatroom.findOne({
      where: { roomName },
      include: [
        {
          model: User,
          as: "creator",
          attributes: ["userId", "username"],
        },
      ],
    });

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    res.status(200).json(group);
  } catch (error) {
    console.error("Error fetching group details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// **Delete a Group Chat**
exports.deleteGroup = async (req, res) => {
  try {
    const { roomId } = req.params; // Extract room ID from request parameters

    // Find the chat room in the database
    const chatroom = await Chatroom.findOne({ where: { roomId } });

    if (!chatroom) {
      return res.status(404).json({ message: "Chatroom not found" });
    }

    // Delete group members first before removing the chatroom itself
    await ChatMembers.destroy({ where: { userId: chatroom.createdBy } });

    // Now, delete the chatroom
    await Chatroom.destroy({ where: { roomId } });

    res.status(200).json({ message: "Chatroom and its members deleted successfully" });
  } catch (error) {
    console.error("Error deleting chatroom:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
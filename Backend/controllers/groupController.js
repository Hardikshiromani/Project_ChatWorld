const { User, Message, Chatroom, ChatMembers } = require("../models"); // Fixed model names
const { Op } = require("sequelize");

exports.createGroup = async (req, res) => {
  try {
    const { roomName, createdBy, description, members } = req.body;

    if (!roomName || !createdBy || members.length === 0) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    //createe the group
    const newGroup = await Chatroom.create({
      roomName,
      createdBy,
      chatType: "group",
      description,
    });

    await ChatMembers.create({
      roomId: newGroup.roomId,
      userId: createdBy,
      role: "admin",
    });

    const filteredMembers = members.filter((userId) => userId !== createdBy);

    // ✅ Add Admin and Members
    const memberData = filteredMembers.map((userId) => ({
        roomId: newGroup.roomId,
      userId,
      role: "member",
    }));
    //   ];

    if (memberData.length > 0) {
      await ChatMembers.bulkCreate(memberData);
    }

    res.status(201).json({
      message: "group created Sucessfully",
      group: newGroup,
      members: [createdBy, ...members],
    });
  } catch (error) {
    console.error("Error creating group:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateGroup = async (req, res) => {
  try {
    const { roomId } = req.params;
    const { roomName, description } = req.body;

    const group = await Chatroom.findByPk(roomId);

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }
    await group.update({ roomName, description });
    res.status(200).json({ message: "Group updated successfully", group });
  } catch (error) {
    console.error("Error updating group:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getGroupdetails = async (req, res) => {
  try {
    const { roomName } = req.params;

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


exports.deleteGroup = async (req, res) => {
  try {
    const { roomId } = req.params;
    

    //find the Chatroom

    const chatroom= await Chatroom.findOne({where: {roomId}});

    if(!chatroom) return res.status(404).json({message:"Chatroom not Found"});

  //delete group members first (since ChatMenbers has no roomId)
  await  ChatMembers.destroy({where:{userId: chatroom.createdBy}});

 // Now, delete the chatroom
 await Chatroom.destroy({ where: { roomId } });

 res.status(200).json({ message: "Chatroom and its members deleted successfully" });

  } catch (error) {
    console.error("error deleting chatroom", error);
    return res.status(500).json({ error: "Internal server Error " });
  }
};

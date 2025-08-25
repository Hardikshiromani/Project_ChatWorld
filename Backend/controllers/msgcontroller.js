
const { User, Message, Chatroom, ChatMembers } = require('../models');


const getChatlist = async (req, res) => {
  const userId = req.query.userId;

  if (!userId) {
    return res.status(400).json({ error: 'userId is required' });
  }

  try {
    const chatlist = await ChatMembers.findAll({
      where: { userId },
      attributes: ['roomId', 'lastReadMessageId', 'isPinned', 'lastSeenAt'],
      include: [
        {
          model: Chatroom,
          as: 'chatroom', // 👈 Important alias
          attributes: ['roomName', 'chatType'],
          include: [
            {
              model: Message,
              as: 'messages', // 👈 Important alias
              // limit: 1,
              order: [['sentAt', 'DESC']],
              attributes: ['messageId', 'content', 'sentAt', 'senderId'],
            }
          ]
        }
      ],
      order: [['isPinned', 'DESC']],
    });

    res.json(chatlist);
  } catch (err) {
    console.error('Chatlist Error:', err);
    res.status(500).json({ error: 'Something went wrong' });
  }
};
const privateMessages = async (req, res) => {
  const { senderId, receiverId } = req.query;

  if (!senderId || !receiverId) {
    return res.status(400).json({ error: 'senderId and receiverId are required' });
  }

  try {
    // Messages sent from sender to receiver
    const messages1 = await Message.findAll({
      where: {
        senderId,
        receiverId
      },
      include: [
        {
          model: User,
          as: 'sender',
          attributes: ['userId', 'username'],
        
        },
        {
          model: User,
          as: 'receiver',
          attributes: ['userId', 'username'],
       // Ensure receiver is included
        }
      ]
    });

    // Messages sent from receiver to sender
    const messages2 = await Message.findAll({
      where: {
        senderId: receiverId,
        receiverId: senderId
      },
      include: [
        {
          model: User,
          as: 'sender',
          attributes: ['userId', 'username']
        },
        {
          model: User,
          as: 'receiver',
          attributes: ['userId', 'username']
        }
      ]
    });

    // Combine and sort
    const allMessages = [...messages1, ...messages2].sort((a, b) => new Date(a.sentAt) - new Date(b.sentAt));

    res.json(allMessages);
  } catch (error) {
    console.error('Private Messages Error:', error);
    res.status(500).json({ error: 'Something went wrong while fetching private messages' });
  }
}
module.exports = { privateMessages , getChatlist };
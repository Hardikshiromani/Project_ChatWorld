// controllers/chatController.js

// const getChatlist = async (req, res) => {
//     const userId = req.user.id; // Get from JWT/session
  
//     try {
//       const chatlist = await ChatMembers.findAll({
//         where: { userId },
//         attributes: ['roomId', 'lastReadMessageId', 'isPinned', 'lastSeenAt'],
//         include: [
//           {
//             model: ChatRoom,
//             attributes: ['roomName', 'chatType'],
//             include: [
//               {
//                 model: Message,
//                 limit: 1,
//                 order: [['sentAt', 'DESC']],
//                 attributes: ['messageId', 'content', 'sentAt', 'senderId'],
//               }
//             ]
//           }
//         ],
//         order: [['isPinned', 'DESC']],
//       });
  
//       res.json(chatlist);
  
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Failed to fetch chatlist' });
//     }
//   };
  
//   module.exports = { getChatlist };
  
// const { ChatMembers, ChatRoom, Message } = require('../models');
// const { Message, Chatroom, ChatMemberss } = require("../models");

// const getChatlist = async (req, res) => {
//   const userId = req.query.userId; // Pass userId as query param

//   if (!userId) {
//     return res.status(400).json({ error: 'userId is required' });
//   }

//   try {
//     const chatlist = await ChatMemberss.findAll({
//       where: { userId },
//       attributes: ['roomId', 'lastReadMessageId', 'isPinned', 'lastSeenAt'],
//       include: [
//         {
//           model: Chatroom,
//           attributes: ['roomName', 'chatType'],
//           include: [
//             {
//               model: Message,
//               limit: 1,
//               order: [['sentAt', 'DESC']],
//               attributes: ['messageId', 'content', 'sentAt', 'senderId'],
//             }
//           ]
//         }
//       ],
//       order: [['isPinned', 'DESC']],
//     });

//     res.json(chatlist);
//   } catch (err) {
//     console.error('Chatlist Error:', err);
//     res.status(500).json({ error: 'Something went wrong' });
//   }
// };
// const { ChatMembers, ChatRoom, Message } = require('../models');
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
// module.exports = { getChatlist };



// const privateMessages = async (req, res) => {
//   const { senderId, receiverId } = req.params;

//   if (!senderId || !receiverId) {
//     return res.status(400).json({ error: 'senderId and receiverId are required' });
//   }

//   try {
//     const messages = await Message.findAll({
//       where: {
//         [Op.or]: [
//           { senderId, receiverId },
//           { senderId: receiverId, receiverId: senderId }
//         ]
//       },
//       include: [
//         {
//           model: User,
//           as: 'sender',
//           attributes: ['userId', 'username']
//         },
//         {
//           model: User,
//           as: 'receiver',
//           attributes: ['userId', 'username']
//         }
//       ],
//       order: [['sentAt', 'ASC']]
//     });

//     res.json(messages);
//   } catch (error) {
//     console.error('Private Chat Error:', error);
//     res.status(500).json({ error: 'Failed to fetch private messages' });
//   }
// };



// const privateMessages = async (req, res) => {
//   const { senderId, receiverId } = req.query;

//   if (!senderId || !receiverId) {
//     return res.status(400).json({ error: 'senderId and receiverId are required' });
//   }

//   try {
//     const messages = await Message.findAll({
//       where: {
//         // Use Sequelize's plain object syntax
//         // Messages where (senderId=senderId AND receiverId=receiverId)
//         // OR (senderId=receiverId AND receiverId=senderId)
//         // But written explicitly without Op.or
//         [Sequelize.literal(`(senderId = ${senderId} AND receiverId = ${receiverId}) OR (senderId = ${receiverId} AND receiverId = ${senderId})`)]: true
//       },
//       include: [
//         {
//           model: User,
//           as: 'sender',
//           attributes: ['userId', 'username']
//         },
//         {
//           model: User,
//           as: 'receiver',
//           attributes: ['userId', 'username']
//         }
//       ],
//       order: [['sentAt', 'ASC']]
//     });

//     res.json(messages);
//   } catch (error) {
//     console.error('Private Messages Error:', error);
//     res.status(500).json({ error: 'Something went wrong while fetching private messages' });
//   }
// };


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
          attributes: ['userId', 'username']
        },
        {
          model: User,
          as: 'receiver',
          attributes: ['userId', 'username']
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
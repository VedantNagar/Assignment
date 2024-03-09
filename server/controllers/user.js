const User = require('../models/User');

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id); //find user by id
    user.password = undefined;
    res.status(200).json(user);
  } catch (error) {
    console.log('error1');
    res.status(404).json({ message: error.message });
  }
};

const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const friends = await Promise.all(
      user.friends.map((friendID) => User.findById(friendID))
    ); //find all friends
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, picturePath }) => {
        return {
          _id,
          firstName,
          lastName,
          occupation,
          picturePath,
        };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (error) {
    console.log('error2');
    res.status(404).json({ message: error.message });
  }
};

//UPDATE
const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendID } = req.params;
    const user = await User.findById(id);
    let friend = await User.findById(friendID);
    if (user.friends.includes(friendID)) {
      user.friends = user.friends.filter((id) => id.toString() !== friendID);
      friend.friends = friend.friends.filter((id) => id.toString() !== id);
    } else {
      user.friends.push(friendID);
      friend.friends.push(id);
    } //add or remove friend
    await user.save();
    await friend.save();

    friend = await Promise.all(
      user.friends.map((friendID) => User.findById(friendID))
    ); //find all friends
    const formattedFriends = friend.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return {
          _id,
          firstName,
          lastName,
          occupation,
          location,
          picturePath,
        };
      }
    ); //format friends
    res.status(200).json(formattedFriends);
  } catch (error) {
    console.log(error);
    console.log('error3');
    res.status(404).json({ message: error.message });
  }
};
module.exports = {
  getUser,
  getUserFriends,
  addRemoveFriend,
};

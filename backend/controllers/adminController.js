const { User } = require("../schemes/UserSchema.js");

const adminGetUsers = async (req, res) => {
    try {
        const users = await User.find();

        res.status(200).json({
            message: "Список юзеров",
            users: users.map(user => ({
                name: user.name,
                lastName: user.lastName,
                email: user.email,
                phone: user.phone,
            }))
        });
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Error on server' });
    }
}

const adminRemoveUser = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        const deletedUser = await User.findOneAndDelete({ email });

        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            message: `User with email: ${email} was removed!`
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Something went wrong" });
    }
};

module.exports = {
    adminGetUsers,
    adminRemoveUser,
}
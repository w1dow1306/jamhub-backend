async function olduser(user) {
    const x = await User.find({ username: user.username }).countDocuments()
    let msg = ((x > 0) ? 0 : 1);
    return msg
}

async function adduser(user) {
    let n = 1;
    while (n !== 0) {
        n = await User.find({ id: user.id }).countDocuments()
        user.id = Math.floor(Math.random() * 1000).toString() + (new Date().getSeconds());
    }
    const newuser = new User(user)
    const id = await newuser.save();
    return (id.id)
}
module.exports = {olduser,adduser}
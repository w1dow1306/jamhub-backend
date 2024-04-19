const { query } = require('../functions/mysql');





// GET ALL TODOS
exports.getAlltodos = async (req, res) => {
    try {
        const data = await query('select * from todos');
        res.json(data);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }
};

// GET TODOS OF SPECIFIC USER

exports.getIdtodos = async (req, res) => {
    try {
        const data = await query('select * from todos where uid =' + req.params.id);
        res.send(data)
    } catch (error) {
        res.status(500).json({ message: "There was an error please contact us" });
    }
}


// GET TODOS OF my todos

exports.getmytodos = async (req, res) => {
    try {
        const uid = req.cookies["token"]
        const data = await query('select * from todos where uid =' + uid);
        res.send(data)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "There was an error please contact us" });
    }
}



//Create a new todo

exports.createtodo = async (req, res) => {
    // res.send(`insert into todos (uid, title, \`desc\`, body, priority, status) values (${uid}, '${title}', '${desc}', '${body}', ${prior}, ${status});`);
    try {
        const { title, desc, body, prior, status } = req.body;
        let uid = req.cookies["token"];
        let t_id = (new Date().getSeconds() + String.fromCharCode(Math.floor(Math.random() * 26) + 97) + title[0] + prior + Math.floor((Math.random() * 10))).toString();
        const data = await query(`insert into todos (uid, title, \`desc\`, body, priority, status,t_id) values (${uid}, '${title}', '${desc}', '${body}', ${prior}, ${status},'${t_id}');`);
        res.send({ message: "added successfully", t_id: t_id });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error please try again!" });
    }
}




// Delete todo
exports.deletetodo = async (req, res) => {
    try {
        const { t_id } = req.body;
        const uid = req.cookies["token"];

        const data = await query(`select * FROM todos WHERE t_id = '${t_id.trim()}'`);
        await query(`delete FROM todos WHERE t_id = '${t_id.trim()}' and uid=${uid};`);
        res.json({ message: data });
    } catch (error) {
        res.status(500).json({ message: error });
    }
}


//update priority,status
exports.updatetodo = async (req, res) => {
    try {
        let { t_id, status, title, desc, body, c } = req.body;
        if (c == true) {
            await query(`delete from todos where t_id='${t_id}'`);
        }
        let uid = req.cookies["token"];
        if (!status) {
            status = (await query(`select status from todos where t_id='${t_id}' and uid=${uid};`))[0]["status"];
        }
        if (!body) {
            body = (await query(`select body from todos where t_id='${t_id}' and uid=${uid};`))[0]["body"];
        }
        if (!desc) {
            desc = (await query(`select \`desc\` from todos where t_id='${t_id}' and uid=${uid};`))[0]["desc"];
        }
        if (!title) {
            title = (await query(`select title from todos where t_id='${t_id}' and uid=${uid};`))[0]["title"];
        }
        await query(`update todos set status=?, title=?, \`desc\`=?, body=? where uid=? and t_id=?`, [status, title, desc, body, uid, t_id]);
        // const data = await query(`select * from  todos where uid=? and t_id=?`, [uid, t_id]);
        res.json({ message: "updated" });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error });
    }
}

module.exports = async() => {

    const fs = require('fs');
    const sqlite3 = require('sqlite3').verbose();
    var db;
    var user;


    if (fs.existsSync('./database.db')) {
        // exists
        console.log('file exists');
        db = await database();
    } else {
        //doesnt exists
        console.log('file does not exists');
        db = await database();

        //create table
        await db.serialize(() => {
            db.each('CREATE TABLE [Users] ([username] varchar(50)  NOT NULL ,[password] varchar(50)  NOT NULL ,id integer primary key )', (rr, err, r) => { console.log(r) })
            db.each('CREATE TABLE [Pages] ([id] integer  primary key,[owner] integer  NOT NULL ,[title] varchar(50)  NOT NULL, [html] blob, foreign key (owner) references Users(id))')
            db.each('CREATE TABLE [Links] ([id] integer  primary key,[user_id] int  NOT NULL ,[page_id] int  NOT NULL, [address] varchar(50), [text] varchar(50), foreign key (user_id) references Users(id),foreign key (page_id) references Pages(id))')

            db.each('insert into Users values ("willroy", "12345678", NULL)')
            db.each('insert into Users values ("myles", "12345678", NULL)')

        })

    }








    await db.serialize(() => {
        db.each('select * from Users', (s, e, r) => {
            //console.log(r)
            //console.log(e)
        });
    })


    async function database() {
        var db = await new sqlite3.Database('./database.db', (err) => {
            if (err) console.log(err)
            else return db;

        });
        return db;
    }

    async function savePage(pageName, pageBody) {
        var buf = Buffer.from(pageBody, 'utf-8');

        await db.run(`INSERT INTO Pages VALUES(?,?,?,?)`, ['NULL', 1, pageName, buf], function(err) {
            if (err) {
                return console.log(err.message);
            }
            // get the last insert id
            console.log(`A row has been inserted with rowid ${this.lastID}`);
        });

    }
    module.exports.db = db;
    module.exports.savePage = savePage;

}
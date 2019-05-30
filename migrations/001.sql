-- Exported from QuickDBD: https://www.quickdatatabasediagrams.com/
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.

-- Modify this code to update the DB schema diagram.
-- To reset the sample schema, replace everything with
-- two dots ('..' - without quotes).

-- Up

CREATE TABLE [Users] (
    [username] varchar(50)  NOT NULL ,
    [password] varchar(50)  NOT NULL ,
    [id] int  NOT NULL ,
    CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED (
        [id] ASC
    )
)

CREATE TABLE [Pages] (
    [id] int  NOT NULL ,
    [owner] int  NOT NULL ,
    [title] varChar(50)  NOT NULL ,
    [html] blob  NOT NULL 
)

CREATE TABLE [Links] (
    [id] int  NOT NULL ,
    [user_id] int  NOT NULL ,
    [page_id] int  NOT NULL ,
    [address] varchar(50)  NOT NULL ,
    [text] varchar(50)  NOT NULL ,
    CONSTRAINT [PK_Links] PRIMARY KEY CLUSTERED (
        [id] ASC
    )
)

insert into Users Values('willroy', '123456', 1)

ALTER TABLE [Pages] WITH CHECK ADD CONSTRAINT [FK_Pages_owner] FOREIGN KEY([owner])
REFERENCES [Users] ([id])

ALTER TABLE [Pages] CHECK CONSTRAINT [FK_Pages_owner]

ALTER TABLE [Links] WITH CHECK ADD CONSTRAINT [FK_Links_user_id] FOREIGN KEY([user_id])
REFERENCES [Users] ([id])

ALTER TABLE [Links] CHECK CONSTRAINT [FK_Links_user_id]

ALTER TABLE [Links] WITH CHECK ADD CONSTRAINT [FK_Links_page_id] FOREIGN KEY([page_id])
REFERENCES [Pages] ([id])

ALTER TABLE [Links] CHECK CONSTRAINT [FK_Links_page_id]

-- Down
Drop Table [Users]
Drop Table [Pages]
Drop Table [Links]
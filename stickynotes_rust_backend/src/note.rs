use serde::{Deserialize, Serialize};
use mongodb::bson::doc;
use std::time::SystemTime;

#[derive(Clone, Debug, PartialEq, Eq, Deserialize, Serialize)]

pub enum Color {
    Yellow,
    Green,
    Pink,
    Purple,
    Blue,
    Gray,
    Black
}

#[derive(Clone, Debug, PartialEq, Eq, Deserialize, Serialize)]
pub struct Note {
    pub date: SystemTime,
    pub _id: mongodb::bson::oid::ObjectId,
    pub content: String,
    pub color: Color
}


/*  
created this struct NoteContent cause i was needing an id when creating a note but idont want 
to make my own id cause mongodb does that i honestly dont know what im doing its taken me a whole hour to make what i would thik
 is a simple get and post in a web api but im between looking at docs that dont make sense to me and chatgpt that
  doesnt know any of the methods
*/ 


#[derive(Clone, Debug, PartialEq, Eq, Deserialize, Serialize)]
pub struct NoteContent {
    pub content: String
}



#[derive(Clone, Debug, PartialEq, Eq, Deserialize, Serialize)]
pub struct NoteColor {
    pub color: Color
}
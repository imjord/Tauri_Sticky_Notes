mod note;

use note::Color;
use note::Note;
use note::NoteColor;
use note::NoteContent;
use actix_web::{get, post, delete, put, http, web, App, HttpResponse, HttpServer};
use mongodb::{bson::doc, bson::oid::ObjectId, Client, Collection};

use futures_util::stream::StreamExt;
use actix_cors::Cors;
use std::time::SystemTime;


// RUST AND MONGOOOOOOOOOOODB STICKY NOTES FOR MY TAURI STICKY NOTES


const DB_NAME: &str = "tauri_stickynotes_backend";
const COLL_NAME: &str = "notes";




#[get("/notes")]
async fn get_notes(client: web::Data<Client>) -> HttpResponse {
    // get the collection
    let collection: Collection<Note> = client.database(DB_NAME).collection(COLL_NAME);
    // find() on the collection with no filters or options. this will return a cursor
    let mut cursor = collection.find(None, None).await.expect("cant fetch notes");
    // empty vec of Note type
    let mut notes: Vec<Note> = Vec::new();

    // loop over the cursor 
    while let Some(doc) = cursor.next().await {
       
        match doc {
            Ok(note) => {
                notes.push(note);
            }
            Err(_err) => {
                return HttpResponse::InternalServerError().body(_err.to_string());
            }
        }
    }
    // if nothing pushed into notes then no notes found
    if !notes.is_empty() {
        println!("{:?}", notes);
        HttpResponse::Ok().json(notes)
    } else {
        HttpResponse::NotFound().body("no notes found")
    }

}



// get a single note
#[get("/notes/{_id}")]
async fn get_single_note(client: web::Data<Client>, _id: web::Path<String>) -> HttpResponse {
    let _id = _id.into_inner();

    // parse the id to object id cause i kept just getting a string id with the below commented code 
    let object_id = match ObjectId::parse_str(&_id) {
        Ok(object_id) => object_id,
        Err(_) => return HttpResponse::BadRequest().body("Invalid ID format"),
    };

    let collection: Collection<Note> = client.database(DB_NAME).collection(COLL_NAME);
    match collection.find_one(doc! {"_id": object_id}, None).await {
        Ok(Some(note)) => HttpResponse::Ok().json(note),
        Ok(None) => HttpResponse::NotFound().body(format!("No note found with that id!")),
        Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
    }
    // let _id = _id.into_inner();
    // let collection: Collection<Note> = client.database(DB_NAME).collection(COLL_NAME);
    // print!("{:?}", _id);
    // match  collection.find_one(doc! {"_id": &_id}, None).await
    // {
    //     Ok(Some(note)) => {
    //         println!("{:?}", note);
    //         HttpResponse::Ok().json(note)
    //     }
    //     Ok(None) => {
    //         HttpResponse::NotFound().body(format!("No note found with that id!"))
    //     }
    //     Err(err) => HttpResponse::InternalServerError().body(err.to_string())
    // }
}


// delete a note
#[delete("/notes/{_id}")]
async fn delete_note(client: web::Data<Client>, _id: web::Path<String>) -> HttpResponse {
    let _id = _id.into_inner();

   
    let object_id = match ObjectId::parse_str(&_id) {
        Ok(object_id) => object_id,
        Err(_) => return HttpResponse::BadRequest().body("Invalid ID format specified"),
    };

    let collection: Collection<Note> = client.database(DB_NAME).collection(COLL_NAME);
    match collection.delete_one(doc! {"_id": object_id}, None).await {
        Ok(_note) => HttpResponse::Ok().body(format!("Note deleted !")), 
        Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
    }
}

// add a note
#[post("/notes")]
async fn add_note(client: web::Data<Client>, form: web::Form<NoteContent>) -> HttpResponse {
    let collection: Collection<Note> = client.database(DB_NAME).collection(COLL_NAME);

    let note = Note {
        date: SystemTime::now(),
        color: Color::Yellow,
        _id: mongodb::bson::oid::ObjectId::new(),
        content: form.content.clone(),
    };

    match collection.insert_one(note.clone(), None).await {
        Ok(_) => HttpResponse::Ok()
            .content_type("application/json")
            .json(note),
        Err(err) => HttpResponse::InternalServerError().body(format!(
            "Failed to add note: {}",
            err.to_string()
        )),
    }
}

// update a note content
#[put("/notes/{_id}")]
async fn update_note(client: web::Data<Client>,   form: web::Json<NoteContent>, _id: web::Path<String>) -> HttpResponse {
    let _id = _id.into_inner();

    // parse the id to object id cause i kept just getting a string id with the below commented code 
    let object_id = match ObjectId::parse_str(&_id) {
        Ok(object_id) => object_id,
        Err(_) => return HttpResponse::BadRequest().body("Invalid ID format"),
    };

    let collection: Collection<Note> = client.database(DB_NAME).collection(COLL_NAME);

    let existing_note_filter = doc! {"_id": object_id};


    match collection.find_one(existing_note_filter.clone(), None).await {
        Ok(Some(mut existing_note)) => {
            existing_note.content = form.content.clone();

                match collection.replace_one(existing_note_filter.clone(), existing_note.clone(), None).await {
                    Ok(_) => {
                        HttpResponse::Ok().json(existing_note.clone()) //IM CLONING EVERYTHING CAUSE WHO CARES BOUT MEMORY
                    }
                    Err(err) => {
                        HttpResponse::InternalServerError().body(err.to_string())
                    }
                }

        } 

        Ok(None) => {
            HttpResponse::NotFound().body("Not found!")

        }

        Err(err)=> {
            HttpResponse::InternalServerError().body(err.to_string())
        }

    }
}

// update a notes color.
#[put("/notes/color/{_id}")]
async fn update_note_color(client: web::Data<Client>, form: web::Json<NoteColor>, _id: web::Path<String>) -> HttpResponse {
    let _id = _id.into_inner();

    // parse the id to object id cause i kept just getting a string id with the below commented code 
    let object_id = match ObjectId::parse_str(&_id) {
        Ok(object_id) => object_id,
        Err(_) => return HttpResponse::BadRequest().body("Invalid ID format"),
    };

    let collection: Collection<Note> = client.database(DB_NAME).collection(COLL_NAME);

    let existing_note_filter = doc! {"_id": object_id};


    match collection.find_one(existing_note_filter.clone(), None).await {
        Ok(Some(mut existing_note)) => {
            existing_note.color = form.color.clone();

                match collection.replace_one(existing_note_filter.clone(), existing_note.clone(), None).await {
                    Ok(_) => {
                        HttpResponse::Ok().json(existing_note.clone()) 
                    }
                    Err(err) => {
                        HttpResponse::InternalServerError().body(err.to_string())
                    }
                }

        } 

        Ok(None) => {
            HttpResponse::NotFound().body("Not found!")

        }

        Err(err)=> {
            HttpResponse::InternalServerError().body(err.to_string())
        }

    }

}


// search by content

#[get("/notes/note/{content}")]
async fn find_note(client: web::Data<Client>, content: web::Path<String>) -> HttpResponse {
    let content = content.into_inner();

    let collection: Collection<Note> = client.database(DB_NAME).collection(COLL_NAME);


    let existing_note_filter = doc! {"content": content};

    match collection.find_one(existing_note_filter, None).await {
        Ok(Some(some_content)) => HttpResponse::Ok().json(some_content),
        Ok(None) => {
            HttpResponse::NotFound().body(format!("No note found with that content"))
        }
        Err(err) => HttpResponse::InternalServerError().body(err.to_string())
    }
}




#[actix_web::main]
async fn main() -> std::io::Result<()>{
    let client = Client::with_uri_str("mongodb://127.0.0.1:27017/tauri_stickynotes_backend").await.expect("failed to connect to db");

    HttpServer::new(move || {
        let cors = Cors::default().allow_any_origin()
        .allowed_headers(vec![http::header::AUTHORIZATION, http::header::ACCEPT])
        .allowed_header(http::header::CONTENT_TYPE).allowed_methods(vec!["GET", "POST", "DELETE", "PUT"]);
        App::new().wrap(cors).app_data(web::Data::new(client.clone())).service(find_note).service(add_note).service(get_notes).service(get_single_note).service(delete_note).service(update_note).service(update_note_color)
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}

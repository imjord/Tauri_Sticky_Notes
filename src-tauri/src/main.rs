// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]


use tauri::{Runtime, Manager, AppHandle};
use window_shadows::set_shadow;




#[tauri::command]
fn set_note_shadow<R: Runtime>(app: AppHandle<R>, label: &str) {
	let window = app.get_window(label).unwrap();
	#[cfg(any(windows, target_os = "macos"))]
	set_shadow(&window, true).unwrap();
}



fn main() {
    tauri::Builder::default()
        .setup(|app| {
            let window = app.get_window("main").unwrap();
            set_shadow(&window, true).expect("Unsupported platform!");
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![set_note_shadow])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
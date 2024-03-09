// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use async_ssh2_tokio::client::{AuthMethod, Client, ServerCheckMethod};
use tauri::Manager;

static mut CLIENT: Option<Client> = None;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}
#[tauri::command]
async fn connect_ssh(
    host: String,
    port: u16,
    username: String,
    password: String,
) -> Result<bool, String> {
    println!("I was invoked from JS!");
    let auth_method = AuthMethod::with_password(&password);
    let client_result = Client::connect(
        (host, port),
        &username,
        auth_method,
        ServerCheckMethod::NoCheck,
    )
    .await;
    unsafe {
        CLIENT = match client_result {
            Ok(client) => Some(client),
            Err(error) => {
                println!("Error: {:?}", error);
                return Err("Connect to SSH failed".into());
            }
        };
        if let Some(client) = &CLIENT {
            let test_connect = client.execute("echo Hello SSH").await;
            match test_connect {
                Ok(result) => {
                    println!("Result: {:?}", result);
                    println!("Connected to SSH");
                    assert_eq!(result.stdout, "Hello SSH\n");
                    assert_eq!(result.exit_status, 0);
                    return Ok(true);
                }
                Err(error) => {
                    println!("Test Connect Error: {:?}", error);
                    return Err("Connect to SSH failed".into());
                }
            };
        } else {
            println!("Client is None");
            return Err("Connect to SSH failed".into());
        }
    }
}

#[tauri::command]
async fn execute_ssh_command(command: String) -> Result<String, String> {
    unsafe {
        if let Some(client) = &CLIENT {
            let result = client.execute(&command).await;
            match result {
                Ok(result) => {
                    println!("Result: {:?}", result);
                    if !result.stdout.is_empty() { return Ok(result.stdout.trim().to_string()) }
                    else                          { return Err(result.stderr.trim().to_string()) }
                }
                Err(error) => {
                    println!("Error: {:?}", error);
                    return Err(error.to_string());
                }
            }
        } else {
            println!("Client is None");
            return Err("Execute SSH command failed".into());
        }
    }
}

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_store::Builder::default().build())
        .setup(|app| {
            #[cfg(debug_assertions)] // only include this code on debug builds
            {
                let window = app.get_window("main").unwrap();
                window.open_devtools();
                window.close_devtools();
            }
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![greet, connect_ssh,execute_ssh_command])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

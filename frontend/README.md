# Markdown Notes App

A full-stack Markdown Notes Application built using React, Node.js (Express), and SQLite.  
This app allows users to create, edit, delete, and preview Markdown notes in real time.

## Features

- Create, edit, update, and delete notes
- Live Markdown preview
- Dark mode support
- Responsive UI
- Persistent storage using SQLite


## Tech Stack

### Frontend
- React.js
- Axios
- React Markdown

### Backend
- Node.js
- Express.js
- SQLite3


## Project Structure

markdown-notes-app/
├── backend/
│   ├── db.js
│   ├── server.js
│   ├── notes.db
│   ├── package.json
│
└── frontend/
    ├── src/
    ├── public/
    ├── package.json


## Prerequisites

Make sure these are installed:

- Node.js (v16+ recommended)
- npm


## Environment Variables

No external environment variables are required for this project.

The backend uses:
- Port: 5000
- SQLite database file: notes.db

If needed, you can change the backend port in:
backend/server.js

And update frontend API URL in:
frontend/src/App.js

## Installation & Setup

### 1. Clone Repository

```bash
git clone https://github.com/ganeshk314/Notes-application.git
cd frontend

## Deploy Link
https://notes-application-ruby.vercel.app/

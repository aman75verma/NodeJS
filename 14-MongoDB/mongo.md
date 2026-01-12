# MongoDB Local Setup & Workflow Guide

## 1. Components Overview
* **`mongod` (Server/Daemon):** The actual database engine. Must be running for anything else to work.
* **`mongosh` (CLI Client):** Command-line interface for scripting and quick admin tasks.
* **Compass (GUI Client):** Visual dashboard for viewing data and schema management.

---

## 2. Standard Workflow
**Flow:** `Start Server (mongod)` -> `Connect Client (Compass/mongosh)` -> `Interact`

### Step A: Start the Server
*Verify installation:* `mongod --version`

**Windows**
* **Service (Recommended):** Run Command Prompt as Admin -> `net start MongoDB`
* **Manual:** Run `mongod` (Keep terminal window open).

**Mac (Homebrew)**
* **Service:** `brew services start mongodb-community`

### Step B: Connect
* **Connection String (URI):** `mongodb://localhost:27017`
* **In Compass:** Paste URI into the connection box -> Click "Connect".
* **In Terminal:** Type `mongosh` (Defaults to localhost:27017).

---

## 3. CLI Cheatsheet (`mongosh`)

### Database Management
| Action | Command |
| :--- | :--- |
| **List Databases** | `show dbs` |
| **Switch/Create DB** | `use <db_name>` *(Created lazily on first insert)* |
| **Check Current DB** | `db` |
| **Drop Current DB** | `db.dropDatabase()` |

### Collection & Data Operations
| Action | Command |
| :--- | :--- |
| **List Collections** | `show collections` |
| **Create Collection** | `db.createCollection("users")` |
| **Insert One** | `db.users.insertOne({ name: "Aman", age: 25 })` |
| **Find All** | `db.users.find()` |
| **Find Specific** | `db.users.find({ name: "Aman" })` |
| **Format Output** | `db.users.find().pretty()` |

---

## 4. Troubleshooting
* **Connection Refused:** Ensure `mongod` is running. Check Task Manager/Activity Monitor.
* **"Data Directory Not Found":**
    * **Windows:** Create folder `C:\data\db`.
    * **Mac/Linux:** Create `/data/db` or use `mongod --dbpath <path>`.
* **Port In Use:** Another instance of Mongo is running. Kill the process or restart machine.
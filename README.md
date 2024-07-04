# Admin Dashboard

## Prerequisites

Before you can run this application, make sure you have the following installed:

- Node.js (version 22.3.0)
- npm (version 10.8.1)
- Angular CLI (version 18.0.6)

## Installation

1. **Clone the repository**:

```sh
git clone https://github.com/marinactonci/admin-dashboard.git
cd admin-dashboard
```

2. **Install dependencies**:

```sh
npm install
```

3. **Install JSON Server** (if not already installed globally):

```sh
npm install -g json-server
```

## Running the Application

1. **Start JSON Server**:

JSON Server will serve as our mock backend. Make sure to run it from the project directory where `db.json` is located.

```sh
json-server --watch db.json
```

By default, JSON Server runs on port 3000. Ensure it is running before starting the Angular application.

2. **Start the Angular Application**:

Open another terminal window in the project directory and run:

```sh
ng serve
```

This will start the Angular development server. By default, the application will be accessible at `http://localhost:4200`.

3. **Access the Application**:

Open your web browser and navigate to:

```sh
http://localhost:4200
```

## Usage

**Login**:

- Use any user credentials present in `db.json` under the `users` array.
- The credential for admin user is:

```json
{
  "email": "admin@mail.com",
  "password": "admin"
}
```

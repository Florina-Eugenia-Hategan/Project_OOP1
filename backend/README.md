# Backend Setup

## My Project Structure
When I started working on the backend, I organized it as follows:

```
backend/
├── db.sqlite3
├── manage.py
├── math_operations.log
├── requirements.txt
├── app/
│   ├── admin.py
│   ├── models.py
│   ├── serializers.py
│   ├── tests.py
│   ├── urls.py
│   ├── views.py
│   └── management/
│       └── commands/
│           └── remove_duplicate_emails.py
├── migrations/
│   ├── __init__.py
│   ├── 0001_initial.py
│   ├── 0002_user2fa_totp_secret.py
│   ├── 0003_remove_user2fa_totp_secret.py
│   └── 0004_alter_user2fa_email.py
├── templates/
│   ├── calculations.html
│   ├── login.html
│   └── verify_2fa.html
├── mathapi/
│   ├── __init__.py
│   ├── asgi.py
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── operations/
│   ├── __init__.py
│   ├── admin.py
│   ├── apps.py
│   ├── models.py
│   ├── serializers.py
│   ├── tests.py
│   ├── urls.py
│   └── views.py
├── staticfiles/
│   ├── admin/
│   │   ├── css/
│   │   ├── img/
│   │   └── js/
│   └── rest_framework/
│       ├── css/
│       ├── docs/
│       ├── fonts/
│       ├── img/
│       └── js/
```

## Installation Steps

To install and set up the backend from GitHub, follow these steps:

1. **Clone the repository**
   - Open your terminal and run the following command to clone the project:
     ```bash
     git clone <repository-url>
     ```
   - Replace `<repository-url>` with the URL of the GitHub repository.

2. **Navigate to the backend directory**
   - Move into the `backend` folder:
     ```bash
     cd backend
     ```

3. **Create a virtual environment**
   - A virtual environment is used to isolate dependencies. Run:
     ```bash
     python -m venv venv
     ```
   - Activate the virtual environment:
     - On Windows:
       ```bash
       venv\Scripts\activate
       ```
     - On macOS/Linux:
       ```bash
       source venv/bin/activate
       ```

4. **Install dependencies**
   - Update `pip` to the latest version:
     ```bash
     python -m pip install --upgrade pip
     ```
   - Install the required packages:
     ```bash
     pip install -r requirements.txt
     ```

5. **Apply database migrations**
   - Set up the database schema:
     ```bash
     python manage.py migrate
     ```

6. **Start the development server**
   - Run the following command to start the server:
     ```bash
     python manage.py runserver
     ```
   - The server will start, and you can access the backend at `http://127.0.0.1:8000/`.

## Notes
- Ensure Python 3.11 is installed on your system.
- If environment variables are required, create a `.env` file in the `backend` directory and add the necessary variables.
- Static files are collected in the `staticfiles/` directory.

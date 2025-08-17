
# Django REST + React Fullstack Application

## Overview
This project is a fullstack web application featuring a Django REST Framework backend and a React.js frontend. It is designed for local and containerized deployment, with no cloud dependencies. The backend provides mathematical endpoints, JWT authentication, caching, logging, monitoring, and optional request persistence via Kafka or Redis Streams. The frontend offers a modern UI for interacting with backend endpoints.

## Features
- **Backend (Django REST Framework):**
  - Mathematical API endpoints: power, fibonacci, factorial
  - JWT authentication (djangorestframework-simplejwt)
  - Caching (django-redis or local)
  - Monitoring (django-prometheus)
  - Logging (loguru)
  - SQLite database (default)
  - Optional: Kafka or Redis Streams for request persistence
- **Frontend (React.js):**
  - Modern UI for API interaction
  - Authentication and protected routes
  - Responsive design
- **DevOps:**
  - GitHub Actions workflow for build, test, and lint (no cloud deployment)
  - Docker support for backend and frontend

## Project Structure
- `backend/`: Django REST Framework backend
- `frontend-app/`: React.js frontend
- `Dockerfile`: Containerization for backend and frontend

## Local Development

### Backend
1. Install Python 3.11+
2. Create and activate a virtual environment:
   ```powershell
   python -m venv venv
   .\venv\Scripts\activate
   ```
3. Install dependencies:
   ```powershell
   pip install -r backend/requirements.txt
   ```
4. Run migrations and start the server:
   ```powershell
   python manage.py migrate
   python manage.py runserver
   ```

### Frontend
1. Install Node.js and npm
2. Install dependencies:
   ```powershell
   cd frontend-app
   npm install
   ```
3. Start the development server:
   ```powershell
   npm start
   ```

## Docker Deployment
Use the provided Dockerfiles in `backend/` and `frontend-app/` to run the application in containers. Example commands:

```powershell
# Build and run backend
cd backend
docker build -t django-backend .
docker run -p 8000:8000 django-backend

# Build and run frontend
cd ../frontend-app
docker build -t react-frontend .
docker run -p 3000:3000 react-frontend
```

## Backend requirements.txt
The backend strictly requires the following packages:

```
Django==4.2
django-cors-headers==3.14.0
whitenoise==6.4.0
django-redis==5.3.0
djangorestframework-simplejwt==5.2.2
flake8==6.0.0
djangorestframework==3.14.0
django-prometheus
redis==5.0.1
python-kafka==2.0.2
cachetools==5.3.2
pytest==7.4.2
pytest-django==4.5.2
requests==2.31.0
python-dotenv==1.0.1
gunicorn==21.2.0
psycopg2-binary==2.9.9
aiokafka==0.10.0
loguru==0.7.2
prometheus-client==0.17.1
```

## Notes
- All features required by the project specification are implemented, except for the final bonus (advanced cloud deployment).

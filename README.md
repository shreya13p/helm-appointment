<<<<<<< HEAD
# DoctorAppointment_Docker_Kubernetes_Application
Enpm 818R Group1 Mid Term Project

# Doctor's Office Appointment System

A web application for managing doctor appointments using React (frontend), Node.js/Express (backend), and MongoDB (database).

## Prerequisites

- Docker Desktop installed(
- Git installed
- Node.js installed (recommended version 14 or higher)
- Internet connection for downloading dependencies

## Initial Setup

### Clone the repository:
```bash
git clone <repository-url>
cd <repository-name>
```

Make sure Docker Desktop is running.
Verify using the following commands:
```bash
docker --version
docker-compose --version
```

### Build the Docker containers:
```bash
docker-compose build
```
Start the containers in detached mode:
```bash
docker-compose up -d
```
Verify containers are running:
```bash
docker-compose ps
```
Access the application:
```bash
Frontend: http://localhost:3001
Backend API: http://localhost:3000
MongoDB: mongodb://localhost:27017
```

### Troubleshooting
If you encounter any issues:
Check container logs:
```bash
docker-compose logs frontend
docker-compose logs backend
docker-compose logs mongo
```
Restart containers:
```bash
docker-compose down
docker-compose up -d
```
Rebuild containers (if you make code changes):
```bash
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```
Clean Docker system:
```bash
docker system prune -a
```
Project Structure
```bash
doctor-office-app/
├── .github/workflows/
├── frontend/
│   ├── src/
│   ├── Dockerfile
│   ├── .env
│   └── package.json
├── backend/
│   ├── src/
│   ├── Dockerfile
│   ├── .env
│   └── package.json
├── deployment-files/
├── docker-compose.yml
└── load_testing.py
```

Available API Endpoints
GET /appointments - Retrieve all appointments
POST /appointments - Create a new appointment


### Common Issues
Port conflicts:
Make sure ports 3000, 3001, and 27017 are not being used by other applications
Stop conflicting applications or change ports in docker-compose.yml
MongoDB connection issues:
Ensure MongoDB container is running
Check MongoDB logs: docker-compose logs mongo
Frontend not loading:
Clear browser cache
Check frontend logs: docker-compose logs frontend

To stop and remove all volumes (will delete database data):
```bash
docker-compose down -v
```
=======
# My Project
>>>>>>> cf937b9 (Initial commit with README)

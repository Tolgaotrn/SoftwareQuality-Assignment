# Assessment Scheduling System

## Introduction
The **Assessment Scheduling System** is a web application developed to streamline the creation and management of assessment maps for the Universidade Portucalense. The system ensures compliance with mandatory requirements, minimizes scheduling conflicts, and simplifies the assignment of resources, such as rooms and equipment.

## Key Features
- **Role-Based Access**:
  - **Administrator**: Configure semester timelines, define exam periods, and manage overall schedules.
  - **User (Course Coordinator)**: Create assessment maps for courses and manage individual assessment elements.
- **Assessment Types**:
  - Mixed and Continuous assessment categories with specific requirements.
  - Supports diverse evaluation formats, including tests, project submissions, presentations, monographs, and more.
- **Conflict Management**:
  - Avoids overlapping assessment dates.
  - Ensures a minimum interval between assessments when possible.
- **Room Assignment**:
  - Automatically allocates rooms based on student numbers and equipment needs.

## Technologies Used
- **Frontend**: React with TypeScript
- **Backend**: TypeScript, Node.js and Java
- **Database**: PostgreSQL
- **Tools**: Maven, IntelliJ IDE, Git/GitHub, Jest for testing

## How to Use the Application
### For Users (Course Coordinators):
1. **Login** to the system.
2. **Select a Course** from the dashboard.
3. **Add Assessments**:
   - Specify type, weighting, date/time, and location.
   - Indicate whether computers are required.
4. **Review** the generated schedule for conflicts and overlaps.
5. **Submit** the final assessment map.

### For Administrators:
1. **Login** with administrator credentials.
2. **Configure Semester Details**:
   - Set start and end dates.
   - Define exam periods (normal, appeal, and special).
3. **Monitor and Manage** user submissions.

## Development and Collaboration
This project was developed as part of the **Software Quality** curricular unit for the 2024/2025 academic year. Key requirements included:
- Adherence to software quality and good coding practices.
- Utilization of project management tools like Trello.
- Implementation of tests with JUnit.

## Installation and Setup
1. Clone this repository:
   ```bash
   git clone https://github.com/Tolgaotrn/SoftwareQuality-Assignment.git
   ```
2. Navigate to the project directory:
   ```bash
   cd SoftwareQuality-Assignment
   ```
3. Install dependencies for the frontend and backend:
   ```bash
   cd frontend
   npm install
   cd ../backend
   npm install
   ```
4. Start the development server:
   - **Frontend**:
     ```bash
     npm run dev
     ```
   - **Backend**:
     ```bash
     npm start
     ```

## Testing
Run the Jest test suite to verify functionality:
```bash
npm test
```

---
Developed by the 2024/2025 BaDevelopers.

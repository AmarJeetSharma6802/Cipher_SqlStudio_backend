import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Assignment } from './src/models/Assignment';

dotenv.config();

const seedDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/ciphersqlstudio';
    await mongoose.connect(mongoUri);
    console.log('MongoDB connected for seeding');

    // Clear existing
    await Assignment.deleteMany({});
    
    // Add Sample
    const sampleAssignment = new Assignment({
      title: 'Find Top Earning Employees',
      description: 'Practice basic SELECT and ORDER BY queries on an employee dataset.',
      difficulty: 'Easy',
      question: 'Write a SQL query to retrieve the names and salaries of all employees who earn more than 60000, ordered by salary in descending order.',
      schemaSetupSQL: `
        CREATE TABLE IF NOT EXISTS Employees (
          EmployeeID SERIAL PRIMARY KEY,
          FirstName VARCHAR(50),
          LastName VARCHAR(50),
          Department VARCHAR(50),
          Salary INT
        );
      `,
      sampleDataSQL: `
        INSERT INTO Employees (FirstName, LastName, Department, Salary) VALUES
        ('John', 'Doe', 'IT', 75000),
        ('Jane', 'Smith', 'HR', 55000),
        ('Mike', 'Johnson', 'Sales', 65000),
        ('Emily', 'Davis', 'IT', 80000),
        ('Sarah', 'Brown', 'Marketing', 58000);
      `,
      expectedResultColumns: ['FirstName', 'LastName', 'Salary']
    });

    await sampleAssignment.save();
    console.log('Seeded sample assignment');
    
    mongoose.disconnect();
    console.log('Done.');
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedDB();

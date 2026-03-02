import { Request, Response } from 'express';
import { Assignment } from '../models/Assignment';

export const getAssignments = async (req: Request, res: Response): Promise<void> => {
  try {
    // Only fetch necessary fields for the listing to be lightweight
    const assignments = await Assignment.find({}, 'title description difficulty');
    res.status(200).json(assignments);
  } catch (error) {
    res.status(500).json({ error: 'Server error fetching assignments' });
  }
};

export const getAssignmentById = async (req: Request, res: Response): Promise<void> => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) {
      res.status(404).json({ error: 'Assignment not found' });
      return;
    }
    // Also we usually don't send `schemaSetupSQL` to the frontend if it's large or sensitive,
    // but the frontend needs `sampleDataSQL` or `question` to display the schema viewer.
    res.status(200).json(assignment);
  } catch (error) {
    res.status(500).json({ error: 'Server error fetching assignment' });
  }
};

export const createAssignment = async (req: Request, res: Response): Promise<void> => {
  try {
    // Admin only route in a real app
    const assignment = new Assignment(req.body);
    await assignment.save();
    res.status(201).json(assignment);
  } catch (error) {
    res.status(500).json({ error: 'Server error creating assignment' });
  }
};

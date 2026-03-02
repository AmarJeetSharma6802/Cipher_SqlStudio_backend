import { Request, Response } from 'express';
import { Assignment } from '../models/Assignment';

export const getAssignments = async (req: Request, res: Response): Promise<void> => {
  try {
    
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
  
    res.status(200).json(assignment);
  } catch (error) {
    res.status(500).json({ error: 'Server error fetching assignment' });
  }
};

export const createAssignment = async (req: Request, res: Response): Promise<void> => {
  try {
  
    const assignment = new Assignment(req.body);
    await assignment.save();
    res.status(201).json(assignment);
  } catch (error) {
    res.status(500).json({ error: 'Server error creating assignment' });
  }
};

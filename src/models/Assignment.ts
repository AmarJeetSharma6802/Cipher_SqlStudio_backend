import mongoose, { Schema, Document } from 'mongoose';

export interface IAssignment extends Document {
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  schemaSetupSQL: string;
  sampleDataSQL: string;
  question: string;
  expectedResultColumns: string[];
}

const AssignmentSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], required: true },
  schemaSetupSQL: { type: String, required: true },
  sampleDataSQL: { type: String, required: true },
  question: { type: String, required: true },
  expectedResultColumns: { type: [String], default: [] },
}, { timestamps: true });

export const Assignment = mongoose.model<IAssignment>('Assignment', AssignmentSchema);

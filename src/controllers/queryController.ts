import { Request, Response } from 'express';
import { pgPool } from '../config/database';
import { Assignment } from '../models/Assignment';

export const executeQuery = async (req: Request, res: Response): Promise<void> => {
  const { assignmentId, query } = req.body;

  if (!assignmentId || !query) {
    res.status(400).json({ error: 'Assignment ID and query are required' });
    return;
  }

  if (!query.trim().toUpperCase().startsWith('SELECT')) {
    res.status(400).json({ error: 'Only SELECT queries are allowed' });
    return;
  }

  const sandboxSchema = `sandbox_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
  let client;

  try {
    client = await pgPool.connect();

    const assignment = await Assignment.findById(assignmentId);
    if (!assignment) {
      client.release();
      res.status(404).json({ error: 'Assignment not found' });
      return;
    }

    await client.query(`CREATE SCHEMA ${sandboxSchema}`);
    await client.query(`SET search_path TO ${sandboxSchema}`);

    if (assignment.schemaSetupSQL) {
      await client.query(assignment.schemaSetupSQL);
    }
    if (assignment.sampleDataSQL) {
      await client.query(assignment.sampleDataSQL);
    }

    const userResult = await client.query(query);

    res.status(200).json({
      fields: userResult.fields.map((f: any) => f.name),
      rows: userResult.rows,
      rowCount: userResult.rowCount
    });
  } catch (error: any) {
    console.error('Query execution error:', error.message, '| PG Code:', error.code);

    if (error.code) {
      res.status(400).json({ error: error.message || 'Invalid SQL query' });
    } else {
      res.status(500).json({ error: error.message || 'Error executing query' });
    }
  } finally {
    if (client) {
      try {
        await client.query(`DROP SCHEMA IF EXISTS ${sandboxSchema} CASCADE`);
        await client.query(`SET search_path TO public`);
      } catch (_) { /* ignore cleanup errors */ }
      client.release();
    }
  }
};

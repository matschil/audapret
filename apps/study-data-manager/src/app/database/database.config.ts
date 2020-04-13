import { Connection } from 'typeorm';

export const PostgresConnection = new Connection({ type: 'postgres' });

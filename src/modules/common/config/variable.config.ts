import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config();
type DevelopMode = 'test' | 'local' | 'development' | 'production';

export const nodeEnv: DevelopMode = process.env.NODE_ENV as DevelopMode;
export const getEnvPath = (): { path: string } => {
  const dirname = path.resolve(__dirname);
  const splitted = dirname.split('/src/');
  const projectLocation = splitted.length
    ? splitted[0]
    : 'http://localhost:3000';
  const envLocation = `${projectLocation}/.env.${nodeEnv}`;
  return { path: envLocation };
};

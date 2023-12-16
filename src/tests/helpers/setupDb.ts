import { exec } from "child_process";

export const setupDatabase = async () => {
    // Run migrations in the test database before tests start
    await exec('npx sequelize-cli db:migrate up --env test');
  };
  
export const teardownDatabase = async () => {
    // Rollback migrations in the test database after tests finish
    await exec('npx sequelize-cli db:migrate:down --env test');
  };
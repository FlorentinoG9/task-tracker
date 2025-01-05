import { readFile, writeFile } from "fs/promises";
import { Task, TaskSchema } from "../types";

const STORAGE_FILE = "tasks.json";

export const StorageService = {
  async readTasks(): Promise<Task[]> {
    try {
      const data = await readFile(STORAGE_FILE, "utf-8");
      const tasks = JSON.parse(data);
      return TaskSchema.array().parse(tasks);
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === "ENOENT") {
        await writeFile(STORAGE_FILE, "[]");
        return [];
      }
      throw error;
    }
  },

  async writeTasks(tasks: Task[]): Promise<void> {
    await writeFile(STORAGE_FILE, JSON.stringify(tasks, null, 2));
  },
}; 
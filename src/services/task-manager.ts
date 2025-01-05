import { Task, TaskStatus } from "../types";
import { StorageService } from "./storage";

export const TaskManager = {
  async addTask(description: string): Promise<Task> {
    const tasks = await StorageService.readTasks();
    const newId = tasks.length ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
    
    const newTask: Task = {
      id: newId,
      description,
      status: TaskStatus.TODO,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await StorageService.writeTasks([...tasks, newTask]);
    return newTask;
  },

  async updateTask(id: number, description: string): Promise<Task> {
    const tasks = await StorageService.readTasks();
    const taskIndex = tasks.findIndex(t => t.id === id);
    
    if (taskIndex === -1) {
      throw new Error(`Task with ID ${id} not found`);
    }

    tasks[taskIndex] = {
      ...tasks[taskIndex],
      description,
      updatedAt: new Date().toISOString(),
    };

    await StorageService.writeTasks(tasks);
    return tasks[taskIndex];
  },

  async markTaskStatus(id: number, status: keyof typeof TaskStatus): Promise<Task> {
    const tasks = await StorageService.readTasks();
    const taskIndex = tasks.findIndex(t => t.id === id);
    
    if (taskIndex === -1) {
      throw new Error(`Task with ID ${id} not found`);
    }

    tasks[taskIndex] = {
      ...tasks[taskIndex],
      status: TaskStatus[status],
      updatedAt: new Date().toISOString(),
    };

    await StorageService.writeTasks(tasks);
    return tasks[taskIndex];
  },

  async deleteTask(id: number): Promise<void> {
    const tasks = await StorageService.readTasks();
    const filteredTasks = tasks.filter(t => t.id !== id);
    
    if (filteredTasks.length === tasks.length) {
      throw new Error(`Task with ID ${id} not found`);
    }

    await StorageService.writeTasks(filteredTasks);
  },

  async listTasks(status?: keyof typeof TaskStatus): Promise<Task[]> {
    const tasks = await StorageService.readTasks();
    if (!status) return tasks;
    return tasks.filter(t => t.status === TaskStatus[status]);
  },
}; 
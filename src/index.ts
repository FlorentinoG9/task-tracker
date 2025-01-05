#!/usr/bin/env node
import { TaskManager } from "./services/task-manager";
import { TaskStatus } from "./types";

async function main() {
  const [,, command, ...args] = process.argv;

  try {
    switch (command) {
      case "add":{
        const newTask = await TaskManager.addTask(args[0]);
        console.log(`Task added successfully (ID: ${newTask.id})`);
        break;
    }

    case "update":{
        const updatedTask = await TaskManager.updateTask(Number(args[0]), args[1]);
        console.log(`Task ${updatedTask.id} updated successfully`);
        break;
    }

      case "mark-in-progress":{
        await TaskManager.markTaskStatus(Number(args[0]), "IN_PROGRESS");
        console.log(`Task ${args[0]} marked as in progress`);
        break;
    }

      case "mark-done":{
        await TaskManager.markTaskStatus(Number(args[0]), "DONE");
        console.log(`Task ${args[0]} marked as done`);
        break;
    }

      case "delete":{
        await TaskManager.deleteTask(Number(args[0]));
        console.log(`Task ${args[0]} deleted successfully`);
        break;
    }

      case "list": {
        const status = args[0]?.toUpperCase() as keyof typeof TaskStatus | undefined;
        const tasks = await TaskManager.listTasks(status);
        console.table(tasks);
        break;
      }

      default:
        console.error("Unknown command. Available commands: add, update, mark-in-progress, mark-done, delete, list");
    }
  } catch (error) {
    console.error("Error:", (error as Error).message);
    process.exit(1);
  }
}

main(); 
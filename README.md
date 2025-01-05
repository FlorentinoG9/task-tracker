# Task Tracker CLI

A command-line interface for managing tasks with status tracking capabilities.

## Setup

1. Clone the repository
2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```
3. Build the project:
```bash
npm run build
# or
yarn build
# or
pnpm build
```

4. (Optional) Create a global symlink:
```bash
# From the project root directory
npm link
# Now you can use 'task-tracker' command from anywhere
```

## Usage

You can run the CLI in one of these ways:

1. Directly using:
```bash
./dist/index.js <command>
```

2. Using npm link (if you followed step 4 in setup):
```bash
task-cli <command>
```

3. Or create a custom alias in your shell:
```bash
# Add this to your ~/.bashrc or ~/.zshrc
alias task-cli="node /path/to/project/dist/index.js"
```

The CLI provides the following commands:

### Add a Task
```bash
task-cli add "Task description"
```
Creates a new task with the specified description. Returns the task ID upon successful creation.

### Update a Task
```bash
task-cli update <task-id> "New description"
```
Updates the description of an existing task.

### Mark Task as In Progress
```bash
task-cli mark-in-progress <task-id>
```
Changes the status of a task to "in-progress".

### Mark Task as Done
```bash
task-cli mark-done <task-id>
```
Changes the status of a task to "done".

### Delete a Task
```bash
task-cli delete <task-id>
```
Permanently removes a task.

### List Tasks
```bash
task-cli list [status]
```
Lists all tasks. Optionally filter by status: "todo", "in-progress", or "done".

Examples:
```bash
# List all tasks
task-cli list

# List only todo tasks
task-cli list todo

# List only in-progress tasks
task-cli list in-progress

# List only completed tasks
task-cli list done
```

## Task Status

Tasks can have one of the following statuses:
- `todo`: Default status for new tasks
- `in-progress`: Tasks that are currently being worked on
- `done`: Completed tasks

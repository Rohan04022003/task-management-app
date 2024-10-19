# Task Management App

## Description

This is a Task Management App built using **Next.js** and **React**. The application allows users to manage their tasks by adding, editing, deleting, and marking them as completed. Tasks can be dynamically sorted based on their priority (high, medium, low) and can be filtered by title or description.

## Features

- Add, edit, delete, and mark tasks as completed.
- Sort tasks dynamically by priority.
- Responsive design using CSS.
- Search functionality to filter tasks.

## Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd task-manager
   npm install
   npm run dev
   ```

## Sorting Tasks by Priority

In this application, tasks are sorted based on their priority using a combination of JavaScript arrays and objects. The approach is as follows:

- Data Structure: Tasks are stored in an array. Each task object contains a priority property which can be "high," "medium," or "low."
- Priority Mapping: A priority mapping object is created to assign a numerical value to each priority level:

``` bash
const priorityOrder = { high: 1, medium: 2, low: 3 };
```
- Sorting Logic: The sort() method is used on the tasks array, comparing the numerical values of each task's priority:

```bash
tasks.sort((a, b) => {
  return priorityOrder[a.priority] - priorityOrder[b.priority];
});
```

This ensures that tasks with higher priority appear at the top of the list.
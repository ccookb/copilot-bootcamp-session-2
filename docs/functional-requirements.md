# Functional Requirements

## Overview

This document defines the functional requirements for the task management features of the Copilot Bootcamp application. The application is a full-stack JavaScript app with a React frontend and a Node.js/Express backend.

---

## FR-1: Task Management

### FR-1.1: Add a Task

- Users can create a new task by providing a title.
- A task must have a non-empty title to be created.
- Upon creation, each task is automatically assigned a **created date** (timestamp of when the task was added).
- Newly created tasks appear in the task list immediately after creation.

### FR-1.2: Remove a Task

- Users can delete any existing task from the task list.
- Deletion is permanent; removed tasks cannot be recovered.
- The task list updates immediately after a task is removed.

---

## FR-2: Task Date Assignment

### FR-2.1: Assign a Due Date to a Task

- Users can assign a due date to any task at the time of creation or afterwards.
- The due date field is optional; tasks may exist without a due date assigned.
- Users can update the due date of an existing task.
- Users can clear (remove) the due date from a task that already has one assigned.

---

## FR-3: Task Sorting

Users can sort the task list by the following criteria:

### FR-3.1: Sort by Due Date

- Tasks are ordered by their assigned due date in ascending order (earliest date first).
- Tasks without a due date are listed at the end of the sorted list.

### FR-3.2: Sort by Title

- Tasks are ordered alphabetically by title in ascending (A–Z) order.
- Sorting is case-insensitive.

### FR-3.3: Sort by Created Date

- Tasks are ordered by the date and time they were originally created, in ascending order (oldest first).
- This is the default sort order when the application loads.

---

## Non-Functional Notes

- All task operations (add, remove, update, sort) should reflect changes in the UI without requiring a full page reload.
- Data should be persisted via the backend API so that tasks are retained between sessions.

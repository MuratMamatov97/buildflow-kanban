# BuildFlow Kanban

A modern Kanban board built with React, TypeScript, Zustand, and dnd-kit.

## Overview

BuildFlow Kanban is a task planning application inspired by tools such as Trello, Jira, and Linear. The project focuses on clean architecture, type safety, drag-and-drop interactions, and state management.

This project was created to demonstrate frontend engineering skills using a modern React stack.

## Features

### Implemented

* Kanban board workflow
* Drag and Drop task management
* Task creation
* Task deletion
* State management with Zustand
* Local storage persistence
* Responsive layout
* TypeScript-first development
* Modular project structure

### Planned

* Task editing
* Task priorities
* Due dates
* Search and filtering
* Undo delete
* Keyboard accessibility
* Playwright E2E tests
* GitHub Actions CI/CD

## Tech Stack

* React
* TypeScript
* Vite
* Zustand
* dnd-kit
* Tailwind CSS

## Project Structure

```text
src/
├── app/
├── entities/
├── widgets/
├── shared/
├── store/
└── pages/
```

## Installation

Clone the repository:

```bash
git clone https://github.com/MuratMamatov97/buildflow-kanban.git
```

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## Architecture

The project follows a feature-oriented structure with clear separation of concerns:

* UI components
* Domain entities
* State management
* Shared utilities

The goal is to keep the codebase scalable and maintainable as new features are added.

## Current Status

Work in progress.

The project is actively being expanded with additional task management and planning features.

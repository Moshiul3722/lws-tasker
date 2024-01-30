import React, { useState } from "react";
import AddTaskModal from "./AddTaskModal";
import SearchTask from "./SearchTask";
import TaskActions from "./TaskActions";
import TaskList from "./TaskList";

export default function TaskBoard() {
  const defaultTask = {
    id: crypto.randomUUID(),
    title: "Learn React",
    description:
      "I want to learn React such that I can treat it like my slave and make it do whatever I want to do.",
    tags: ["web", "react", "js"],
    priority: "High",
    isFavorite: true,
  };

  const [tasks, setTasks] = useState([defaultTask]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState(null);

  function handleAddEditTask(newTask, isAdd) {
    // console.log(newTask);
    if (isAdd) {
      setTasks([...tasks, newTask]);
    } else {
      // console.log(tasks);
      setTasks(
        tasks.map((task) => {
          if (task.id === newTask.id) {
            return newTask;
          }
          return task;
        })
      );
    }
    setShowAddModal(false);
  }

  function handleEditTask(editTask) {
    setTaskToUpdate(editTask);
    setShowAddModal(true);
  }

  function handleDeleteTask(taskID) {
    const newTask = tasks.filter((task) => task.id !== taskID);
    setTasks(newTask);
  }

  function deleteAllTask() {
    tasks.length = 0;
    setTasks([...tasks]);
  }

  function onCloseClick() {
    setShowAddModal(false);
    setTaskToUpdate(null);
  }

  function handleFavorite(taskID) {
    const taskIndex = tasks.findIndex((task) => task.id == taskID);
    // console.log(taskIndex);
    const newTasks = [...tasks];
    console.log(newTasks);
    newTasks[taskIndex].isFavorite = !newTasks[taskIndex].isFavorite;
    setTasks(newTasks);
  }

  return (
    <section className="mb-20" id="tasks">
      {showAddModal && (
        <AddTaskModal
          onSave={handleAddEditTask}
          taskToUpdate={taskToUpdate}
          handleCloseClick={onCloseClick}
        />
      )}
      <div className="container">
        {/* Search Box  */}
        <SearchTask />
        {/* Search Box Ends  */}
        <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
          <TaskActions
            onAddTask={() => setShowAddModal(true)}
            deleteAllTask={deleteAllTask}
          />
          <TaskList
            onFav={handleFavorite}
            tasks={tasks}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
          />
        </div>
      </div>
    </section>
  );
}

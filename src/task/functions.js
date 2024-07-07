import api from "../axios/axios";

const getTasks = async (date, startIndex, batchSize) => {
  try {
    const tasks = await api.get(
      `/notes?startIndex=${startIndex}&batchSize=${batchSize ?? 5}&date=${
        date.toDateString() ?? new Date().toDateString()
      }`
    );
    console.log(tasks);
    return tasks?.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const pushTask = async (text) => {
  try {
    const task = await api.post("/notes", {
      task: text,
      description: "react se note",
      createdOn: new Date().toDateString(),
    });
    console.log(task.data);
    return task.data;
  } catch (error) {
    console.log(error);
  }
};

const removeTask = async (id) => {
  try {
    const deletedItem = await api.delete(`/notes/${id}`);
    console.log(deletedItem.data);
  } catch (error) {
    console.log(error);
  }
};

const updateTask = async ( id, task, isCompleted) => {
  try {
    const updatedTasks = await api.patch("/notes", {
      id,
      task,
      isCompleted,
    });
    return updatedTasks?.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export { pushTask, removeTask, updateTask, getTasks };

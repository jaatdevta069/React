import api from "./axios/axios";

const getTasks = async (date, startIndex, batchSize ) => {
  const tasks = await api.get(
      `?startIndex=${startIndex}&batchSize=${batchSize ?? 5}&date=${date.toDateString() ?? new Date().toDateString()}`
  );
  return tasks?.data;
};

const pushTask = async (text) => {
  try {
    const task = await api.post('/',
      {
        task: text,
        description: "react se",
        createdOn: new Date()
      });
    console.log(task.data);
    return task.data;
  } catch (error) {
    console.log(error);
  }
};

const removeTask = async (id) => {
  try {
    const deletedItem = await api.delete(`/${id}`);
      console.log(deletedItem.data);
    // return deletedItem.data;
  } catch (error) {
    console.log(error);
  }
};

const updateTask = async (id, task, isCompleted) => {
  try {
    const updatedTasks = await api.patch('/',{
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
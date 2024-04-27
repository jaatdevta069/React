
const getTasks = async(startIndex,batchSize)=>{
const tasks = await fetch("http://localhost:245/notes"+`?startIndex=${startIndex}&batchSize=${batchSize ?? 5}`) ;
const json = await tasks.json();
return json;
}

const pushTask = async (text)=>{
    console.log(text);
    try{
   const task =  await fetch("http://localhost:245/notes",{method:"POST",
  body:JSON.stringify({
    task : text,
    description: "react se"
  }),
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }});
  const json = await task.json();
  console.table(json);
  return json;}
  catch(error){console.log(error)}
  };


  const removeTask = async(id)=>{
    try{
    const deletedItem = await fetch("http://localhost:245/notes",{method:"DELETE",
  body:JSON.stringify({
    id
  }),
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }});
  const item1 =  await deletedItem.json();
  return({item: item1, id: id});
}
  catch(error){console.log(error)}
};

const update = async(id,task)=>{
try {
  const updatedTasks = await fetch("http://localhost:245/notes",{method:"PATCH",
  body:JSON.stringify({
    id,
    task
  }),
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }});
  return updatedTasks

} catch (error) {
  console.log(error);
  return error;
}
}

export {pushTask,removeTask,update,getTasks};
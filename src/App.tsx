import React, { useState } from "react";
import FormComponent from "./Form";
import "./App.css";
import Tasks from "./Tasks";
import Setting from "./Setting";
import { taskType, FormType } from "./Tasks.d";
import { tts, queryProgress, downloadMp3 } from "./utils/request";

const timers: { [key: string]: NodeJS.Timeout } = {};

const App: React.FC = () => {
  const [tasks, setTasks] = useState<taskType[]>([]);
  const handleAdd = (task: FormType) => {
    tts(task.title, task.content)
      .then((id) => {
        setTasks([...tasks, { id, title: task.title, percent: 0 }]);
        timers[id] = setInterval(() => {
          queryProgress(id)
            .then((res) => {
              const { rate, completed } = res;
              setTasks((_tasks) =>
                _tasks.map((task) =>
                  task.id === id ? { ...task, percent: rate } : task,
                ),
              );
              if (completed) {
                clearInterval(timers[id]);
              }
            })
            .catch(() => {
              clearInterval(timers[id]);
            });
        }, 1000);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const handleDelete = (id: string) => {
    console.log(id);
    setTasks(tasks.filter((task) => task.id !== id));
  };
  const handleDownload = (id: string) => {
    downloadMp3(id).catch((err) => {
      console.error(err);
    });
  };
  return (
    <div className="App">
      <Setting />
      <div className="container">
        <FormComponent onSubmit={handleAdd} />
      </div>
      <div className="table">
        <Tasks
          tasks={tasks}
          onDelete={handleDelete}
          onDownload={handleDownload}
        />
      </div>
    </div>
  );
};

export default App;

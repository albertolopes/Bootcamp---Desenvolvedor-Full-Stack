import React, { useState, useEffect } from "react";
import * as services from "./services/tasks";

import Card from "./components/Card";
import Button from "./components/Button";
import CountTasks from "./components/CountTasks";

export default function App() {
  const [years] = useState([2019, 2020, 2021]);
  const [allTasks, setAllTasks] = useState([]);
  const [count, setCount] = useState([]);
  const [currentYear, setCurrentYears] = useState(2021);
  const [currentMonth, setCurrentMonths] = useState(
    new Date().getMonth() === 0 ? 1 : new Date().getMonth() + 1
  );
  const [months] = useState(["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Sep","Out","Nov","Dez",]);

  useEffect(() => {
    const getTasks = async () => {
      setAllTasks(await services.getByYearAndMonth(currentYear, currentMonth));
    };
    getTasks();
  }, [currentYear, currentMonth]);

  useEffect(() => {
    sum();
  }, [allTasks]);

  const updateTask = async (id) => {
    const res = await services.getById(id);
    await services.putTask(id, {
      day: res.day,
      month:res.month,
      year: res.year,
      period: res.period,
      date: res.date,
      description: res.description,
      done: res.done === true ? false : true
    });
    setAllTasks(await services.getByYearAndMonth(currentYear, currentMonth));
  }

  const sum = () => {
    let counting = null;

    for (let i = 0; i < allTasks.length; i++) {
      if (allTasks[i].done === true) {
        counting += 1;
      }
    }
    const counted = {
      countTasks: allTasks.length,
      makedTasks: counting,
      tasksNotMaked: allTasks.length - counting,
    };

    setCount(counted);
  };

  return (
    <>
      <body>
        <div className="row container center">
          {years.map((years, index) => (
            <Button
              name={years}
              key={index}
              color={currentYear === years ? "purple" : ""}
              onChangeDate={(e) => setCurrentYears(e)}
            />
          ))}
        </div>

        <div className="row container center">
          {months.map((months, index) => (
            <Button
              name={months}
              month={index}
              key={index}
              color={(currentMonth - 1)=== index ? "purple" : ""}
              onChangeDate={(e) => setCurrentMonths(e)}
            />
          ))}
        </div>

        <div className="container">
          <CountTasks
            all={count.countTasks}
            tasksMaked={count.makedTasks}
            tasksNotMaked={count.tasksNotMaked}
            year={currentYear}
            month={currentMonth}
          />
        </div>

        <div className="container">
          {allTasks.map((tasks) => (
            <Card
              key={tasks.id}
              id={tasks.id}
              description={tasks.description}
              date={tasks.date}
              done={tasks.done}
              onChangeDone={(e) => updateTask(e)}
            />
          ))}
        </div>
      </body>
    </>
  );
}

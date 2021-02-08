import React, { useState, useEffect } from "react";

import Cart from "./components/card";
import Select from "./components/select";
import Modal from "./components/modal";
import Form from "./components/form";
import CountFinances from "./components/CountFinances";

import { get } from "./services/apiService";

export default function App() {
  const [currentFilter, setCurrentFilter] = useState({
    yearMonth: "",
    description: "",
  });
  const [currentDate] = useState([
    "2019-01","2019-02","2019-03","2019-04","2019-05","2019-06","2019-07","2019-08","2019-09","2019-10","2019-11","2019-12",
    "2020-01","2020-02","2020-03","2020-04","2020-05","2020-06","2020-07","2020-08","2020-09","2020-10","2020-11","2020-12",
    "2021-01","2021-02","2021-03","2021-04","2021-05","2021-06","2021-07","2021-08","2021-09","2021-10","2021-11","2021-12"
  ]);
  const [currentFinances, setCurrentFinances] = useState();
  const [metric, setMetric] = useState({});

  useEffect(() => {
    const getTasks = async () => {
      const res = await get(currentFilter);
      setCurrentFinances(res.data);
      countTotalFinances(res.data);
    };
    getTasks();    
  }, [currentFilter]);

  const changeCurrentDate = (e) => {
    if("" !== e && e !==currentFilter.yearMonth){
      const filter = {
        yearMonth: e,
        description: currentFilter.description,
      }
      setCurrentFilter(filter);
    }
  }

  const changeCurrentDescription = (e) => {
    const filter = {
      yearMonth: currentFilter.yearMonth,
      description: e
    }
    setCurrentFilter(filter);
  }

  const reloadInput= async (e) => {
    const res = await get(currentFilter);
    setCurrentFinances(res.data);
  }

  const countTotalFinances = (res) => {
    let launch = res.length;

    let revenue= null;
    for(let i = 0; i < res.length; i++) {
      if(res[i].type == "+"){
        revenue += res[i].value
      }
    }

    let expenses= null;
    for(let i = 0; i < res.length; i++) {
      if(res[i].type == "-"){
        expenses += res[i].value
      }
    }    
    
    setMetric({
      launch: launch,
      revenue: revenue,
      expenses: expenses,
      balance: revenue - expenses
    });
  }

  return (
    <>
      <div className="row container center">
        <h4>Bootcamp Full Stack - Desafio Final</h4>
      </div>
      <div className="row container center">
        <h5>Controle Financeiro Pessoal</h5>
      </div>
      <div className="row container">
        <Select date={currentDate} onChangeDate={(e) => changeCurrentDate(e)}/>
      </div>
      <div className="row container center">
        <CountFinances metric={metric}/>
      </div>
      <div className="row container center">
        <Modal onChangeInsert={reloadInput}/>
        <Form onChangeFilter={(e) => changeCurrentDescription(e)}/>
      </div>
      <div className="row container center">
        {currentFinances &&
          currentFinances.map((finances) => (
            <Cart
              // key={finances._id}
              id={finances._id}
              description={finances.description}
              value={finances.value}
              category={finances.category}
              year={finances.year}
              month={finances.month}
              day={finances.day}
              yearMonth={finances.yearMonth}
              yearMonthDay={finances.yearMonthDay}
              type={finances.type}
              // onEditFunction={(e) => changeCurrentFilter(e)}
              // onDeleteFunction={(e) => changeCurrentFilter(e)}
            />
          ))}
      </div>
    </>
  );
}

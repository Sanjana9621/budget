import React, {useState} from "react";
import './App.css';
import ExpenseForm from "./components/ExpenseForm"
import ExpenseList from "./components/ExpenseList"
import Alert from "./components/Alert"
import {v4 as uuidv4} from "uuid";

const initialExpenses = [
  {id: uuidv4(), charge: "rent", amount: 1600},
  {id: uuidv4(), charge: "car payment", amount: 400},
  {id: uuidv4(), charge: "credit card bill", amount: 1200}
]


function App() {
  // ********************** State Values *********************
  // all expenses, add expenses
  const [expenses, setExpenses] = useState(initialExpenses);
  // single expense
  const [charge, setCharge] = useState("");
  // single amount
  const [amount, setAmount] = useState("");
  // alert
  const [alert, setAlert] = useState({show: false});
  // ********************** functionality ********************
  const handleCharge = e => {
    setCharge(e.target.value)
  }
  const handleAmount = e => {
    setAmount(e.target.value)
  }
  const handleSubmit = e => {
    e.preventDefault();
    if(charge !== "" && amount > 0){
      const singleExpense = {id: uuidv4(), charge, amount};
      setExpenses([...expenses, singleExpense]);
      setCharge("");
      setAmount("");
    }else{
      // handle alert called
    }
  };  

  return (
    <React.Fragment>
      <Alert></Alert>
      <h1>budget calculator</h1>
      <main className="App">
        <ExpenseForm 
          charge={charge} 
          amount={amount} 
          handleAmount={handleAmount} 
          handleCharge={handleCharge} 
          handleSubmit={handleSubmit}
        ></ExpenseForm>
        <ExpenseList expenses={expenses}></ExpenseList>
      </main>
      <h1>
        total spending: <span className="total">
          $ {expenses.reduce((acc, cur) => {
            return (acc += parseInt(cur.amount));
          }, 0)}
        </span>
      </h1>
    </React.Fragment>
  );
}

export default App;

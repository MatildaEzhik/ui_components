import  { useState } from "react";
import "./App.css";

function App() {
    const [balance, setBalance] = useState(135);
    const [profits, setProfits] = useState([
        { id: 1, name: "Salary", amount: 2000, date: "10.07.2023" },
        { id: 2, name: "Website profit", amount: 500, date: "10.07.2023" },
    ]);
    const [expenses, setExpenses] = useState([
        { id: 1, name: "Food products", amount: 1900, date: "10.07.2023" },
        { id: 2, name: "Shopping", amount: 400, date: "10.07.2023" },
        { id: 3, name: "Medicines", amount: 65, date: "10.07.2023" },
    ]);

    const [newProfit, setNewProfit] = useState({ name: "", amount: 0 });
    const [newExpense, setNewExpense] = useState({ name: "", amount: 0 });

    const addProfit = () => {
        const updatedProfits = [
            ...profits,
            { ...newProfit, id: Date.now(), date: new Date().toLocaleDateString() },
        ];
        setProfits(updatedProfits);
        setBalance(balance + parseFloat(newProfit.amount));
        setNewProfit({ name: "", amount: 0 });
    };

    const addExpense = () => {
        const updatedExpenses = [
            ...expenses,
            { ...newExpense, id: Date.now(), date: new Date().toLocaleDateString() },
        ];
        setExpenses(updatedExpenses);
        setBalance(balance - parseFloat(newExpense.amount));
        setNewExpense({ name: "", amount: 0 });
    };

    const deleteProfit = (id, amount) => {
        setProfits(profits.filter((item) => item.id !== id));
        setBalance(balance - amount);
    };

    const deleteExpense = (id, amount) => {
        setExpenses(expenses.filter((item) => item.id !== id));
        setBalance(balance + amount);
    };

    return (
        <div className="container">
            <h1>MY BALANCE 💰</h1>
            <h2>{balance}$</h2>

            <div className="add-section">
                <h3>Add Profit:</h3>
                <input
                    type="text"
                    placeholder="Profit name"
                    value={newProfit.name}
                    onChange={(e) => setNewProfit({ ...newProfit, name: e.target.value })}
                />
                <input
                    type="number"
                    value={newProfit.amount}
                    onChange={(e) =>
                        setNewProfit({ ...newProfit, amount: parseFloat(e.target.value) })
                    }
                />
                <button onClick={addProfit}>Add new profit</button>
            </div>

            <div className="add-section">
                <h3>Add Expense:</h3>
                <input
                    type="text"
                    placeholder="Expense name"
                    value={newExpense.name}
                    onChange={(e) =>
                        setNewExpense({ ...newExpense, name: e.target.value })
                    }
                />
                <input
                    type="number"
                    value={newExpense.amount}
                    onChange={(e) =>
                        setNewExpense({ ...newExpense, amount: parseFloat(e.target.value) })
                    }
                />
                <button onClick={addExpense}>Add new expense</button>
            </div>

            <div className="list-section">
                <h3>PROFITS ARTICLES:</h3>
                {profits.map((profit) => (
                    <div key={profit.id} className="list-item">
            <span>
              {profit.name} = {profit.amount}$ ({profit.date})
            </span>
                        <button onClick={() => deleteProfit(profit.id, profit.amount)}>
                            Delete
                        </button>
                    </div>
                ))}
            </div>

            <div className="list-section">
                <h3>EXPENSES ARTICLES:</h3>
                {expenses.map((expense) => (
                    <div key={expense.id} className="list-item">
            <span>
              {expense.name} = {expense.amount}$ ({expense.date})
            </span>
                        <button onClick={() => deleteExpense(expense.id, expense.amount)}>
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;

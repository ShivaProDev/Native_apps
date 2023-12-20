import {createContext, useReducer} from 'react';

// const DUMMY_EXPENSES = [
//   {
//     id: 'e1',
//     description: 'A pair of shoes',
//     amount: 59.99,
//     date: new Date('2023-12-15'),
//   },
//   {
//     id: 'e2',
//     description: 'A pair of trousers',
//     amount: 89.99,
//     date: new Date('2023-12-16'),
//   },
//   {
//     id: 'e3',
//     description: 'Some bananas',
//     amount: 5.99,
//     date: new Date('2023-12-16'),
//   },
//   {
//     id: 'e4',
//     description: 'A Book',
//     amount: 14.99,
//     date: new Date('2022-02-19'),
//   },
//   {
//     id: 'e5',
//     description: 'Another Book',
//     amount: 18.59,
//     date: new Date('2022-02-18'),
//   },
//   {
//     id: 'e6',
//     description: 'A pair of shoes',
//     amount: 59.99,
//     date: new Date('2021-12-19'),
//   },
//   {
//     id: 'e7',
//     description: 'A pair of trousers',
//     amount: 89.99,
//     date: new Date('2022-01-05'),
//   },
//   {
//     id: 'e8',
//     description: 'Some bananas',
//     amount: 5.99,
//     date: new Date('2021-12-01'),
//   },
//   {
//     id: 'e9',
//     description: 'A Book',
//     amount: 14.99,
//     date: new Date('2022-02-19'),
//   },
//   {
//     id: 'e10',
//     description: 'Another Book',
//     amount: 18.59,
//     date: new Date('2022-02-18'),
//   },
// ];

export const ExpenseContext = createContext({
  expenses: [],
  addExpenses: ({description, amount, date}) => {},
  setExpenses: expenses => {},
  deleteExpenses: id => {},
  updateExpenses: (id, {description, amount, date}) => {},
});

const expensesReducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      // const id = new Date().toString() + Math.random().toPrecision();
      return [action.payload, ...state];
    case 'SET':
      const inverted = action.payload.reverse();
      return inverted;
    case 'UPDATE':
      const updatetableExpenseIndex = state.findIndex(
        expense => expense.id === action.payload.id,
      );
      console.log(updatetableExpenseIndex);
      const updatableExpense = state[updatetableExpenseIndex];
      const updatedItem = {...updatableExpense, ...action.payload.data};
      const updatedExpenses = [...state];
      updatedExpenses[updatetableExpenseIndex] = updatedItem;
      return updatedExpenses;
    case 'DELETE':
      return state.filter(expense => expense.id != action.payload);
    default:
      return state;
  }
};

const ExpenseContextProvider = ({children}) => {
  const [expensesState, dispatch] = useReducer(expensesReducer, []);

  const addExpenses = expenseData => {
    dispatch({type: 'ADD', payload: expenseData});
  };

  const setExpenses = expenses => {
    dispatch({type: 'SET', payload: expenses});
  };
  const deleteExpenses = id => {
    dispatch({type: 'DELETE', payload: id});
  };

  const updateExpenses = (id, expenseData) => {
    dispatch({type: 'UPDATE', payload: {id: id, data: expenseData}});
  };

  const value = {
    expense: expensesState,
    setExpenses: setExpenses,
    addExpenses: addExpenses,
    deleteExpenses: deleteExpenses,
    updateExpenses: updateExpenses,
  };

  return (
    <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>
  );
};

export default ExpenseContextProvider;

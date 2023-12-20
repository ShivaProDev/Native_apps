import {Text} from 'react-native';
import ExpensesOutput from '../components/ExepensesOutput/ExpensesOutput';
import {ExpenseContext} from '../store/expenses-context';
import {useContext} from 'react';
const AllExpense: any = () => {
  const expenseCtx: any = useContext(ExpenseContext);
  // console.log(expenseCtx);

  return (
    <ExpensesOutput
      expenses={expenseCtx.expense}
      expensesPeriod="Total"
      fallBackText="No Registered Expenses found"
    />
  );
};
export default AllExpense;

import {Text} from 'react-native';
import ExpensesOutput from '../components/ExepensesOutput/ExpensesOutput';
import {useContext, useEffect, useState} from 'react';
import {ExpenseContext} from '../store/expenses-context';
import {getDateminusDays} from '../utill/date';
import {fetchExpenses} from '../utill/http';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import ErrorOverlay from '../components/UI/ErrorOverLay';

const RecentExpenses = () => {
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError]: any = useState();
  const expenseCtx: any = useContext(ExpenseContext);
  // const [fetchedExpenses, setFetchedExpenses] = useState([]);
  useEffect(() => {
    const getExpenses = async () => {
      setIsFetching(true);
      try {
        const expenses: any = await fetchExpenses();
        expenseCtx.setExpenses(expenses);
      } catch {
        setError('Could not fetch expenses!');
      }

      setIsFetching(false);

      // setFetchedExpenses(expenses);
    };

    getExpenses();
  }, []);
  const recentExpenses: any = expenseCtx.expense?.filter((expense: any) => {
    const today = new Date();
    const date7DaysAgo = getDateminusDays(today, 7);
    console.log(expense?.date >= date7DaysAgo);
    return expense?.date >= date7DaysAgo && expense.date <= today;
  });
  console.log(recentExpenses);

  const errorHandler = () => {
    setError(null);
  };

  if (error && !isFetching) {
    <ErrorOverlay message={error} onConfirm={errorHandler} />;
  }

  if (isFetching) {
    return <LoadingOverlay />;
  }

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod="Last 7 Days"
      fallBackText="No expenses Registered for last 7 days"
    />
  );
};
export default RecentExpenses;

import {StyleSheet, Text, View} from 'react-native';
import {useContext, useLayoutEffect, useState} from 'react';
import IconButton from '../components/UI/IconButton';
import {GlobalStyles} from '../constants/styles';
import Button from '../components/UI/Button';
import {ExpenseContext} from '../store/expenses-context';
import ExpensesForm from '../components/ManageExpenses/ExpensesForm';
import {deleteExpense, storeExpenses, updateExpenses} from '../utill/http';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import ErrorOverlay from '../components/UI/ErrorOverLay';
const ManageExpenses = ({route, navigation}: any) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError]: any = useState();
  const expensesCtx: any = useContext(ExpenseContext);

  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  const selectedExpense = expensesCtx.expense?.find(
    (expense: any) => expense.id === editedExpenseId,
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
    });
  }, [navigation, isEditing]);

  const deleteExpenseHandler = async () => {
    setIsSubmitting(true);
    try {
      await deleteExpense(editedExpenseId);
      expensesCtx.deleteExpenses(editedExpenseId);
      navigation.goBack();
    } catch {
      setError('could not delete Expenses - please try again later!');
    }

    setIsSubmitting(false);
  };
  const cancelHandler = () => {
    navigation.goBack();
  };
  const confirmHandler = async (expenseData: any) => {
    setIsSubmitting(true);
    try {
      if (isEditing) {
        expensesCtx.updateExpenses(editedExpenseId, expenseData);
        await updateExpenses(editedExpenseId, expenseData);
      } else {
        const id = await storeExpenses(expenseData);
        expensesCtx.addExpenses({...expenseData, id: id});
      }
      setIsSubmitting(false);
      navigation.goBack();
    } catch {
      setError('Could not save data - please try again later');
      setIsSubmitting(false);
    }
  };

  const errorHandler = () => {
    setError(null);
  };

  if (error && !isSubmitting) {
    <ErrorOverlay message={error} onConfirm={errorHandler} />;
  }

  if (isSubmitting) {
    return <LoadingOverlay />;
  }
  return (
    <View style={styles.container}>
      <ExpensesForm
        onCancel={cancelHandler}
        submitButtonLabel={isEditing ? 'Update' : 'Add'}
        onSubmit={confirmHandler}
        defaultValues={selectedExpense}
      />

      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
};
export default ManageExpenses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center',
  },
});

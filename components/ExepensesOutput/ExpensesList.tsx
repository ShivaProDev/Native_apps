import {FlatList, Text} from 'react-native';
import ExpenseItem from './ExpenseItem';

const renderExpenseItem = (itemData: any) => {
  return <ExpenseItem {...itemData.item} />;
};

const ExpensesList = ({expenses}: any) => {
  console.log('hi');
  return (
    <FlatList
      data={expenses}
      renderItem={renderExpenseItem}
      keyExtractor={item => item.id}
    />
  );
};

export default ExpensesList;

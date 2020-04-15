import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const incomeTransactions: number[] = [];
    const outcomeTransactions: number[] = [];

    this.transactions.forEach(transaction => {
      if (transaction.type === 'income') {
        incomeTransactions.push(transaction.value);
      } else {
        outcomeTransactions.push(transaction.value);
      }
    });

    const totalIncome = incomeTransactions.reduce((a, b) => a + b, 0);
    const totalOutcome = outcomeTransactions.reduce((a, b) => a + b, 0);
    const balanceTotal = totalIncome - totalOutcome;

    return {
      income: totalIncome,
      outcome: totalOutcome,
      total: balanceTotal,
    };
  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    const transaction = new Transaction({ title, type, value });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;

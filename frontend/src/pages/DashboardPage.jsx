import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './DashboardPage.css';

const DashboardPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Calculate summary
  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpense;

  // Fetch transactions
  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('token');

      const response = await fetch('http://localhost:5000/api/transactions', {
        headers: {
          'x-auth-token': token || '',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch transactions');
      }

      const data = await response.json();
      setTransactions(data);
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="dashboard-container">
      {/* Header Card */}
      <div className="header-card">
        <div className="header-top">
          <h1 className="app-title">
            Saku<span className="highlight">Kurata</span>
          </h1>
          <button onClick={handleLogout} className="logout-button">
            🚪 Keluar
          </button>
        </div>

        {/* Summary */}
        <div className="summary-card">
          <div className="balance-section">
            <div className="balance-label">
              <span className="wallet-icon">💰</span>
              Total Saldo
            </div>
            <h2 className="balance-amount">{formatCurrency(balance)}</h2>
          </div>

          <div className="income-expense-grid">
            {/* Income */}
            <div className="income-box">
              <div className="box-label">
                <span className="box-icon">📈</span>
                Pemasukan
              </div>
              <p className="box-amount">{formatCurrency(totalIncome)}</p>
            </div>

            {/* Expense */}
            <div className="expense-box">
              <div className="box-label">
                <span className="box-icon">📉</span>
                Pengeluaran
              </div>
              <p className="box-amount">{formatCurrency(totalExpense)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Transactions List */}
      <div className="transactions-section">
        <div className="section-header">
          <h3 className="section-title">Transaksi Terakhir</h3>
          <span className="transaction-count">{transactions.length} transaksi</span>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="loading-container">
            <div className="spinner-large"></div>
            <p>Memuat transaksi...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="error-box">
            ⚠️ {error}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && transactions.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">📭</div>
            <p className="empty-title">Belum ada transaksi</p>
            <p className="empty-subtitle">Tambahkan transaksi pertama Anda</p>
          </div>
        )}

        {/* Transactions List */}
        <div className="transactions-list">
          {transactions.map((transaction) => (
            <div key={transaction._id} className="transaction-item">
              {/* Thumbnail Struk */}
              <div className="transaction-image">
                {transaction.image ? (
                  <img
                    src={`http://localhost:5000/uploads/${transaction.image}`}
                    alt={transaction.title}
                    className="receipt-image"
                  />
                ) : (
                  <span className="no-image">📷</span>
                )}
              </div>

              {/* Info */}
              <div className="transaction-info">
                <h4 className="transaction-title">{transaction.title}</h4>
                <p className="transaction-date">
                  {new Date(transaction.date).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
              </div>

              {/* Amount */}
              <div className={`transaction-amount ${transaction.type}`}>
                {transaction.type === 'income' ? '+' : '-'} {formatCurrency(transaction.amount)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Action Button */}
      <button
        onClick={() => navigate('/add')}
        className="fab-button"
        title="Tambah Transaksi"
      >
        <span className="fab-icon">➕</span>
      </button>
    </div>
  );
};

export default DashboardPage;

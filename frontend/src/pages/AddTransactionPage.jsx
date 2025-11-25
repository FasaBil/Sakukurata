import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddTransactionPage.css';

const AddTransactionPage = () => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense');
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const removeImage = () => {
    setFile(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!title || !amount) {
      setError('Judul dan nominal wajib diisi');
      return;
    }

    setIsLoading(true);

    try {
      const token = localStorage.getItem('token');

      // Create FormData
      const formData = new FormData();
      formData.append('title', title);
      formData.append('amount', amount);
      formData.append('type', type);
      
      // PENTING: Field file harus bernama 'image'
      if (file) {
        formData.append('image', file);
      }

      const response = await fetch('http://localhost:5000/api/transactions', {
        method: 'POST',
        headers: {
          'x-auth-token': token || '',
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to add transaction');
      }

      // Success - redirect to dashboard
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="add-transaction-container">
      {/* Header */}
      <div className="add-header">
        <button onClick={() => navigate('/dashboard')} className="back-button">
          ← Kembali
        </button>
        <h1 className="page-title">Tambah Transaksi</h1>
      </div>

      {/* Form */}
      <div className="form-container">
        {/* Error Message */}
        {error && (
          <div className="error-message">
            <span className="error-icon">⚠️</span>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="add-form">
          {/* Upload Area */}
          <div className="form-section">
            <label className="section-label">Bukti Struk (Opsional)</label>
            <div className="upload-area">
              {imagePreview ? (
                <div className="preview-container">
                  <img src={imagePreview} alt="Preview" className="preview-image" />
                  <button type="button" onClick={removeImage} className="remove-button">
                    ❌ Hapus
                  </button>
                </div>
              ) : (
                <>
                  <div className="upload-icon">📷</div>
                  <p className="upload-text">Upload Bukti Struk</p>
                  <p className="upload-subtext">Klik untuk memilih gambar</p>
                </>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="file-input"
              />
            </div>
          </div>

          {/* Title Input */}
          <div className="form-section">
            <label className="section-label">Judul Transaksi</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-input"
              placeholder="Contoh: Beli makan siang"
              required
            />
          </div>

          {/* Amount Input */}
          <div className="form-section">
            <label className="section-label">Nominal (Rp)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="form-input"
              placeholder="0"
              min="0"
              required
            />
          </div>

          {/* Type Selection */}
          <div className="form-section">
            <label className="section-label">Tipe Transaksi</label>
            <div className="type-buttons">
              <button
                type="button"
                onClick={() => setType('expense')}
                className={`type-button ${type === 'expense' ? 'active expense' : ''}`}
              >
                📉 Pengeluaran
              </button>
              <button
                type="button"
                onClick={() => setType('income')}
                className={`type-button ${type === 'income' ? 'active income' : ''}`}
              >
                📈 Pemasukan
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="submit-button"
          >
            {isLoading ? (
              <>
                <span className="spinner"></span>
                Menyimpan...
              </>
            ) : (
              <>
                💾 Simpan Transaksi
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTransactionPage;

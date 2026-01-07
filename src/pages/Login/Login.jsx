import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Card, CardContent, Typography, Alert } from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import AppTextField from '../../components/common/AppTextField';
import AppButton from '../../components/common/AppButton';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
    setApiError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setApiError('');

    try {
      const result = await login(formData.email, formData.password);

      if (result.success) {
        navigate('/dashboard');
      } else {
        setApiError(result.error || 'Login failed. Please try again.');
      }
    } catch (error) {
      setApiError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="login-container">
      <Box className="login-content">
        <Card className="login-card" elevation={8}>
          <CardContent sx={{ padding: '52px 48px !important' }}>
            <Box sx={{ textAlign: 'center', marginBottom: 4.5 }}>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 800,
                  marginBottom: 1.5,
                  fontSize: '2rem',
                  background: 'linear-gradient(135deg, #1976d2 0%, #2c5364 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Welcome Back
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: 'text.secondary',
                  fontSize: '0.95rem',
                  fontWeight: 500,
                }}
              >
                Sign in to access your n8n workflows
              </Typography>
            </Box>

            {apiError && (
              <Alert
                severity="error"
                sx={{
                  marginBottom: 3,
                  borderRadius: '10px',
                  border: '1px solid #ffcdd2',
                }}
              >
                {apiError}
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                <AppTextField
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={!!errors.email}
                  helperText={errors.email}
                  placeholder="you@example.com"
                  disabled={loading}
                />

                <AppTextField
                  label="Password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  error={!!errors.password}
                  helperText={errors.password}
                  placeholder="Enter your password"
                  disabled={loading}
                />

                <AppButton
                  type="submit"
                  fullWidth
                  disabled={loading}
                  sx={{
                    marginTop: 1.5,
                    padding: '14px',
                    fontSize: '1rem',
                    fontWeight: 600,
                    borderRadius: '10px',
                    textTransform: 'none',
                    boxShadow: '0 4px 14px rgba(25, 118, 210, 0.3)',
                    '&:hover': {
                      boxShadow: '0 6px 20px rgba(25, 118, 210, 0.4)',
                    },
                  }}
                >
                  {loading ? 'Signing in...' : 'Sign In'}
                </AppButton>
              </Box>
            </form>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Login;

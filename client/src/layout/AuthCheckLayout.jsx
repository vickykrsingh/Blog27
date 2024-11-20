import React, { useEffect, useState, useCallback } from 'react';
import { checkAuthService } from '../services';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { SetUser } from '../redux/slices/authSlice';

function AuthCheckLayout({ children }) {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const checkAuth = useCallback(async () => {
    try {
      const resp = await checkAuthService();
      if (resp.success) {
        dispatch(
          SetUser({
            user: {
              name: resp.user.name,
              _id: resp.user._id,
              username: resp.user.username,
              email: resp.user.email,
            },
          })
        );
      } else {
        dispatch(SetUser({ user: null }));
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Authentication failed');
      dispatch(SetUser({ user: null }));
    } finally {
      setLoading(false); // Ensure loading is false after the check
    }
  }, [dispatch]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator until auth check completes
  }

  return <div>{children}</div>;
}

export default AuthCheckLayout;


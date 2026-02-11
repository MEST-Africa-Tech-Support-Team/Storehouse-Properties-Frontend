import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { authService } from '../../services/authService';
import { toast } from 'react-hot-toast';

const ProtectedRoute = ({ 
  children, 
  requireAdmin = false,
  requireVerified = false 
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const validateAccess = async () => {
      try {
        if (!authService.isAuthenticated()) {
          throw new Error('UNAUTHORIZED');
        }

        const user = authService.getCurrentUser();
        if (!user) {
          authService.logout();
          throw new Error('UNAUTHORIZED');
        }

        if (requireVerified && !user.isVerified) {
          toast.error('Please verify your email to access this section', { duration: 5000 });
          navigate('/auth/verify-email', { 
            state: { from: location, requireVerification: true },
            replace: true 
          });
          return;
        }

        if (requireAdmin && user.role !== 'admin') {
          toast.error('Admin access required', { duration: 3000 });
          navigate('/dashboard', { replace: true });
          return;
        }

        setIsAuthorized(true);
      } catch (error) {
        console.error('Access validation error:', error);
        
        if (error.message === 'UNAUTHORIZED') {
          localStorage.setItem('postLoginRedirect', JSON.stringify({
            pathname: location.pathname,
            search: location.search,
            state: location.state
          }));
          
          navigate('/auth/login', { 
            state: { from: location },
            replace: true 
          });
        }
      } finally {
        setIsLoading(false);
      }
    };

    validateAccess();
  }, [requireAdmin, requireVerified, navigate, location]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return isAuthorized ? children : null;
};

export default ProtectedRoute;
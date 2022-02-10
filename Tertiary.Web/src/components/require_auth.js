import React from 'react';
import { Navigate } from "react-router-dom";

import { authService } from '../services/auth.service';

export function RequireAuth({ children }) {
    const currentUser = authService.userValue;
    return !currentUser
      ? <Navigate
          to="/signin"
          state={{ path: window.location.pathname }}
          replace /> : children;
  }
  
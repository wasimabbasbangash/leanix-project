import React from 'react';

import { Navigate, Route, Routes } from 'react-router-dom';

import { AppContent } from '../../app-content';
import { RepositoryIssues } from '../../modules/repository-issues/repository-issues';
import { RepositoryList } from '../../modules/repository-list/repository-list';

// AppRoutes is responsible for defining the application's route structure
const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Route for the AppContent component, which is the entry point of the app.
          It renders the main card where the user can input the Git token */}
      <Route path="/" element={<AppContent />} />

      {/* Route for the RepositoryList component, which displays all repositories */}
      <Route path="/repository" element={<RepositoryList />} />

      {/* Route for the RepositoryIssues component, which renders the details of a repository along with its issues */}
      <Route path="/repository/issues" element={<RepositoryIssues />} />

      {/* Redirect any unknown paths to the AppContent component */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;

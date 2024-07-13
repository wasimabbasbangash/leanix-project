import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AppContent } from '../../app-content';
import { RepositoryIssues } from '../../modules/repository-issues/repository-issues';
import { RepositoryList } from '../../modules/repository-list/repository-list';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<AppContent />} />
      <Route path="/repository" element={<RepositoryList />} />

      <Route path="/repository/issues" element={<RepositoryIssues />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;

import { useState } from 'react';
import { studentService } from '../services/api';
import { companyService } from '../services/api';

export const useProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getStudentProfile = async () => {
    try {
      setLoading(true);
      const response = await studentService.getProfile();
      setProfile(response);
    } catch (error) {
      setError(error);
    }
  };

  const updateStudentProfile = async (data) => {
    try {
      setLoading(true);
      const response = await studentService.updateProfile(data);
      setProfile(response); // studentService renvoie déjà les données
    } catch (error) {
      setError(error);
    }
  };

  const getCompanyProfile = async () => {
    try {
      setLoading(true);
      const response = await companyService.getProfile();
      setProfile(response);
    } catch (error) {
      setError(error);
    }
  };

  const updateCompanyProfile = async (data) => {
    try {
      setLoading(true);
      const response = await companyService.updateProfile(data);
      setProfile(response);
    } catch (error) {
      setError(error);
    }
  };
  return { profile, loading, error, getStudentProfile, updateStudentProfile, getCompanyProfile, updateCompanyProfile };
};
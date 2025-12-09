import { useState } from 'react';
import { studentService } from '../services/api';

export const useProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getProfile = async () => {
    try {
      setLoading(true);
      const response = await studentService.getProfile();
      setProfile(response);
    } catch (error) {
      setError(error);
    }
  };

  const updateProfile = async (data) => {
    try {
      setLoading(true);
      const response = await studentService.updateProfile(data);
      setProfile(response); // studentService renvoie déjà les données
    } catch (error) {
      setError(error);
    }
  };

  return { profile, loading, error, getProfile, updateProfile };
};
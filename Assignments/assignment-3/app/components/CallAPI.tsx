import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const options = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': '5f79cc60aemsh5ed870d68e2972bp163efcjsne381bba9950d',
    'x-rapidapi-host': 'numbersapi.p.rapidapi.com',
  },
};

interface CallAPIProps {
  monthValue: string;
  dayValue: string;
  setApiResult: (result: string) => void;
}

const CallAPI: React.FC<CallAPIProps> = ({ monthValue, dayValue, setApiResult }) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (monthValue && dayValue) {
      const fetchData = async () => {
        setLoading(true);
        try {
          const response = await fetch(`https://numbersapi.p.rapidapi.com/${monthValue}/${dayValue}/date`, options);
          const result = await response.text();
          setApiResult(result);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [monthValue, dayValue]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return null;
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default CallAPI;
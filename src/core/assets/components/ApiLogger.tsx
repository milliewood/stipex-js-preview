import React, { useEffect, useState } from 'react';
import { Timeline, Text } from '@mantine/core';
import { IconGitBranch, IconGitPullRequest, IconGitCommit, IconMessageDots } from '@tabler/icons-react';
import axios from 'axios';

const API_URL = process.env.STIPEX_LOGIN_API_SERVER;

export default function TimeLineAPILogger() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await axios.get(API_URL, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
          }
        });
        setLogs(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <div className='mt-4'>
      <Timeline active={1} bulletSize={24} lineWidth={2}>
        {logs.map((log, index) => (
          <Timeline.Item
            key={index}
            bullet={<IconGitBranch size={12} />}
            title={`Log ${index + 1}`}
          >
            <Text c="dimmed" size="sm">{log.message}</Text>
            <Text size="xs" mt={4}>{new Date(log.created_at).toLocaleString()}</Text>
          </Timeline.Item>
        ))}
      </Timeline>
    </div>
  );
}

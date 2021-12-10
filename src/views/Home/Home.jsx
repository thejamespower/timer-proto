import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TimerCreator from '../../components/TimerCreator';
import TimerList from '../../components/TimerList';

export default function Home() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '4rem',
      }}
    >
      <div style={{ width: '100%', maxWidth: '50vw' }}>
        <Card style={{ marginBottom: '4rem' }}>
          <CardContent>
            <TimerCreator />
          </CardContent>
        </Card>
        <TimerList />
      </div>
    </div>
  );
}

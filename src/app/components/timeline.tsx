import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';

export default function TimelinePage() {
  return (
    <Timeline position="alternate">
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          {' '}
          <h1 className="text-2xl text-white">เปิดรับสมัคร</h1>
          <h1 className="text-2xl text-white">8-15 ตุลาคม 2568</h1>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <h1 className="text-2xl text-white">ประกาศผลและยืนยันสิทธิ์</h1>
          <h1 className="text-2xl text-white">20-23 ตุลาคม 2568</h1>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          {' '}
          <h1 className="text-2xl text-white">Pre-camp</h1>
          <h1 className="text-2xl text-white">17 พฤศจิกายน 2568</h1>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot />
        </TimelineSeparator>
        <TimelineContent>
          <h1 className="text-2xl text-white">วันค่าย</h1>
          <h1 className="text-2xl text-white">8-15 พฤศจิกายน 2568</h1>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  );
}

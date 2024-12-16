import React from 'react';
import { List, Card, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { courseData } from '../data/courseData';
import { BookOutlined } from '@ant-design/icons';
import '../styles/CourseList.css';

const { Title } = Typography;

const CourseList = () => {
  const { name, lessons } = courseData.grade1Semester1;

  return (
    <div className="course-list-container">
      <Title level={2} className="page-title">
        <BookOutlined className="title-icon" /> {name}
      </Title>
      <List
        grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 3, xl: 4 }}
        dataSource={lessons}
        renderItem={lesson => (
          <List.Item>
            <Link to={`/lesson/${lesson.id}`} className="lesson-link">
              <Card 
                hoverable 
                className="lesson-card"
                title={lesson.title}
              >
                <div className="lesson-preview">
                  {lesson.characters.slice(0, 4).map((char, index) => (
                    <span key={index} className="preview-char">{char}</span>
                  ))}
                  {lesson.characters.length > 4 && <span className="more">...</span>}
                </div>
                <div className="lesson-info">
                  共 {lesson.characters.length} 个汉字
                </div>
              </Card>
            </Link>
          </List.Item>
        )}
      />
    </div>
  );
};

export default CourseList;
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Row, Col, Card, Typography } from 'antd';
import { LeftOutlined, BookOutlined } from '@ant-design/icons';
import StrokeDisplay from './StrokeDisplay';
import { courseData } from '../data/courseData';
import '../styles/LessonDetail.css';

const { Title } = Typography;

const LessonDetail = () => {
  const { id } = useParams();
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  
  const lesson = courseData.grade1Semester1.lessons.find(
    lesson => lesson.id === parseInt(id)
  );

  const handleComplete = (index) => {
    if (index < lesson.characters.length - 1) {
      // 延迟一秒后开始下一个字的演示
      setTimeout(() => {
        setCurrentCharIndex(index + 1);
      }, 1000);
    }
  };

  return (
    <div className="lesson-detail-container">
      <div className="lesson-header">
        <Link to="/" className="back-link custom-button">
          <LeftOutlined /> 返回课程列表
        </Link>
        <div className="title-container">
          <BookOutlined className="lesson-icon" />
          <Title level={2}>{lesson.title}</Title>
          <div className="lesson-subtitle">
            共 {lesson.characters.length} 个生字
          </div>
        </div>
      </div>
      
      <Row gutter={[16, 16]}>
        {lesson.characters.map((char, index) => (
          <Col key={index} xs={24} sm={12} md={8} lg={6}>
            <StrokeDisplay 
              character={char}
              autoStart={currentCharIndex === index}
              onComplete={() => handleComplete(index)}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default LessonDetail;
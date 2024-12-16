import React from 'react';
import { Layout, Button } from 'antd';  // 添加 Button 导入
import CharacterInput from './components/CharacterInput';
import StrokeDisplay from './components/StrokeDisplay';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CourseList from './components/CourseList';
import LessonDetail from './components/LessonDetail';
import './styles/App.css';

const { Header, Content } = Layout;

function App() {
  const [characters, setCharacters] = React.useState('');
  const [currentIndex, setCurrentIndex] = React.useState(-1);

  const handleCharacterChange = (chars) => {
    setCharacters(chars);
    setCurrentIndex(-1);  // 重置索引
  };

  const startAnimation = () => {
    setCurrentIndex(0);  // 开始第一个动画
  };

  const handleAnimationComplete = (index) => {
    if (index < characters.length - 1) {
      setCurrentIndex(index + 1);  // 自动开始下一个
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<CourseList />} />
        <Route path="/lesson/:id" element={<LessonDetail />} />
      </Routes>
    </Router>
    // <Layout className="app-layout">
    //   <Header className="app-header">
    //     <h1>汉字笔顺演示</h1>
    //   </Header>
    //   <Content className="app-content">
    //     <CharacterInput onCharacterChange={handleCharacterChange} />
    //     <div className="characters-container">
    //       <Button 
    //         type="primary"
    //         onClick={startAnimation}
    //         style={{ marginBottom: '20px' }}
    //       >
    //         开始演示全部
    //       </Button>
    //       <div className="characters-grid">
    //         {characters.split('').map((char, index) => (
    //           <StrokeDisplay 
    //             key={index}
    //             character={char}
    //             autoStart={currentIndex === index}
    //             onComplete={() => handleAnimationComplete(index)}
    //           />
    //         ))}
    //       </div>
    //     </div>
    //   </Content>
    // </Layout>
  );
}

export default App;

import React, { useState } from 'react';  // 添加 useState
import { Input, Card } from 'antd';
import '../styles/CharacterInput.css';

const CharacterInput = ({ onCharacterChange }) => {
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    const inputValue = e.target.value;
    setValue(inputValue);  // 先更新输入框的值
    
    // 然后过滤非中文字符并传递给父组件
    const characters = inputValue.replace(/[^\u4e00-\u9fa5]/g, '');
    onCharacterChange(characters);
  };

  return (
    <Card className="character-input-card">
      <h2>请输入汉字</h2>
      <Input.TextArea
        placeholder="在此输入汉字（支持多行）"
        onChange={handleChange}
        value={value}  // 添加 value 属性
        className="character-input"
        rows={3}
      />
    </Card>
  );
};

export default CharacterInput;
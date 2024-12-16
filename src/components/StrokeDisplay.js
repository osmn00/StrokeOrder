import React, { useEffect, useRef, useState } from 'react';
import HanziWriter from 'hanzi-writer';
import { Card, Button, Space, Spin } from 'antd';
import { PlayCircleOutlined, RedoOutlined } from '@ant-design/icons';
import { getPinyin } from '../utils/pinyin';
import '../styles/StrokeDisplay.css';

import { speak } from '../utils/speech';

const StrokeDisplay = ({ character, autoStart, onComplete }) => {
  const writerRef = useRef(null);
  const containerRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const initWriter = async () => {
      if (containerRef.current && character) {
        setLoading(true);
        setIsAnimating(false);
        
        // 清理旧的实例
        if (writerRef.current) {
          writerRef.current = null;
        }

        try {
          // 等待一个微任务周期，确保DOM已更新
          await Promise.resolve();
          
          const writer = HanziWriter.create(containerRef.current, character, {
            width: 140,
            height: 140,
            padding: 0,
            delayBetweenStrokes: 1000,      // 恢复原始延迟时间
            strokeAnimationSpeed: 1,         // 保持原始绘制速度
            showOutline: true,
            radicalColor: '#168F16',
            strokeColor: '#168F16',
            onLoadCharDataSuccess: () => {
              setLoading(false);
              writerRef.current.showCharacter();  // 立即显示文字
            }
          });
          writerRef.current = writer;
        } catch (error) {
          console.error('Error creating HanziWriter:', error);
          setLoading(false);
        }
      }
    };

    initWriter();

    return () => {
      if (writerRef.current) {
        writerRef.current = null;
      }
    };
  }, [character]);

  useEffect(() => {
    if (autoStart && writerRef.current && !isAnimating) {
      handleAnimateStrokes();
    }
  }, [autoStart]);

  const handleAnimateStrokes = () => {
    if (writerRef.current && !isAnimating) {
      setIsAnimating(true);
      writerRef.current.animateCharacter({
        onComplete: () => {
          setIsAnimating(false);
          onComplete?.();
        }
      });
    }
  };

  const handleReset = () => {
    if (writerRef.current) {
      writerRef.current.cancelAnimation();
      writerRef.current.hideCharacter();
      writerRef.current.showOutline();
      setIsAnimating(false);
    }
  };

  const handleSpeak = () => {
    speak(character);
  };

  return (
    <Card className="stroke-display-card">
      <div className="pinyin-char-container">
        <div className="pinyin-container">
          <span className="pinyin">{getPinyin(character)}</span>
          <button className="speak-button" onClick={handleSpeak} title="播放发音">
            📢
          </button>
        </div>
        <div className="character-container">
          <div className="grid-background"></div>
          <svg 
            ref={containerRef} 
            className="character-display" 
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 150 150"
          />
        </div>
      </div>
      <div className="controls">
        <button 
          className="custom-button primary"
          onClick={handleAnimateStrokes}
          disabled={loading || isAnimating}
        >
          <PlayCircleOutlined /> 演示笔顺
        </button>
        <button 
          className="custom-button"
          onClick={handleReset}
          disabled={loading || isAnimating}
        >
          <RedoOutlined /> 重置
        </button>
      </div>
    </Card>
  );
};

export default StrokeDisplay;
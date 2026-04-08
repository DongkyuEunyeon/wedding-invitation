import React, { useState, useEffect, useRef } from 'react';
import { Button } from "../button";

interface GameItem {
  id: number;
  left: number;
  top: number; // 내부 계산용
  type: 'heart' | 'ring';
}

const HeartGame: React.FC = () => {
  const [score, setScore] = useState<number>(0);
  const [items, setItems] = useState<GameItem[]>([]);
  const [playerX, setPlayerX] = useState<number>(50);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  
  const gameContainer = useRef<HTMLDivElement>(null);
  const playerXRef = useRef<number>(50);
  const scoreRef = useRef<number>(0);
  const requestRef = useRef<number>(); // 애니메이션 프레임 참조

  const updateScore = (newScore: number) => {
    setScore(newScore);
    scoreRef.current = newScore;
  };

  // 1. 하트/반지 생성 로직 (생성 주기는 이전과 동일하게 700ms)
  useEffect(() => {
    if (isGameOver) return;
    const interval = setInterval(() => {
      if (scoreRef.current >= 1010) return;

      const isRingTime = scoreRef.current >= 1000;
      if (isRingTime && items.some(i => i.type === 'ring')) return;

      const newItem: GameItem = { 
        id: Date.now(), 
        left: Math.random() * 80 + 10,
        top: -10,
        type: isRingTime ? 'ring' : 'heart'
      };

      setItems((prev) => isRingTime ? [...prev, newItem] : (scoreRef.current < 1000 ? [...prev, newItem] : prev));
    }, 700);
    return () => clearInterval(interval);
  }, [isGameOver, items.length]);

  // 2. 핵심: requestAnimationFrame을 이용한 60 FPS 이동 및 충돌 감지
  const updateGame = () => {
    if (isGameOver) return;

    setItems((prev) => {
      const updatedItems: GameItem[] = [];
      let missed = false;

      for (const item of prev) {
        // FPS 60 기준 부드러운 하강 (숫자가 높을수록 빠름)
        const nextTop = item.top + 0.8; 
        
        // 충돌 판정 (범위 최적화)
        const isHit = nextTop > 78 && nextTop < 88 && Math.abs(item.left - playerXRef.current) < 15;

        if (isHit) {
          if (item.type === 'ring') {
            updateScore(1010);
            setIsGameOver(true);
          } else {
            updateScore(scoreRef.current + 10);
          }
          continue;
        }

        if (nextTop >= 100) {
          missed = true;
          break;
        }
        updatedItems.push({ ...item, top: nextTop });
      }

      if (missed) {
        setIsGameOver(true);
        return prev;
      }
      return updatedItems;
    });

    requestRef.current = requestAnimationFrame(updateGame);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(updateGame);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isGameOver]);

  // 3. 컨트롤러 이동
  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!gameContainer.current || isGameOver) return;
    const rect = gameContainer.current.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const x = ((clientX - rect.left) / rect.width) * 100;
    const newX = Math.min(Math.max(x, 0), 100);
    setPlayerX(newX);
    playerXRef.current = newX;
  };

  return (
    <div 
      ref={gameContainer}
      onMouseMove={handleMove}
      onTouchMove={handleMove}
      style={{ 
        width: '100%', height: '240px', background: '#FFF9FA', position: 'relative', 
        overflow: 'hidden', borderRadius: '12px', border: '1px solid #FFE0E6', 
        touchAction: 'none', marginTop: '10px'
      }}
    >
      <div style={{ position: 'absolute', top: '12px', left: '12px', fontSize: '0.85rem', color: '#FF85A2', fontWeight: 'bold', zIndex: 10 }}>
        축복 포인트: {score}
      </div>

      {/* GPU 가속을 위해 top 대신 transform: translate3d 사용 */}
      {!isGameOver && items.map(item => (
        <div key={item.id} style={{ 
          position: 'absolute', 
          left: `${item.left}%`, 
          top: 0,
          fontSize: item.type === 'ring' ? '28px' : '22px',
          willChange: 'transform',
          transform: `translate3d(-50%, ${item.top * 2.4}px, 0)` // 240px 높이에 맞춘 계산
        }}>
          {item.type === 'ring' ? '💍' : '❤️'}
        </div>
      ))}

      {/* 캐릭터에도 GPU 가속 적용 */}
      {!isGameOver && (
        <div style={{ 
          position: 'absolute', 
          left: 0,
          bottom: '15px', 
          fontSize: '32px', 
          willChange: 'transform',
          transform: `translate3d(${playerX * (gameContainer.current?.clientWidth || 0) / 100}px, 0, 0) translateX(-50%)`
        }}>
          👩🏻‍❤️‍👨🏻
        </div>
      )}

      {/* 결과 화면 생략 (이전과 동일) */}
      {isGameOver && (
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(255, 255, 255, 0.9)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', zIndex: 20 }}>
          <div style={{ fontSize: '0.9rem', color: '#444', lineHeight: '1.6' }}>
            {score >= 1010 ? <>💕 축복해주셔서 감사합니다!<br /><strong style={{ color: '#FF6B8B' }}>10월 10일</strong>에 뵙겠습니다!</> : <>사랑을 놓쳤어요! 다시 한번 축복해주세요 😢</>}
          </div>
          <Button buttonStyle="style2" style={{ fontSize: '0.75rem', marginTop: '10px' }} onClick={() => { updateScore(0); setItems([]); setIsGameOver(false); }}>재도전 하기</Button>
        </div>
      )}
    </div>
  );
};

export default HeartGame;
import React, { useState, useEffect, useRef } from 'react';
import { Button } from "../button";

interface GameItem {
  id: number;
  left: number;
  top: number;
  type: 'heart' | 'ring';
}

const HeartGame: React.FC = () => {
  const [score, setScore] = useState<number>(0);
  const [items, setItems] = useState<GameItem[]>([]);
  const [playerX, setPlayerX] = useState<number>(50);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);

  // 생성된 아이템 개수를 추적하기 위한 Ref
  const heartCountRef = useRef<number>(0);
  const gameContainer = useRef<HTMLDivElement>(null);
  const playerXRef = useRef<number>(50);
  const scoreRef = useRef<number>(0);
  const requestRef = useRef<number>(0);

  const updateScore = (newScore: number) => {
    setScore(newScore);
    scoreRef.current = newScore;
  };

  // 1. 하트/반지 생성 로직 (개수 기반: 하트 101개 후 반지 1개)
  useEffect(() => {
    if (isGameOver) return;
    const interval = setInterval(() => {
      // 총 102개(하트 101 + 반지 1)가 생성되면 중단
      if (heartCountRef.current >= 102) {
        clearInterval(interval);
        return;
      }

      const currentCount = heartCountRef.current;
      const isRingTime = currentCount === 101;

      const newItem: GameItem = {
        id: Date.now() + Math.random(), // ID 중복 방지
        left: Math.random() * 80 + 10,
        top: -10,
        type: isRingTime ? 'ring' : 'heart'
      };

      setItems((prev) => [...prev, newItem]);
      heartCountRef.current += 1;
    }, 700);
    return () => clearInterval(interval);
  }, [isGameOver]);

  // 2. 60 FPS 이동 및 충돌 감지
  const updateGame = () => {
    if (isGameOver) return;

    setItems((prev) => {
      const updatedItems: GameItem[] = [];
      let missed = false;

      for (const item of prev) {
        const nextTop = item.top + 0.9;
        const isHit = nextTop > 75 && nextTop < 90 && Math.abs(item.left - playerXRef.current) < 15;

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
        touchAction: 'none', marginTop: '10px',
        zIndex: 1
      }}
    >
      <div style={{ 
        position: 'absolute', top: '12px', left: '12px', 
        fontSize: '0.85rem', color: '#FF85A2', fontWeight: 'bold', 
        zIndex: 2, pointerEvents: 'none' 
      }}>
        축복 포인트: {score}
      </div>

      {!isGameOver && items.map(item => (
        <div key={item.id} style={{
          position: 'absolute',
          left: `${item.left}%`,
          top: 0,
          fontSize: item.type === 'ring' ? '28px' : '22px',
          willChange: 'transform',
          transform: `translate3d(-50%, ${item.top * 2.4}px, 0)`,
          zIndex: 1
        }}>
          {item.type === 'ring' ? '💍' : '❤️'}
        </div>
      ))}

      {!isGameOver && (
        <div style={{
          position: 'absolute',
          left: 0,
          bottom: '15px',
          fontSize: '32px',
          willChange: 'transform',
          transform: `translate3d(${playerX * (gameContainer.current?.clientWidth || 0) / 100}px, 0, 0) translateX(-50%)`,
          zIndex: 1
        }}>
          👩🏻‍❤️‍👨🏻
        </div>
      )}

      {isGameOver && (
        <div style={{ 
          position: 'absolute', inset: 0, background: 'rgba(255, 255, 255, 0.9)', 
          display: 'flex', flexDirection: 'column', alignItems: 'center', 
          justifyContent: 'center', textAlign: 'center', 
          zIndex: 3 
        }}>
          <div style={{ fontSize: '0.9rem', color: '#444', lineHeight: '1.6', padding: '0 20px' }}>
            {score >= 1010 ? (
              <>나무가 나무에게 말했습니다.<br />우리가 더불어 숲이 되어 지키자.<br />은연아 나랑 결혼해 줄래?👰🏻‍♀️🤵🏻</>
            ) : (
              <>하트를 놓쳤어요!<br />다시 한번 축복해 주세요🎉</>
            )}
          </div>
          <Button 
            buttonStyle="style2" 
            style={{ fontSize: '0.75rem', marginTop: '10px' }} 
            onClick={() => { 
              updateScore(0); 
              setItems([]); 
              heartCountRef.current = 0; 
              setIsGameOver(false); 
            }}
          >
            재도전 하기
          </Button>
        </div>
      )}
    </div>
  );
};

export default HeartGame;
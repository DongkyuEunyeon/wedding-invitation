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
  
  const gameContainer = useRef<HTMLDivElement>(null);
  const playerXRef = useRef<number>(50);
  const scoreRef = useRef<number>(0);

  const updateScore = (newScore: number) => {
    setScore(newScore);
    scoreRef.current = newScore;
  };

  // 1. 아이템 생성 (700ms 간격 복구)
  useEffect(() => {
    if (isGameOver) return;
    
    const interval = setInterval(() => {
      if (scoreRef.current >= 1010) return;

      const isRingTime = scoreRef.current >= 1000;
      // 이미 반지가 화면에 있으면 생성 안함
      if (isRingTime && items.some(i => i.type === 'ring')) return;

      const newItem: GameItem = { 
        id: Date.now(), 
        left: Math.random() * 80 + 10, // 좌우 끝에 너무 붙지 않게
        top: -10,
        type: isRingTime ? 'ring' : 'heart'
      };

      setItems((prev) => {
        if (isRingTime) return [...prev, newItem]; // 1000점이면 반지 추가
        if (scoreRef.current < 1000) return [...prev, newItem]; // 1000점 미만일 때만 하트 추가
        return prev;
      });
    }, 700); // 생성 속도 복구

    return () => clearInterval(interval);
  }, [isGameOver, items.length]); // items.length를 넣어 상태 변화 감지

  // 2. 이동 및 충돌 감지 (5px 이동 복구)
  useEffect(() => {
    if (isGameOver) return;

    const moveInterval = setInterval(() => {
      setItems((prev) => {
        const updatedItems: GameItem[] = [];
        let missed = false;

        for (const item of prev) {
          const nextTop = item.top + 5; // 이동 속도 5로 복구
          
          // 충돌 판정 (좌우 범위를 15로 늘려 더 잘 잡히게 수정)
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
            // 반지를 놓치거나 하트를 놓치면 게임 오버
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
    }, 50);

    return () => clearInterval(moveInterval);
  }, [isGameOver]);

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!gameContainer.current || isGameOver) return;
    const rect = gameContainer.current.getBoundingClientRect();
    let clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
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
      <div style={{ 
        position: 'absolute', top: '12px', left: '12px', 
        fontSize: '0.85rem', color: '#FF85A2', fontWeight: 'bold', zIndex: 10 
      }}>
        축복 포인트: {score}
      </div>

      {/* 아이템 렌더링 */}
      {!isGameOver && items.map(item => (
        <div key={item.id} style={{ 
          position: 'absolute', left: `${item.left}%`, top: `${item.top}%`, 
          fontSize: item.type === 'ring' ? '28px' : '22px',
          transform: 'translateX(-50%)'
        }}>
          {item.type === 'ring' ? '💍' : '❤️'}
        </div>
      ))}

      {/* 캐릭터 */}
      {!isGameOver && (
        <div style={{ 
          position: 'absolute', left: `${playerX}%`, bottom: '15px', 
          fontSize: '32px', transition: 'left 0.1s ease-out', transform: 'translateX(-50%)' 
        }}>
          👩🏻‍❤️‍👨🏻
        </div>
      )}

      {/* 결과 화면 */}
      {isGameOver && (
        <div style={{ 
          position: 'absolute', inset: 0, background: 'rgba(255, 255, 255, 0.9)', 
          display: 'flex', flexDirection: 'column', alignItems: 'center', 
          justifyContent: 'center', textAlign: 'center', zIndex: 20 
        }}>
          <div style={{ fontSize: '0.9rem', color: '#444', lineHeight: '1.6' }}>
            {score >= 1010 ? (
              <>💕 축복해 주셔서 감사합니다!<br /><strong style={{ color: '#FF6B8B' }}>10월 10일</strong>에 뵙겠습니다!</>
            ) : (
              <>하트를 놓쳤어요! 다시 한번 축복해 주세요🎉</>
            )}
          </div>
          <Button 
            buttonStyle="style2" 
            style={{ fontSize: '0.75rem', marginTop: '10px' }} 
            onClick={() => { 
              updateScore(0); 
              setItems([]); 
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
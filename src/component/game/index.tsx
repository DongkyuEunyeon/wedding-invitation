import React, { useState, useEffect, useRef } from 'react';
import { Button } from "../button";

interface GameItem {
  id: number;
  left: number;
  top: number; // 0 ~ 100 범위 내 계산용
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
  const requestRef = useRef<number>(0);

  const updateScore = (newScore: number) => {
    setScore(newScore);
    scoreRef.current = newScore;
  };

  // 1. 하트/반지 생성 로직 (700ms 간격)
  useEffect(() => {
    if (isGameOver) return;
    const interval = setInterval(() => {
      if (scoreRef.current >= 1010) return;

      const isRingTime = scoreRef.current >= 1000;
      // 화면에 반지가 이미 있다면 생성 안 함
      if (isRingTime && items.some(i => i.type === 'ring')) return;

      const newItem: GameItem = {
        id: Date.now(),
        left: Math.random() * 80 + 10,
        top: -10,
        type: isRingTime ? 'ring' : 'heart'
      };

      setItems((prev) => 
        isRingTime ? [...prev, newItem] : (scoreRef.current < 1000 ? [...prev, newItem] : prev)
      );
    }, 700);
    return () => clearInterval(interval);
  }, [isGameOver, items.length]);

  // 2. 60 FPS 이동 및 충돌 감지 (GPU 가속용 로직)
  const updateGame = () => {
    if (isGameOver) return;

    setItems((prev) => {
      const updatedItems: GameItem[] = [];
      let missed = false;

      for (const item of prev) {
        // 부드러운 하강 속도
        const nextTop = item.top + 0.9;

        // 충돌 판정 (범위 최적화)
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

  // 3. 컨트롤러 이동 처리
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
        zIndex: 1 // 모달보다 낮은 레이어 유지
      }}
    >
      {/* 점수 UI: zIndex를 낮춰서 모달에 가려지게 함 */}
      <div style={{ 
        position: 'absolute', top: '12px', left: '12px', 
        fontSize: '0.85rem', color: '#FF85A2', fontWeight: 'bold', 
        zIndex: 2, pointerEvents: 'none' 
      }}>
        축복 포인트: {score}
      </div>

      {/* 아이템 렌더링 (GPU 가속) */}
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

      {/* 캐릭터 렌더링 (GPU 가속) */}
      {!isGameOver && (
        <div style={{
          position: 'absolute',
          left: 0,
          bottom: '15px',
          fontSize: '32px',
          willChange: 'transform',
          // playerX 값에 따라 translate3d로 이동
          transform: `translate3d(${playerX * (gameContainer.current?.clientWidth || 0) / 100}px, 0, 0) translateX(-50%)`,
          zIndex: 1
        }}>
          👩🏻‍❤️‍👨🏻
        </div>
      )}

      {/* 게임 종료 화면: zIndex를 3으로 설정 (모달보다 무조건 낮음) */}
      {isGameOver && (
        <div style={{ 
          position: 'absolute', inset: 0, background: 'rgba(255, 255, 255, 0.9)', 
          display: 'flex', flexDirection: 'column', alignItems: 'center', 
          justifyContent: 'center', textAlign: 'center', 
          zIndex: 3 
        }}>
          <div style={{ fontSize: '0.9rem', color: '#444', lineHeight: '1.6', padding: '0 20px' }}>
            {score >= 1010 ? (
              <>은연아 나랑 결혼해 줄래?👰🏻‍♀️🤵🏻</>
              /*
              <>💕 축복해 주셔서 감사합니다!<br /><strong style={{ color: '#FF6B8B' }}>10월 10일</strong>에 뵙겠습니다!</>
              */
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
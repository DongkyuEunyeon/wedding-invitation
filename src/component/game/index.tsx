import React, { useState, useEffect, useRef } from 'react';
import { Button } from "../button"; // 프로젝트 구조에 맞게 경로를 확인해주세요.

/**
 * 하트 아이템 인터페이스
 */
interface HeartItem {
  id: number;
  left: number;
  top: number;
}

/**
 * 하트 받기 게임 컴포넌트 (서바이벌 모드)
 */
const HeartGame: React.FC = () => {
  const [score, setScore] = useState<number>(0);
  const [items, setItems] = useState<HeartItem[]>([]);
  const [playerX, setPlayerX] = useState<number>(50);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  
  const gameContainer = useRef<HTMLDivElement>(null);
  // 점수 중복 방지 및 실시간 위치 참조를 위한 Ref
  const playerXRef = useRef<number>(50);

  // 1. 하트 생성 로직
  useEffect(() => {
    if (isGameOver) return;
    const interval = setInterval(() => {
      const newItem: HeartItem = { 
        id: Date.now(), 
        left: Math.random() * 90, 
        top: -20 
      };
      setItems((prev) => [...prev, newItem]);
    }, 700);
    return () => clearInterval(interval);
  }, [isGameOver]);

  // 2. 하트 이동 및 충돌 감지 (중복 점수 방지 로직 포함)
  useEffect(() => {
    if (isGameOver) return;

    const moveInterval = setInterval(() => {
      setItems((prev) => {
        const updatedItems: HeartItem[] = [];
        let missed = false;

        for (const item of prev) {
          const nextTop = item.top + 5;
          
          // 충돌 판정 범위 (playerXRef를 사용하여 정확한 위치 참조)
          const isHit = nextTop > 75 && nextTop < 85 && Math.abs(item.left - playerXRef.current) < 12;

          if (isHit) {
            // 하트를 먹으면 점수 10점 추가 후 배열에서 즉시 제거(updatedItems에 넣지 않음)
            setScore(s => s + 5);
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
    }, 50);

    return () => clearInterval(moveInterval);
  }, [isGameOver]);

  // 3. 컨트롤러 이동 처리
  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!gameContainer.current || isGameOver) return;
    
    const rect = gameContainer.current.getBoundingClientRect();
    let clientX: number;
    
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
    } else {
      clientX = (e as React.MouseEvent).clientX;
    }
    
    const x = ((clientX - rect.left) / rect.width) * 100;
    const newX = Math.min(Math.max(x, 0), 90);
    
    setPlayerX(newX);
    playerXRef.current = newX;
  };

  return (
    <div 
      ref={gameContainer}
      onMouseMove={handleMove}
      onTouchMove={handleMove}
      style={{ 
        width: '100%', 
        height: '240px', 
        background: '#FFF9FA', 
        position: 'relative', 
        overflow: 'hidden', 
        borderRadius: '12px',
        border: '1px solid #FFE0E6', 
        touchAction: 'none', 
        marginTop: '10px'
      }}
    >
      {/* 점수 UI */}
      <div style={{ 
        position: 'absolute', top: '12px', left: '12px', 
        fontSize: '0.85rem', color: '#FF85A2', fontWeight: 'bold', zIndex: 10 
      }}>
        축복 포인트: {score}
      </div>

      {!isGameOver && (
        <div style={{ position: 'absolute', top: '12px', right: '12px', fontSize: '0.65rem', color: '#FFB3C6' }}>
          하트를 모아주세요!
        </div>
      )}
      
      {/* 하트 렌더링 */}
      {!isGameOver && items.map(item => (
        <div key={item.id} style={{ 
          position: 'absolute', left: `${item.left}%`, top: `${item.top}%`, 
          fontSize: '22px' 
        }}>❤️</div>
      ))}

      {/* 캐릭터 렌더링 */}
      {!isGameOver && (
        <div style={{ 
          position: 'absolute', left: `${playerX}%`, bottom: '15px', 
          fontSize: '32px', transition: 'left 0.1s ease-out', transform: 'translateX(-50%)' 
        }}>👩‍❤️‍👨</div>
      )}

      {/* 게임 종료 화면 */}
      {isGameOver && (
        <div style={{ 
          position: 'absolute', inset: 0, background: 'rgba(255, 255, 255, 0.9)', 
          display: 'flex', flexDirection: 'column', alignItems: 'center', 
          justifyContent: 'center', textAlign: 'center', zIndex: 20 
        }}>
          <div style={{ fontSize: '0.9rem', color: '#444', lineHeight: '1.6' }}>
            💕 축복해주셔서 감사합니다!<br />
            <strong style={{ color: '#FF6B8B' }}>10월 10일</strong>에 뵙겠습니다!
          </div>
          <Button 
            buttonStyle="style2" 
            style={{ fontSize: '0.75rem', marginTop: '10px' }} 
            onClick={() => { 
              setScore(0); 
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
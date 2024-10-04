import React, { useState } from 'react';
import Header from './Header';  // ヘッダーコンポーネントのインポート
import EurasiaMap from './Eurasia/EurasiaMap';  // 各大陸のマップコンポーネントをインポート
import NorthAmericaMap from './NorthAmerica/NorthAmericaMap';
import SouthAmericaMap from './SouthAmerica/SouthAmericaMap';
import AustraliaMap from './Australia/AustraliaMap';
import SouthAfricaMap from './SouthAfrica/SouthAfricaMap';

interface MapContainerProps {
  continent: string; // どの大陸を表示するかを指定
}

const ResetMap: React.FC<MapContainerProps> = ({ continent }) => {
  const [resetKey, setResetKey] = useState<number>(0);  // リセット用のキー

  const handleReset = () => {
    // リセットするためにキーを更新
    setResetKey(prevKey => prevKey + 1);
  };

  // 大陸に応じたマップコンポーネントを返す
  const renderMap = () => {
    switch (continent) {
      case 'Eurasia':
        return <EurasiaMap key={resetKey} />;
      case 'NorthAmerica':
        return <NorthAmericaMap key={resetKey} />;
      case 'SouthAmerica':
        return <SouthAmericaMap key={resetKey} />;
      case 'Australia':
        return <AustraliaMap key={resetKey} />;
      case 'SouthAfrica':
        return <SouthAfricaMap key={resetKey} />;
    }
  };

  return (
    <div>
      <Header onReset={handleReset} />  {/* Headerにリセット関数を渡す */}
      {renderMap()}  {/* 大陸に応じたマップを表示 */}
    </div>
  );
};

export default ResetMap;

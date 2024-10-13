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
  const [totalLabelSum, setTotalLabelSum] = useState<number>(0);  // totalLabelSumを管理

  const handleReset = () => {
    setResetKey(prevKey => prevKey + 1);
    setTotalLabelSum(0); // リセット時にtotalLabelSumもリセット
  };

  const renderMap = () => {
    switch (continent) {
      case 'Eurasia':
        return <EurasiaMap key={resetKey} setTotalLabelSum={setTotalLabelSum} />;
      case 'NorthAmerica':
        return <NorthAmericaMap key={resetKey} setTotalLabelSum={setTotalLabelSum} />;
      case 'SouthAmerica':
        return <SouthAmericaMap key={resetKey} setTotalLabelSum={setTotalLabelSum} />;
      case 'Australia':
        return <AustraliaMap key={resetKey} setTotalLabelSum={setTotalLabelSum} />;
      case 'SouthAfrica':
        return <SouthAfricaMap key={resetKey} setTotalLabelSum={setTotalLabelSum} />;
      default:
        return null;
    }
  };

  return (
    <div>
      <Header totalLabelSum={totalLabelSum} onReset={handleReset} />  {/* HeaderにtotalLabelSumとリセット関数を渡す */}
      {renderMap()}  {/* 大陸に応じたマップを表示 */}
    </div>
  );
};

export default ResetMap;

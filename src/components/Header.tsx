import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import America from '../img/Countries/America.png'; 
import Japan from '../img/Countries/Japan.png'; 
import Egypt from '../img/Countries/Egypt.png'; 
import Australia from '../img/Countries/Australia.png'; 
import China from '../img/Countries/China.png'; 
import Brazil from '../img/Countries/Brazil.png'; 
import India from '../img/Countries/India.png'; 
import Germany from '../img/Countries/Germany.png'; 

interface HeaderProps {
  totalLabelSum: number; // totalLabelSumを受け取る
  onReset?: () => void;  // リセット用の関数をプロパティとして受け取る
}

const Header: React.FC<HeaderProps> = ({ totalLabelSum, onReset }) => { 
  const location = useLocation(); // 現在のルートパスを取得
  const navigate = useNavigate(); // ルートを遷移させるためのフック

  // ルートごとに異なるタイトルを設定
  const getTitle = () => {
    switch (location.pathname) {
      case '/eurasia':
        return '～ユーラシア大陸編～';
      case '/northamerica':
        return '～北アメリカ大陸編～';
      case '/southamerica':
        return '～南アメリカ大陸編～';
      case '/africa':
        return '～アフリカ大陸編～';
      case '/australia':
        return '～オーストラリア大陸編～';
      default:
        return 'えんそ君と世界旅行に行こう！';
    }
  };

  // ホーム画面（"/"）以外の場合にボタンを表示
  const showButtons = location.pathname !== '/';
  const isDefaultRoute = location.pathname === '/';

  return (
    <div className="flex justify-between items-center shadow-md h-20 px-4">
      {showButtons && ( // ホーム画面以外の場合にボタンを表示
        <div className="flex items-center">
          <button
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
            onClick={() => navigate('/')} // クリック時にルートを"/"に遷移
          >
            ホーム
          </button>
        </div>
      )}
      <div className="flex flex-grow justify-center items-center relative">
        <p className="text-4xl font-bold absolute">
          {getTitle()}
        </p>
        {isDefaultRoute && ( // デフォルトルートの時に国旗を表示
          <div className="flex justify-between items-center w-full">
            {/* 左側の4つの国旗 */}
            <div className="flex space-x-6">
              <img src={America} alt="America" className="h-10 w-15" />
              <img src={Japan} alt="Japan" className="h-10 w-15 border border-black"/>
              <img src={Egypt} alt="Egypt" className="h-10 w-15" />
              <img src={India} alt="India" className="h-10 w-15" />
            </div>
            {/* 右側の4つの国旗 */}
            <div className="flex space-x-6">
              <img src={Australia} alt="Australia" className="h-10 w-15" />
              <img src={China} alt="China" className="h-10 w-15" />
              <img src={Brazil} alt="Brazil" className="h-10 w-15" />
              <img src={Germany} alt="Germany" className="h-10 w-15" />
            </div>
          </div>
        )}
        {!isDefaultRoute && ( // デフォルトルート以外では総時間を右側に表示
          <p className="py-2 px-4 bg-yellow-300 ml-4 text-2xl rounded absolute right-20">
            総時間: 
            <span className="font-bold px-1 text-4xl">
              {totalLabelSum}
            </span>
            時間
          </p>
        )}
      </div>
      {showButtons && ( // ホーム画面以外の場合にボタンを表示
        <div className="flex items-center">
          <button className="bg-red-500 text-white font-bold py-2 px-4 rounded" onClick={onReset}>
            やりなおし
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;

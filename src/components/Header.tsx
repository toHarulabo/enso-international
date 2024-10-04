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
  onReset?: () => void;  // リセット用の関数をプロパティとして受け取る
}

const Header: React.FC<HeaderProps> = ({ onReset }) => { 
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
      case '/southafrica':
        return '～南アフリカ大陸編～';
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
      <div className={`py-4 ${isDefaultRoute ? 'flex justify-center items-center w-full' : ''}`}>
        {isDefaultRoute && ( // デフォルトルートの時に画像を表示
          <div className="flex justify-between items-center w-full">
            {/* 左側の4つの国旗 */}
            <div className="flex space-x-6">
              <img src={America} alt="America" className="h-10 w-15" />
              <img src={Japan} alt="Japan" className="h-10 w-15 border border-black"/>
              <img src={Egypt} alt="Egypt" className="h-10 w-15" />
              <img src={India} alt="India" className="h-10 w-15" />
            </div>
            {/* 中央のテキスト */}
            <div className="text-4xl h-full flex items-center mx-4">
              <p className="font-bold">{getTitle()}</p>
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
        {!isDefaultRoute && ( // デフォルトルート以外ではタイトルだけを表示
          <div className="text-4xl h-full flex items-center mx-auto">
            <p className="font-bold">{getTitle()}</p>
          </div>
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

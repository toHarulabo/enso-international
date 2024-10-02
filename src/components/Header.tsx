import React from 'react';  

const Header: React.FC = () => {
  return (
    <>
      <div className="flex justify-center shadow-md h-20"> {/* 高さを80pxに固定 */}
        <div className="py-4">
          <div className="text-4xl h-full flex items-center"> {/* 高さを親要素に合わせ、中央揃え */}
            <p className="font-bold">えんそ君と世界旅行に行こう！</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;

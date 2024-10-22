# 使い方
1. Reactのインストール

2. npm startでブラウザの立ち上げ [http://localhost:3000]


# コードの説明
最初の画面は '/src/App.tsx' で表示される。  
ヘッダーは '/src/components/Header.tsx' , 最初のマップ画面は '/src/components/TopMap.tsx' に記述している。  


各大陸に関するコードは '/src/components/' 内の各大陸名のフォルダ内にいれてる。  
* "大陸名"Map.tsx : Mapを表示。  
* AirportLicate.md : 使用している空港コード・緯度・経度 を記載  
* airportName.ts : 空港コードに対応する空港名が記載。  
* getImageForRoute.ts : 経路によって表示するえんそ君の画像を変更させるために使用。(電車、飛行機、船に乗っているえんそ君を表示)  


# Vercel
Vercelを使ってアプリのリンクを作成している。(https://ensokun.vercel.app/)


## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

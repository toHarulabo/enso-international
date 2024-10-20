# 使い方
1. Reactのインストール

2. npm startでブラウザの立ち上げ [http://localhost:3000]


# コードの説明
最初の画面は '/src/App.tsx' で表示される。
ヘッダーは '/src/components/Header.tsx' , 最初のマップ画面は '/src/components/TopMap.tsx' に記述している。


各大陸に関するコードは '/src/components/' 内の各大陸名のフォルダ内にいれてる。
  AirportLicate.md : 使用している空港コード・緯度・経度 を記している。APIを使いたくない・使えない場合に使用できるかもしれない。
  airportName.ts : 空港コードを空港名に変換して表示する為に使用。
  getImageForRoute.ts : 経路によって表示するえんそ君の画像を変更させるために使用。(電車、飛行機、船に乗っているえんそ君を表示)


空港情報はAPIを取得している。(https://aviationstack.com/)
無料だと使用上限があるため、課金の必要があるかもしれない。(月7,000円ほど。。。)
各大陸名のフォルダ内にある AirportLocate.md に現在使用している空港のコード、緯度、経度を記している。それを使うと、API使わなくてもいけるかもしれない。


# Vercel
Vercelを使ってアプリのリンクを作成している。(https://ensokun.vercel.app/)


## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

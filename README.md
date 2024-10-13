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


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

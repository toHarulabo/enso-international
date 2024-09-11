// getImageForRoute.ts
//経路によってensoの画像を変更させる

import enso from '../img/enso ver3.png';
import enso_with_airplane from '../img/enso_with_airplane ver3.png';
import enso_with_ship from '../img/enso_with_ship ver3.png';
import enso_with_train from '../img/enso_with_train ver3.png';

/**
 * 経路に基づいて表示する画像を決定する関数
 * @param lastSelectedAirport 出発空港
 * @param iataCode 到着空港
 * @returns 適切な画像のパス
 */
export const getImageForRoute = (lastSelectedAirport: string, iataCode: string): string => {
  if (lastSelectedAirport === 'HND' && iataCode === 'ABA') {
    return enso_with_airplane; // HNDからABAへ移動時
  } else if (lastSelectedAirport === 'ADH' && iataCode === 'ABA') {
    return enso_with_train; // ADHからABAへ移動時
  } else if (lastSelectedAirport === 'AAT' && iataCode === 'ACS') {
    return enso_with_ship; // AATからACSへ移動時
  } else {
    return enso; // その他の場合、デフォルトのenso
  }
};

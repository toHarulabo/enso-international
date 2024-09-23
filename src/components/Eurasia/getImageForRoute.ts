// getImageForRoute.ts
//経路によってensoの画像を変更させる

import enso from '../../img/enso ver3.png';
import enso_with_airplane from '../../img/enso_with_airplane ver3.png';
import enso_with_ship from '../../img/enso_with_ship ver3.png';
import enso_with_train from '../../img/enso_with_train ver3.png';

/**
 * 経路に基づいて表示する画像を決定する関数
 * @param lastSelectedAirport 出発空港
 * @param iataCode 到着空港
 * @returns 適切な画像のパス
 */
export const getImageForRoute = (lastSelectedAirport: string, iataCode: string): string => {
  if (lastSelectedAirport === 'HND' && iataCode === 'ADH') {
    return enso_with_airplane; // HNDからADHへ移動時
  } else if (lastSelectedAirport === 'HND' && iataCode === 'ABA') {
    return enso_with_airplane; // HNDからABAへ移動時
  } else if (lastSelectedAirport === 'HND' && iataCode === 'AAT') {
    return enso_with_airplane; // HNDからAATへ移動時
  } else if (lastSelectedAirport === 'HND' && iataCode === 'ACZ') {
    return enso_with_airplane; // HNDからACZへ移動時
  } else if (lastSelectedAirport === 'ADH' && iataCode === 'ABA') {
    return enso_with_train; // ADHからABAへ移動時
  } else if (lastSelectedAirport === 'ADH' && iataCode === 'ACS') {
    return enso_with_train; // ADHからACSへ移動時
  } else if (lastSelectedAirport === 'ABA' && iataCode === 'AAT') {
    return enso_with_train; // ABAからAATへ移動時
  } else if (lastSelectedAirport === 'ABA' && iataCode === 'AFS') {
    return enso_with_train; // ABAからAFSへ移動時
  } else if (lastSelectedAirport === 'ABA' && iataCode === 'ACH') {
    return enso_with_train; // ABAからACHへ移動時
  } else if (lastSelectedAirport === 'ACS' && iataCode === 'ACH') {
    return enso_with_train; // ACSからACHへ移動時
  } else if (lastSelectedAirport === 'AAT' && iataCode === 'AFS') {
    return enso_with_train; // AATからAFSへ移動時
  } else if (lastSelectedAirport === 'AAT' && iataCode === 'ACZ') {
    return enso_with_airplane; // AATからACZへ移動時
  } else if (lastSelectedAirport === 'AFS' && iataCode === 'ACZ') {
    return enso_with_train; // AFSからACZへ移動時
  } else if (lastSelectedAirport === 'AFS' && iataCode === 'ACH') {
    return enso_with_airplane; // AFSからACHへ移動時
  } else if (lastSelectedAirport === 'ACZ' && iataCode === 'ADB') {
    return enso_with_train; // ACZからADBへ移動時
  } else if (lastSelectedAirport === 'ACZ' && iataCode === 'AAC') {
    return enso_with_train; // ACZからAACへ移動時
  } else if (lastSelectedAirport === 'AAC' && iataCode === 'ADB') {
    return enso_with_ship; // AACからADBへ移動時
  } else if (lastSelectedAirport === 'ADB' && iataCode === 'ACH') {
    return enso_with_airplane; // ADBからACHへ移動時
  } else {
    return enso; // その他の場合、デフォルトのenso
  }
};

// getImageForRoute.ts
//経路によってensoの画像を変更させる

import enso from '../../img/enso ver3.png';
import enso_with_airplane from '../../img/enso/enso_with_airplane_reverse ver3.png';
import enso_with_ship from '../../img/enso/enso_with_ship_reverse ver3.png';
import enso_with_train from '../../img/enso/enso_with_train_reverse ver3.png';

/**
 * 経路に基づいて表示する画像を決定する関数
 * @param lastSelectedAirport 出発空港
 * @param iataCode 到着空港
 * @returns 適切な画像のパス
 */
export const getImageForRoute = (lastSelectedAirport: string, iataCode: string): string => {
  if (lastSelectedAirport === 'HND' && iataCode === 'ADK') {
    return enso_with_ship; // HNDからADKへ移動時
  } else if (lastSelectedAirport === 'HND' && iataCode === 'ACV') {
    return enso_with_ship; // HNDからACVへ移動時
  } else if (lastSelectedAirport === 'HND' && iataCode === 'AEA') {
    return enso_with_ship; // HNDからAEAへ移動時
  } else if (lastSelectedAirport === 'ADK' && iataCode === 'ADQ') {
    return enso_with_ship; // ADKからADQへ移動時
  } else if (lastSelectedAirport === 'AEA' && iataCode === 'ABQ') {
    return enso_with_airplane; // AEAからABQへ移動時
  } else if (lastSelectedAirport === 'AEA' && iataCode === 'ACA') {
    return enso_with_ship; // AEAからACAへ移動時
  } else if (lastSelectedAirport === 'ADQ' && iataCode === 'ACV') {
    return enso_with_ship; // ADQからACVへ移動時
  } else if (lastSelectedAirport === 'ADQ' && iataCode === 'AFO') {
    return enso_with_airplane; // ADQからAFOへ移動時
  } else if (lastSelectedAirport === 'ADQ' && iataCode === 'AEL') {
    return enso_with_airplane; // ADQからAELへ移動時
  } else if (lastSelectedAirport === 'ADQ' && iataCode === 'AFN') {
    return enso_with_airplane; // ADQからAFNへ移動時
  } else if (lastSelectedAirport === 'ACV' && iataCode === 'AFO') {
    return enso_with_train; // ACVからAFOへ移動時
  } else if (lastSelectedAirport === 'ACV' && iataCode === 'ABQ') {
    return enso_with_train; // ACVからABQへ移動時
  } else if (lastSelectedAirport === 'ABQ' && iataCode === 'AFO') {
    return enso_with_train; // ABQからAFOへ移動時
  } else if (lastSelectedAirport === 'ABQ' && iataCode === 'AEL') {
    return enso_with_train; // ABQからAELへ移動時
  } else if (lastSelectedAirport === 'ABQ' && iataCode === 'ADR') {
    return enso_with_airplane; // ABQからADRへ移動時
  } else if (lastSelectedAirport === 'ABQ' && iataCode === 'ACA') {
    return enso_with_train; // ABQからACAへ移動時
  } else if (lastSelectedAirport === 'ACA' && iataCode === 'ADR') {
    return enso_with_airplane; // ACAからADRへ移動時
  } else if (lastSelectedAirport === 'AFO' && iataCode === 'AEL') {
    return enso_with_train; // AFOからAELへ移動時
  } else if (lastSelectedAirport === 'AEL' && iataCode === 'AFN') {
    return enso_with_train; // AELからAFNへ移動時
  } else if (lastSelectedAirport === 'AEL' && iataCode === 'ADR') {
    return enso_with_train; // AELからADRへ移動時
  } else if (lastSelectedAirport === 'ADR' && iataCode === 'AFN') {
    return enso_with_airplane; // ADRからAFNへ移動時
  } else {
    return enso; // その他の場合、デフォルトのenso
  }
};

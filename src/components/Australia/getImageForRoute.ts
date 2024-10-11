import enso from '../../img/enso/enso ver3.png';
import enso_with_airplane from '../../img/enso/enso_with_airplane ver3.png';
import enso_with_ship from '../../img/enso/enso_with_ship ver3.png';

/**
 * 経路に基づいて表示する画像を決定する関数
 * @param lastSelectedAirport 出発空港
 * @param iataCode 到着空港
 * @returns 適切な画像のパス
 */
export const getImageForRoute = (lastSelectedAirport: string, iataCode: string): string => {
  // 飛行機経路の場合
  if (
    (lastSelectedAirport === 'HND' && iataCode === 'ABX') || 
    (lastSelectedAirport === 'HND' && iataCode === 'ACN') ||
    (lastSelectedAirport === 'ACN' && iataCode === 'AEP') 
  ) {
    return enso_with_airplane; // 飛行機経路の場合
  }

  // 船の経路の場合
  else if (
    (lastSelectedAirport === 'HND' && iataCode === 'AAA') || 
    (lastSelectedAirport === 'HND' && iataCode === 'ACN') ||
    (lastSelectedAirport === 'ABX' && iataCode === 'AAA') ||
    (lastSelectedAirport === 'ABX' && iataCode === 'AEP') ||
    (lastSelectedAirport === 'AAA' && iataCode === 'ABX') ||
    (lastSelectedAirport === 'AAA' && iataCode === 'ACN') ||
    (lastSelectedAirport === 'AAA' && iataCode === 'AEP') ||
    (lastSelectedAirport === 'ACN' && iataCode === 'AAA')
  ) {
    return enso_with_ship; // 船の経路の場合
  }

  // その他の場合、デフォルトのenso
  else {
    return enso;
  }
};

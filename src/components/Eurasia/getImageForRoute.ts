import enso from '../../img/enso/enso ver3.png';
import enso_with_airplane from '../../img/enso/enso_with_airplane ver3.png';
import enso_with_ship from '../../img/enso/enso_with_ship ver3.png';
import enso_with_train from '../../img/enso/enso_with_train ver3.png'; // 電車の画像を追加

/**
 * 経路に基づいて表示する画像を決定する関数
 * @param lastSelectedAirport 出発空港
 * @param iataCode 到着空港
 * @returns 適切な画像のパス
 */
export const getImageForRoute = (lastSelectedAirport: string, iataCode: string): string => {
  // 飛行機経路の場合
  const airplaneRoutes = [
    ['HND', 'ADH'], ['HND', 'ABA'], ['HND', 'AAT'], ['HND', 'ACZ'], 
    ['AAT', 'ACZ'], ['AFS', 'ACH'], ['ADB', 'ACH']
  ];

  // 電車の経路の場合
  const trainRoutes = [
    ['ADH', 'ABA'], ['ADH', 'ACS'], 
    ['ABA', 'ADH'], ['ABA', 'AAT'], ['ABA', 'AFS'], ['ABA', 'ACH'],
    ['ACS', 'ACH'], 
    ['AAT', 'ABA'], ['AAT', 'AFS'], 
    ['AFS', 'ABA'], ['AFS', 'AAT'], ['AFS', 'ACZ'], 
    ['ACZ', 'AFS'], ['ACZ', 'ADB'], ['ACZ', 'AAC'], 
    ['ADB', 'ACZ'], 
    ['AAC', 'ACZ'], ['AAC', 'ADB']
  ];

  // 船の経路の場合
  const shipRoutes = [
    ['AAC', 'ADB'], ['ADB', 'AAC']
  ];

  // 飛行機経路の場合
  if (airplaneRoutes.some(route => (route[0] === lastSelectedAirport && route[1] === iataCode) || (route[0] === iataCode && route[1] === lastSelectedAirport))) {
    return enso_with_airplane;
  }

  // 電車の経路の場合
  if (trainRoutes.some(route => (route[0] === lastSelectedAirport && route[1] === iataCode) || (route[0] === iataCode && route[1] === lastSelectedAirport))) {
    return enso_with_train;
  }

  // 船の経路の場合
  if (shipRoutes.some(route => (route[0] === lastSelectedAirport && route[1] === iataCode) || (route[0] === iataCode && route[1] === lastSelectedAirport))) {
    return enso_with_ship;
  }

  // その他の場合、デフォルトのenso
  return enso;
};

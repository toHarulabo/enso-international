import enso from '../../img/enso/enso ver3.png';
import enso_with_airplane from '../../img/enso/enso_with_airplane ver3.png';
import enso_with_ship from '../../img/enso/enso_with_ship ver3.png';
import enso_with_train from '../../img/enso/enso_with_train ver3.png'; // 電車の画像も追加

/**
 * 経路に基づいて表示する画像を決定する関数
 * @param lastSelectedAirport 出発空港
 * @param iataCode 到着空港
 * @returns 適切な画像のパス
 */
export const getImageForRoute = (lastSelectedAirport: string, iataCode: string): string => {
  const airplaneRoutes = [
    ['HND', 'ABM'], ['HND', 'ABU'], ['HND', 'AEG'], ['HND', 'ACJ'], ['HND', 'ACZ'], 
    ['ACZ', 'ABK'], ['ACZ', 'AAE'], ['ABU', 'AEG'], ['ABK', 'ACJ'], ['ACJ', 'ABK'], 
    ['AAE', 'ACZ']
  ];

  const shipRoutes = [
    ['ABM', 'ABU'], ['ABM', 'AFD'], ['ABU', 'ABM'], ['ABU', 'AFD'], ['AEG', 'ACJ'], 
    ['AEG', 'AFD'], ['ACJ', 'AEG'], ['ACJ', 'AFD']
  ];

  const trainRoutes = [
    ['ABK', 'AAE'], ['ABK', 'AFD'], ['AAE', 'ABK'], ['AAE', 'AFD']
  ];

  // 飛行機経路の場合
  if (airplaneRoutes.some(route => (route[0] === lastSelectedAirport && route[1] === iataCode) || (route[0] === iataCode && route[1] === lastSelectedAirport))) {
    return enso_with_airplane;
  }

  // 船の経路の場合
  if (shipRoutes.some(route => (route[0] === lastSelectedAirport && route[1] === iataCode) || (route[0] === iataCode && route[1] === lastSelectedAirport))) {
    return enso_with_ship;
  }

  // 電車の経路の場合
  if (trainRoutes.some(route => (route[0] === lastSelectedAirport && route[1] === iataCode) || (route[0] === iataCode && route[1] === lastSelectedAirport))) {
    return enso_with_train;
  }

  // その他の場合、デフォルトのenso
  return enso;
};

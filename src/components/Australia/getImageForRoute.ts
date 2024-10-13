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
  const airplaneRoutes = [
    ['HND', 'ACZ'], ['HND', 'AEA'], 
    ['ACZ', 'ACJ'], ['ACZ', 'ABU'], 
    ['ABU', 'ACZ'], ['ABU', 'AEA'], 
    ['ABU', 'ADO'], ['ACJ', 'ADO'], 
    ['AEA', 'ABU']
  ];

  // 船の経路の場合
  const shipRoutes = [
    ['HND', 'ABU'], 
    ['AEA', 'ADO']
  ];

  // 飛行機経路の場合
  if (airplaneRoutes.some(route => (route[0] === lastSelectedAirport && route[1] === iataCode) || (route[0] === iataCode && route[1] === lastSelectedAirport))) {
    return enso_with_airplane;
  }

  // 船の経路の場合
  if (shipRoutes.some(route => (route[0] === lastSelectedAirport && route[1] === iataCode) || (route[0] === iataCode && route[1] === lastSelectedAirport))) {
    return enso_with_ship;
  }

  // その他の場合、デフォルトのenso
  return enso;
};

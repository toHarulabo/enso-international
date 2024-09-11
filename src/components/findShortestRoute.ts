// findShortestRoute.ts
//ダイキストラ法によって最短経路を計算する

interface Connection {
  from: string;
  to: string;
  label: string;
}

interface AirportMap {
  [key: string]: { [key: string]: number };
}

/**
 * 与えられた接続リストから最小ラベル合計のルートを探索する関数
 * @param connections 接続のリスト
 * @param start 始点となる空港（例: 'HND'）
 * @param goal ゴールとなる空港（例: 'ACH'）
 * @returns 最短ルートとそのラベルの合計
 */
export const findShortestRoute = (connections: Connection[], start: string, goal: string) => {
  // 空港間の接続をマップとして作成
  const airportMap: AirportMap = {};

  connections.forEach(({ from, to, label }) => {
    const cost = Number(label);
    if (!airportMap[from]) airportMap[from] = {};
    if (!airportMap[to]) airportMap[to] = {};

    // 双方向の接続
    airportMap[from][to] = cost;
    airportMap[to][from] = cost;
  });

  // ダイクストラ法を使用して最短経路を探索
  const distances: { [key: string]: number } = {};
  const previous: { [key: string]: string | null } = {};
  const unvisited: Set<string> = new Set();

  // 初期化
  for (const airport in airportMap) {
    distances[airport] = Infinity;
    previous[airport] = null;
    unvisited.add(airport);
  }
  distances[start] = 0;

  while (unvisited.size > 0) {
    // 未訪問の空港の中で、最小の距離を持つ空港を探す
    let currentAirport = Array.from(unvisited).reduce((min, airport) => 
      distances[airport] < distances[min] ? airport : min, Array.from(unvisited)[0]);

    // ゴールに到達した場合、ルートを構築して終了
    if (currentAirport === goal) {
      const path: string[] = [];
      let temp: string | null = currentAirport;

      // previous[temp] が null になるまで遡ってルートを構築
      while (temp !== null) {
        path.unshift(temp);
        temp = previous[temp];
      }
      return { path, totalLabelSum: distances[goal] };
    }

    // 現在の空港を訪問済みとしてマーク
    unvisited.delete(currentAirport);

    // 隣接する空港の距離を更新
    for (const neighbor in airportMap[currentAirport]) {
      const alt = distances[currentAirport] + airportMap[currentAirport][neighbor];
      if (alt < distances[neighbor]) {
        distances[neighbor] = alt;
        previous[neighbor] = currentAirport;
      }
    }
  }

  // ゴールに到達できなかった場合
  return { path: [], totalLabelSum: Infinity };
};

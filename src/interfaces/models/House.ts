export declare interface IHouse {
  title: string; // 物件名稱
  pId: number; // 物件Post id
  kindName: string; // 物件類型
  room: string; // 物件格局
  floor: string; // 物件樓層
  price: string; // 物件價錢
  section: string; // 物件地區
  area: string; // 物件坪數
}

export declare interface ConditionTypes {
  region: string;
  section: string;
  kind: string;
  rentprice: string;
  multiRoom: string;
  other: string;
  shape: string;
  area: string;
  multiFloor: string;
  option: string;
  multiNotice: string;
}

export declare interface IHouse {
  title: string; // 物件名稱
  houseId: number; // 物件Post id
  kindName: string; // 物件類型
  room: string; // 物件格局
  floor: string; // 物件樓層
  unitPrice: string; // 物件每坪價格
  totalPrice: string; // 物件總價
  address: string; // 物件地址
  area: string; // 物件坪數
  regionName: string;
  sectionName: string;
  age: string;
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

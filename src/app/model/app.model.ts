export interface Posts {
  filter(arg0: (d: any) => boolean);
  pid: number;
  name: string;
  uId: number;
  title: string;
  body: string;
}
export interface User {
  id: number;
  name: string;
  email: string;
  address: string;
}

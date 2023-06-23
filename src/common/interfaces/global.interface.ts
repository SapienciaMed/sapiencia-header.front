import { EResponseCodes } from "../constants/api.enum";

export interface IMessage {
  type?: EResponseCodes;
  title?: string;
  description?: string;
  cancelTitle?: string;
  OkTitle?:string;
  show?: boolean;
  onOk?: () => void;
  onCancel?: () => void;
}

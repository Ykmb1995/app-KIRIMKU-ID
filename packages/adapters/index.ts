import { JneAdapter } from './jne/jne.adapter';
import { JntAdapter } from './jnt/jnt.adapter';
import { SicepatAdapter } from './sicepat/sicepat.adapter';
import { AnterajaAdapter } from './anteraja/anteraja.adapter';
import { NinjaAdapter } from './ninja/ninja.adapter';
import { SapAdapter } from './sap/sap.adapter';

export type AdaptersMap = Record<string, any>;

export const adapters: AdaptersMap = {
  jne: new JneAdapter(),
  jnt: new JntAdapter(),
  sicepat: new SicepatAdapter(),
  anteraja: new AnterajaAdapter(),
  ninja: new NinjaAdapter(),
  sap: new SapAdapter(),
};

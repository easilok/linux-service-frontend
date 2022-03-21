export type SystemdUnitList = {
  unit: string;
  state: string;
  active: string;
  sub: string;
  description: string;
}

export type SystemdUnitResponse = {
  message: string;
  units: SystemdUnitList[];
}


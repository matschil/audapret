export const studyDataManagerPort = 3333;
export const studyDataManagerAdapterDataPath = `/api/adapterData`;

//export const baseUrl = `${process.env.STUDY_DATA_MANAGER_ADDRESS}:`;
//export const studyDataManagerAddress = baseUrl + studyDataManagerPort;
export enum DetailLevel {
  FULL = 'full',
  DAILY_AGGREGATE = 'daily_aggregate'
}

export enum GrantedAction {
  CREATE = 'create',
  READ = 'read',
  UPDATE = 'update',
  DELETE = 'delete'
}

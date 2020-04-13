module.exports = {
  name: 'study-data-manager-client',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/study-data-manager-client',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};

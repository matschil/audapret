module.exports = {
  name: 'study-administrator-client',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/study-administrator-client',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};

import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
  attrs: { players: { embedded: 'always' } }
});

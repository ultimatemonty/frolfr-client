import { ActiveModelSerializer } from 'active-model-adapter';
import EmbeddedRecordsMixin from 'ember-data/serializers/embedded-records-mixin';

export default ActiveModelSerializer.extend(EmbeddedRecordsMixin, {});

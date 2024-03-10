<template>
  <n-modal v-model:show="showModal">
    <n-card
      style="width: 600px"
      role="dialog"
      aria-modal="true"
      :title="modalTitle"
      :bordered="false"
      class="add-connect-modal-card"
      @mask-click="closeModal"
    >
      <template #header-extra>
        <n-icon size="26" @click="closeModal">
          <v-icon name="io-close-outline" />
        </n-icon>
      </template>
      <div class="modal-content">
        <n-form
          ref="connectFormRef"
          label-placement="left"
          label-width="100"
          :model="formData"
          :rules="formRules"
        >
          <n-grid cols="8" item-responsive responsive="screen" x-gap="10" y-gap="10">
            <n-grid-item span="8">
              <n-form-item :label="$t('ssh.name')" path="name">
                <n-input v-model:value="formData.name" clearable :placeholder="$t('ssh.name')" />
              </n-form-item>
            </n-grid-item>
            <n-grid-item span="5">
              <n-form-item :label="$t('ssh.host')" path="host">
                <n-input v-model:value="formData.host" clearable :placeholder="$t('ssh.host')" />
              </n-form-item>
            </n-grid-item>
            <n-grid-item span="3">
              <n-form-item :label="$t('ssh.port')" path="port">
                <n-input-number
                  v-model:value="formData.port"
                  clearable
                  :show-button="false"
                  :placeholder="$t('ssh.port')"
                />
              </n-form-item>
            </n-grid-item>
            <n-grid-item span="8">
              <n-form-item :label="$t('ssh.secret')" path="secret">
                <n-select v-model:value="formData.secretId" :options="options" />
              </n-form-item>
            </n-grid-item>
          </n-grid>
        </n-form>
      </div>
      <template #footer>
        <div class="card-footer">
          <div class="left">
            <n-button
              type="info"
              :loading="testLoading"
              :disabled="!validationPassed"
              @click="testConnect"
            >
              {{ $t('ssh.test') }}
            </n-button>
          </div>
          <div class="right">
            <n-button @click="closeModal">{{ $t('dialogOps.cancel') }}</n-button>
            <n-button
              type="primary"
              :loading="saveLoading"
              :disabled="!validationPassed"
              @click="saveConnect"
            >
              {{ $t('dialogOps.confirm') }}
            </n-button>
          </div>
        </div>
      </template>
    </n-card>
  </n-modal>
</template>

<script setup lang="ts">
import { CustomError } from '../../../common';
import { Connection, useConnectionStore, useSecretStore } from '../../../store';
import { useLang } from '../../../lang';
import { FormValidationError } from 'naive-ui';
import { storeToRefs } from 'pinia';

const { testConnection, saveConnection, fetchConnections } = useConnectionStore();
const lang = useLang();
// DOM
const connectFormRef = ref();

const { secrets } = storeToRefs(useSecretStore());

const options = computed(() => secrets.value.map(({ name, id }) => ({ label: name, value: id })));

const showModal = ref(false);
const modalTitle = ref(lang.t('ssh.add'));
const testLoading = ref(false);
const saveLoading = ref(false);

const defaultFormData = {
  name: '',
  host: '',
  port: 22,
  username: '',
  secretId: -1,
};
const formData = ref<Connection>({ ...defaultFormData });

const formRules = reactive({
  name: [
    {
      required: true,
      renderMessage: () => lang.t('ssh.formValidation.nameRequired'),
      trigger: ['input', 'blur'],
    },
  ],
  host: [
    {
      required: true,
      renderMessage: () => lang.t('ssh.formValidation.hostRequired'),
      trigger: ['input', 'blur'],
    },
  ],
  port: [
    {
      required: true,
      renderMessage: () => lang.t('ssh.formValidation.portRequired'),
      trigger: ['input', 'blur'],
    },
  ],
  secretId: [
    {
      required: true,
      renderMessage: () => lang.t('ssh.formValidation.secretRequired'),
      trigger: ['input', 'blur'],
    },
  ],
});
const message = useMessage();

const cleanUp = () => {
  formData.value = defaultFormData;
  modalTitle.value = lang.t('ssh.add');
};
const showMedal = (con: Connection | null) => {
  cleanUp();
  showModal.value = true;
  if (con) {
    formData.value = con;
    modalTitle.value = lang.t('ssh.edit');
  }
};

const closeModal = () => {
  showModal.value = false;
  cleanUp();
};

const validationPassed = watch(formData.value, async () => {
  try {
    return await connectFormRef.value?.validate((errors: Array<FormValidationError>) => !errors);
  } catch (e) {
    return false;
  }
});

const testConnect = async (event: MouseEvent) => {
  event.preventDefault();
  testLoading.value = !testLoading.value;
  try {
    await testConnection({ ...formData.value });
    message.success(lang.t('ssh.testSuccess'));
  } catch (e) {
    const error = e as CustomError;
    message.error(`status: ${error.status}, details: ${error.details}`, {
      closable: true,
      keepAliveOnHover: true,
      duration: 10000,
    });
  } finally {
    testLoading.value = !testLoading.value;
  }
};

const saveConnect = async (event: MouseEvent) => {
  event.preventDefault();
  saveLoading.value = !saveLoading.value;
  saveConnection(formData.value);
  saveLoading.value = !saveLoading.value;
  showModal.value = false;
};

defineExpose({ showMedal });

fetchConnections();
</script>
<style lang="scss">
.add-connect-modal-card {
  .n-card-header {
    .n-card-header__extra {
      cursor: pointer;
    }
  }
  .n-card__footer {
    .card-footer {
      display: flex;
      justify-content: space-between;
      .n-button + .n-button {
        margin-left: 10px;
      }
    }
  }
}
</style>

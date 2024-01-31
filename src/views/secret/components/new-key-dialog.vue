<template>
  <n-modal v-model:show="showModal">
    <n-card
      style="width: 600px"
      role="dialog"
      aria-modal="true"
      :title="modalTitle"
      :bordered="false"
      class="secret-modal-card"
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
              <n-form-item :label="$t('secret.name')" path="name">
                <n-input v-model:value="formData.name" clearable :placeholder="$t('secret.name')" />
              </n-form-item>
            </n-grid-item>
          </n-grid>
        </n-form>
      </div>
      <n-tabs type="line" animated>
        <n-tab-pane name="sshKeys" tab="SSH Keys">
          <n-grid cols="8" item-responsive responsive="screen" x-gap="10" y-gap="10">
            <n-grid-item span="8">
              <n-form-item :label="$t('secret.priKey')" path="priKey">
                <n-input
                  v-model:value="formData.priKey"
                  clearable
                  type="textarea"
                  :placeholder="$t('secret.priKey')"
                />
              </n-form-item>
            </n-grid-item>
          </n-grid>
          <n-grid cols="8" item-responsive responsive="screen" x-gap="10" y-gap="10">
            <n-grid-item span="8">
              <n-form-item :label="$t('secret.pubKey')" path="pubKey">
                <n-input
                  v-model:value="formData.pubKey"
                  clearable
                  type="textarea"
                  :show-button="false"
                  :placeholder="$t('secret.pubKey')"
                />
              </n-form-item>
            </n-grid-item>
          </n-grid>
        </n-tab-pane>
        <n-tab-pane name="usernamePassword" tab="Username/Password">
          <n-grid cols="8" item-responsive responsive="screen" x-gap="10" y-gap="10">
            <n-grid-item span="8">
              <n-form-item :label="$t('secret.name')" path="username">
                <n-input
                  v-model:value="formData.username"
                  clearable
                  :placeholder="$t('secret.username')"
                />
              </n-form-item>
            </n-grid-item>
          </n-grid>
          <n-grid cols="8" item-responsive responsive="screen" x-gap="10" y-gap="10">
            <n-grid-item span="8">
              <n-form-item :label="$t('secret.password')" path="password">
                <n-input
                  v-model:value="formData.password"
                  type="password"
                  show-password-on="click"
                  clearable
                  :placeholder="$t('secret.password')"
                />
              </n-form-item>
            </n-grid-item>
          </n-grid>
        </n-tab-pane>
      </n-tabs>
      <template #footer>
        <div class="card-footer">
          <div class="left">
            <n-button
              type="info"
              :loading="testLoading"
              :disabled="!validationPassed"
              @click="verify"
            >
              {{ $t('secret.verify') }}
            </n-button>
          </div>
          <div class="right">
            <n-button @click="closeModal">{{ $t('dialogOps.cancel') }}</n-button>
            <n-button
              type="primary"
              :loading="saveLoading"
              :disabled="!validationPassed"
              @click="saveSecret"
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
import { Secret } from '../../../store';
import { useLang } from '../../../lang';
import { FormValidationError } from 'naive-ui';

const lang = useLang();
// DOM
const connectFormRef = ref();

const showModal = ref(false);
const modalTitle = ref(lang.t('secret.new'));
const testLoading = ref(false);
const saveLoading = ref(false);
type SecretInput = Omit<Secret, 'id' | 'type'>;
const defaultFormData = {
  name: '',
  priKey: '',
  pubKey: '',
  username: '',
  password: '',
};
const formData = ref<SecretInput>(defaultFormData);
const formRules = reactive({
  name: [
    {
      required: true,
      renderMessage: () => lang.t('secret.formValidation.nameRequired'),
      trigger: ['input', 'blur'],
    },
  ],
});

const message = useMessage();

const showMedal = (secret: Secret | null) => {
  showModal.value = true;
  if (secret?.id) {
    formData.value = secret;
    modalTitle.value = lang.t('secret.edit');
  }
};

const closeModal = () => {
  if (formData.value) {
    formData.value = defaultFormData;
  }
  showModal.value = false;
};

const validationPassed = watch(formData.value, async () => {
  try {
    return await connectFormRef.value?.validate((errors: Array<FormValidationError>) => !errors);
  } catch (e) {
    return false;
  }
});

const verify = async (event: MouseEvent) => {
  event.preventDefault();
  testLoading.value = !testLoading.value;
  try {
    // @TODO: verify secret
    // await testConnection({ ...formData.value });
    message.success(lang.t('connection.testSuccess'));
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

const saveSecret = async (event: MouseEvent) => {
  event.preventDefault();
  saveLoading.value = !saveLoading.value;
  // @TODO: save secret
  // saveConnection(formData.value);
  saveLoading.value = !saveLoading.value;
  showModal.value = false;
};

defineExpose({ showMedal });
</script>
<style lang="scss">
.secret-modal-card {
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

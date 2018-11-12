<template>
  <el-form
    :ref="filtrateName"
    :model="initConfig.form"
    :label-width="labelWidth"
    :inline="true"
    size="small"
  >
    <el-form-item
      v-for="(formItem, formKey) in initConfig.form"
      v-if="initConfig.config[formKey]"
      :key="formKey"
      :label="initConfig.config[formKey].config.label"
      :prop="formKey"
      :rules="initConfig.config[formKey].config.rules"
    >
      <template v-if="initConfig.config[formKey].type == 'input'">
        <el-input
          :type="initConfig.config[formKey].config.type"
          v-model="initConfig.form[formKey]"
          :placeholder="initConfig.config[formKey].config.placeholder"
          :disabled="initConfig.config[formKey].config.isDisabled"
          @change="filtrateItemChange($event, formKey)"
        />
      </template>
      <template v-else-if="initConfig.config[formKey].type == 'select'">
        <el-select
          v-model="initConfig.form[formKey]"
          :placeholder="initConfig.config[formKey].config.placeholder"
          :disabled="initConfig.config[formKey].config.isDisabled"
          clearable
          @change="filtrateItemChange($event, formKey)"
        >
          <el-option
            v-for="item in initConfig.config[formKey].config.selectOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
          />
        </el-select>
      </template>
      <template v-else-if="initConfig.config[formKey].type == 'cascader'">
        <el-cascader
          :placeholder="initConfig.config[formKey].config.placeholder"
          :options="initConfig.config[formKey].config.cascaderOptions"
          :disabled="initConfig.config[formKey].config.isDisabled"
          v-model="initConfig.form[formKey]"
          filterable
          change-on-select
          @change="filtrateItemChange($event, formKey)"
        />
      </template>
      <template v-else-if="initConfig.config[formKey].type == 'datePicker'">
        <el-date-picker
          v-model="initConfig.form[formKey]"
          :type="initConfig.config[formKey].config.type"
          :disabled="initConfig.config[formKey].config.isDisabled"
          :format="initConfig.config[formKey].config.format || 'yyyy-MM-dd'"
          :value-format="initConfig.config[formKey].config.valueFormat || 'yyyy-MM-dd'"
          :placeholder="initConfig.config[formKey].config.placeholder || '选择日期'"
          :range-separator="initConfig.config[formKey].config.rangeSeparator || '至'"
          :start-placeholder="initConfig.config[formKey].config.startPlaceholder || '开始日期'"
          :end-placeholder="initConfig.config[formKey].config.endPlaceholder || '结束日期'"
          @change="filtrateItemChange($event, formKey)"
        />
      </template>
    </el-form-item>
    <el-form-item :label="' '">
      <el-button
        type="primary"
        icon="el-icon-search"
        @click="search"
      >搜索</el-button>
      <el-button
        v-if="isResetForm"
        @click="resetForm"
      >重置</el-button>
    </el-form-item>
  </el-form>
</template>

/*
 * filtrate components
 *
 * @params filtrateConfig {obj} 搜索配置
 * @params isResetForm {bol} 是否需要重置搜索选项
 * @params filtrateName {string} 搜索模块的名字(required)
 * @params labelWidth {string} label的宽度,默认100px

 * getSearchParams {function}  返回所有参数详情
 * filtrateItemChange {function} 返回变化项对应的值 return {[formKey]: value}

 * 暴露changeConfig方法 父组件通过refs中的此方法动态更改配置信息
 * @params formKey {string} 单个模块的key
 * @params config {object} 更改的配置项
*/
<script>
import { cloneDeep } from 'lodash/lang'
export default {
  name: 'Filtrate',
  props: {
    filtrateConfig: {
      type: Object,
      default() {
        return {
          form: {},
          config: {}
          // type: 'input',                          使用模板类型可选参数 input|dropdown|cascader|datePicker|select
          // config: {
          //   type: 'text',                         input的类型(input模板特有配置)
          //   label: '',                            label文字
          //   placeholder: '',                      没有选择或者没有填写时的默认文字
          //   rules: []                             表单验证规则
          //   cascaderOptions: []                   cascader列表(cascader模板特有配置)
          //   selectOptions: []                     select的option列表(select模板特有配置)
          // }
          // 具体的规则配置|cascader配置|select配置 参照element-ui
        }
      }
    },
    isResetForm: {
      type: Boolean,
      default: false
    },
    filtrateName: {
      type: String,
      required: true,
      default: 'form'
    },
    labelWidth: {
      type: String,
      default: '100px'
    }
  },
  data() {
    return {
      initConfig: cloneDeep(this.filtrateConfig)
    }
  },
  methods: {
    filtrateItemChange(val, key) {
      // console.log({ [key]: val })
      this.$emit('filtrateItemChange', { [key]: val })
    },
    search() {
      this.$refs[this.filtrateName].validate((valid) => {
        if (valid) {
          this.$emit('getSearchParams', this.initConfig.form)
        } else {
          return false
        }
      })
    },
    resetForm() {
      // 重置form
      this.$refs[this.filtrateName].resetFields()
    },
    changeConfig(formKey, config) {
      // console.log(this.initConfig, config)
      const mergeConfig = Object.assign(this.initConfig.config[formKey].config, config)
      this.$set(this.initConfig.config[formKey], 'config', mergeConfig)
    }
  }
}
</script>

<style lang="scss" scoped>
  .el-input,
  .el-cascader,
  .el-select {
    width: 150px;
  }
  .el-dropdown-menu {
    max-height: 200px;
    overflow: auto;
  }
  .form_btns {
    width: 150px;
    display: inline-block;
  }
</style>

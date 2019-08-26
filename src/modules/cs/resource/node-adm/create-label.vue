 <template>
        <create-sth-layout ref="containerHandle">
            <form-layout title="添加节点标签" @close="$router.go(-1);">
                <template v-slot:form>
                    <el-form  label-position="left" label-width="120px">
                        <el-form-item label="节点名称" prop="name">
                            <label>name</label>
                        </el-form-item>
                        <el-form-item label="标签" prop="name">
                            <el-select  filterable v-model="labelKey" placeholder="请选择可用区">
                                <el-option
                                        v-for="item in labelKeyOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                            <el-select  filterable v-model="labelValue" placeholder="请选择云服务商">
                                <el-option
                                        v-for="item in labelValueOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <el-input class="textarea"
                                      style="width: 500px;margin-top: 10px"
                                      type="textarea"
                                      :rows="6"
                                      placeholder="请输入内容"
                                      v-model="labelKey">
                            </el-input>
                        </el-form-item>
                    </el-form>
                </template>
            </form-layout>
        </create-sth-layout>
    </template>

<script>
    import CreateSthLayout from '@/views/create-sth-layout'
    import FormLayout from '@/views/create-sth-layout/form-layout'

    export default {
        name: "CreateLabel",
        components:{
            CreateSthLayout,
            FormLayout
        },
        data() {
            return {
                labelKey:'',
                labelValue:'',
                labelKeyOptions:[
                    { value: 'name', label: 'name' },
                    { value: 'number', label: 'number' },
                    { value: 'datetime', label: 'datetime' }
                ],
                labelValueOptions:[
                    { value: '1', label: '1' },
                    { value: '2', label: '2' },
                    { value: '3', label: '3' }
                ],
            }
        },
        methods: {
            onSubmit() {
                console.log('submit!');
            },
            back(){
                this.$router.back()
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/variables.scss";
</style>


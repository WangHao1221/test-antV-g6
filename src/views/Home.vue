<template>
  <div class="home">
    <div style="100%;height:800px;">
      <flow-panel
        v-if="resultReloadData.id"
        :resultReloadData="resultReloadData"
      ></flow-panel>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line import/extensions
import FlowPanel from "@/components/ef/run_time_panel";
import { getDataDefault } from "@/components/ef/run_time_data";

export default {
  name: "Home",
  components: {
    FlowPanel,
  },
  data() {
    return {
      resultReloadData: {}, // 画布已完成元素
    };
  },
  mounted() {
    this.initRunTimeData();
  },
  methods: {
    initRunTimeData() {
      this.resultReloadData = getDataDefault();
      console.log("this.resultReloadData...", this.resultReloadData);
    },
  },
};
</script>

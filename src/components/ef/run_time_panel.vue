<template>
  <div id="container">
    <div class="float-window">
      <div class="dian"></div>
      <div class="float-row">
        <span class="tips">接口类型</span><span>SATA</span>
      </div>
      <div class="float-row">
        <span class="tips">显卡</span><span>Nvidia</span>
      </div>
      <div class="float-row">
        <span class="tips">型号</span><span>Lennovo IBM X3505</span>
      </div>
    </div>
  </div>
</template>

<script>
import G6 from "@antv/g6"; //在需要的js文件引入

export default {
  props: {
    resultReloadData: {
      type: Object,
    },
  },
  data() {
    return {};
  },
  mounted() {
    // 默认加载流程的数据、在这里可以根据具体的业务返回符合流程数据格式的数据即可
    this.initTree(this.resultReloadData);
  },
  methods: {
    initTree(data) {
      G6.registerNode(
        "icon-node",
        {
          options: {
            size: [60, 20],
            stroke: "#91d5ff",
            fill: "#91d5ff",
          },
          draw(cfg, group) {
            // console.log(cfg, group);
            const styles = this.getShapeStyle(cfg);
            // console.log("111->", styles);
            const { labelCfg = {} } = cfg;

            const w = styles.width;
            const h = styles.height;

            const keyShape = group.addShape("rect", {
              attrs: {
                ...styles,
                x: 0,
                y: 0,
              },
            });
            // console.log("cfg", cfg);
            group.addShape("image", {
              attrs: {
                x: 0,
                y: 0,
                width: w,
                height: h,
                img:
                  cfg.level === 1
                    ? "https://img2.baidu.com/it/u=3780830017,2244070805&fm=26&fmt=auto&gp=0.jpg"
                    : "https://img0.baidu.com/it/u=567317826,3830416873&fm=26&fmt=auto&gp=0.jpg",
              },
              name: "image-shape",
            });

            if (cfg.label) {
              group.addShape("text", {
                attrs: {
                  ...labelCfg.style,
                  text: cfg.label,
                  textAlign: "center",
                  width: w,
                  height: h,
                  x:
                    cfg.level === 1 ? w + 70 : cfg.level === 2 ? w + 10 : w / 2,
                  y: cfg.level === 1 ? h - 20 : h + 30,
                },
              });
            }
            if (cfg.equipName) {
              group.addShape("text", {
                attrs: {
                  ...labelCfg.style,
                  text: cfg.equipName,
                  textAlign: cfg.level === 3 ? "center" : "left",
                  fill: "#c09e50",
                  width: w,
                  height: h,
                  x:
                    cfg.level === 1
                      ? w + 20
                      : cfg.level === 2
                      ? w / 2 + 20
                      : w / 2,
                  y: cfg.level === 1 ? h : h + 50,
                },
              });
            }
            if (cfg.des) {
              group.addShape("text", {
                attrs: {
                  ...labelCfg.style,
                  text: cfg.des,
                  textAlign: cfg.level === 3 ? "center" : "left",
                  width: w,
                  height: h,
                  x:
                    cfg.level === 1
                      ? w + 20
                      : cfg.level === 2
                      ? w / 2 + 20
                      : w / 2,
                  y: cfg.level === 1 ? h + 20 : h + 70,
                },
              });
            }

            return keyShape;
          },
          update: undefined,
        },
        "rect"
      );
      // 动画实现
      G6.registerEdge("circle-running", {
        afterDraw(cfg, group) {
          // get the first shape in the group, it is the edge's path here=
          const shape = group.get("children")[0];
          // the start position of the edge's path
          const startPoint = shape.getPoint(0);

          // add red circle shape
          const circle = group.addShape("circle", {
            attrs: {
              x: startPoint.x,
              y: startPoint.y,
              fill: "#fdce5f",
              r: 3,
            },
            name: "circle-shape",
          });

          // animation for the red circle
          circle.animate(
            (ratio) => {
              // the operations in each frame. Ratio ranges from 0 to 1 indicating the prograss of the animation. Returns the modified configurations
              // get the position on the edge according to the ratio
              const tmpPoint = shape.getPoint(ratio);
              // returns the modified configurations here, x and y here
              return {
                x: tmpPoint.x,
                y: tmpPoint.y,
              };
            },
            {
              repeat: true, // Whether executes the animation repeatly
              duration: 3000, // the duration for executing once
            }
          );
        },
        // 绘制
        draw(cfg, group) {
          const startPoint = cfg.startPoint;
          const endPoint = cfg.endPoint;

          const { style } = cfg;
          const shape = group.addShape("path", {
            attrs: {
              stroke: style.stroke,
              endArrow: style.endArrow,
              path: [
                ["M", startPoint.x, startPoint.y],
                ["L", startPoint.x, (startPoint.y + endPoint.y) / 2],
                ["L", endPoint.x, (startPoint.y + endPoint.y) / 2],
                ["L", endPoint.x, endPoint.y],
              ],
            },
          });

          return shape;
        },
      });

      const defaultStateStyles = {
        hover: {
          stroke: "#1373c2",
          lineWidth: 2,
        },
      };

      const defaultNodeStyle = {
        fill: "#91d5ff",
        stroke: "#40a9ff",
        radius: 5,
      };

      const defaultEdgeStyle = {
        lineWidth: 5,
        stroke: "#29c6b2", //连线
        endArrow: {
          path: "M 0,0 L 12, 6 L 9,0 L 12, -6 Z",
          fill: "#91d5ff",
          d: -20,
        }, //连线箭头
      };

      const defaultLayout = {
        type: "compactBox",
        direction: "TB",
        getId: function getId(d) {
          return d.id;
        },
        getHeight: function getHeight() {
          return 200;
        },
        getWidth: function getWidth() {
          return 16;
        },
        getVGap: function getVGap() {
          return 40;
        },
        getHGap: function getHGap() {
          return 70;
        },
      };

      const defaultLabelCfg = {
        style: {
          fill: "#7d8288", //文字颜色
          fontSize: 16,
        },
      };

      const container = document.getElementById("container");
      const width = container.scrollWidth;
      const height = container.scrollHeight || 500;
      const graph = new G6.TreeGraph({
        container: "container",
        width,
        height,
        linkCenter: true,
        modes: {
          //   default: ["drag-canvas", "zoom-canvas"],
        },
        defaultNode: {
          type: "icon-node",
          size: [120, 130],
          style: defaultNodeStyle,
          labelCfg: defaultLabelCfg,
        },
        defaultEdge: {
          type: "circle-running",
          style: defaultEdgeStyle,
        },
        nodeStateStyles: defaultStateStyles,
        edgeStateStyles: defaultStateStyles,
        layout: defaultLayout,
      });

      graph.data(data);
      graph.render();
      graph.fitView();

      graph.on("node:mouseenter", (evt) => {
        const { item } = evt;
        graph.setItemState(item, "hover", true);
      });

      graph.on("node:mouseleave", (evt) => {
        const { item } = evt;
        graph.setItemState(item, "hover", false);
      });
      if (typeof window !== "undefined")
        window.onresize = () => {
          if (!graph || graph.get("destroyed")) return;
          if (!container || !container.scrollWidth || !container.scrollHeight)
            return;
          graph.changeSize(container.scrollWidth, container.scrollHeight);
        };
    },
  },
};
</script>
<style lang="less" scoped>
#container {
  height: 100%;
  position: relative;
  background: url("../../images/window-bg.png") no-repeat;
  background-origin: center center;
  background-size: 100% 100%;
  .float-window {
    position: absolute;
    left: 5;
    top: 30px;
    padding: 8px;
    color: #b9cfe0;
    background-color: rgba(22, 96, 154, 0.8);
    border-radius: 10px;
    .dian {
      width: 10px;
      height: 10px;
      background-color: #ffce5c;
      border-radius: 50%;
    }
    .float-row {
      padding: 10px;
      .tips {
        padding-right: 10px;
      }
    }
  }
}
</style>

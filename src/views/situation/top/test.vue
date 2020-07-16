<template>
    <!--负载情况-->
        <div ref="bar_dv" :style="{width:'10provinces0%',height:'400px'}">
            <slot></slot>
        </div>

</template>

<script>
    import echarts from 'echarts'

    export default {
        name: "NodeIndexDialog",
        props: {
            title: String,
            provinces: {
                type: Object,
                default: () => {
                    return {
                        title: [],
                        count: [],
                    }
                },
            },
            isShowDialog: {
                type: Boolean,
                default: false,
            },
        },
        mounted() {
            var that = this;
            console.log('mounted()');
            setTimeout(function () {
                that.drawLine();
            }, 1000)


        },
        created() {
        },
        methods: {
            /*
            负载情况图标
             */
            drawLine() {
            var that=this;
                let bar_dv = this.$refs.bar_dv;
                let myChart = echarts.init(bar_dv);
                // 绘制图表
                myChart.setOption({
                    title: {text: this.title},
                    tooltip: {},
                    xAxis: {
                        axisLabel: {
                            interval: 1
                        },
                        data: that.provinces.title
                    },
                    barWidth: 20,
                    color: ['#009CFF'],
                    yAxis: {},
                    series: [{
                        name: '订单量',
                        type: 'bar',
                        data: that.provinces.count
                    }]
                });
            },


        }
    }
</script>

<style scoped>

</style>
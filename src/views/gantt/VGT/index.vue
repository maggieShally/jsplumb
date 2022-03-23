<!--
 * @Description: 甘特图，可以始使 开源
 * @Date: 2021-09-15 09:45:47
 * @LastEditTime: 2022-03-04 15:05:47
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\gantt\VGT\index.vue
-->
<template>
  <el-button @click="HandleGetData">获取数据</el-button>
  <div class="app-container">
    <div ref="ganttRef" class="left-container" />
  </div>
</template>
<script>
import { gantt, Gantt } from 'dhtmlx-gantt' // 引入模块
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css'
import { reactive, onMounted, toRefs, ref } from 'vue'
import './locale_cn' // 本地化
export default {
  name: 'DhtmlxGantt',
  setup() {
    const ganttRef = ref(null)
    const state = reactive({
      tasks: {
        data: [
          {
            id: 1,
            text: '项目栗子',
            start_date: '01-08-2021',
            // duration: 2,
            progress: 0.4,
            open: true,
            extraText: '我是一个栗子',
            type: 'project',
          },
          {
            id: 5,
            text: '子任务1',
            start_date: '01-08-2021',
            duration: 2,
            progress: 0.6,
            parent: 1,
            extraText: '举个栗子',
            type: 'task',
          },
          {
            id: 4,
            text: '子任务2',
            start_date: '06-08-2021',
            duration: 3,
            order: 20,
            progress: 0.6,
            parent: 1,
            extraText: '举个栗子',
            type: 'task',
          },
          {
            id: 2,
            text: '任务',
            start_date: '02-08-2021',
            duration: 8,
            order: 10,
            progress: 0.6,
            extraText: '举个栗子',
          },
        ],
      },
    })

    onMounted(() => {
      function getWeekOfMonthNumber(date) {
        let adjustedDate = date.getDate() + date.getDay()
        let prefixes = ['0', '1', '2', '3', '4', '5']
        return parseInt(prefixes[0 | (adjustedDate / 7)]) + 1
      }

      gantt.config.scales = [
        { unit: 'month', step: 1, format: '%F, %Y' },
        {
          unit: 'week',
          step: 1,
          format: function (date) {
            return '第' + getWeekOfMonthNumber(date) + '周'
          },
        },
        {
          unit: 'day',
          step: 1,
          format: '%j，' + '周'+ '%D',
          css: function (date) {
            if (!gantt.isWorkTime(date)) {
              return 'week-end'
            }
          },
        },
      ]
      gantt.config.columns = [
        { name: 'text', label: '项目名', tree: true, width: '*' },
        { name: 'start_date', label: '开始日期', align: 'center' },
        { name: 'duration', label: '天数', align: 'center' },
        { name: 'add', label: '' },
      ]


      // 初始化
      gantt.config.open_split_tasks = true
      gantt.config.scale_height = 100
      gantt.config.start_date = new Date('2021-07-20')
      gantt.config.end_date = new Date('2022-12-20')
      gantt.plugins({
        tooltip: true,
        click_drag: true,
      })
      gantt.config.click_drag = {
        callback: function (
          startPoint,
          endPoint,
          startDate,
          endDate,
          tasksBetweenDates,
          tasksInRow
        ) {
          console.log(12222222)
          if (tasksInRow.length === 1) {
            var currentTask = tasksInRow[0]
            if (currentTask.type === 'project') {
              currentTask.render = 'split'
              gantt.addTask(
                {
                  text: 'Subtask of ' + currentTask.text,
                  start_date: gantt.roundDate(startDate),
                  end_date: gantt.roundDate(endDate),
                },
                currentTask.id
              )
            } else {
              var projectName = 'new Project ' + currentTask.text
              var newProject = gantt.addTask(
                {
                  text: projectName,
                  render: 'split',
                  type: 'project',
                },
                currentTask.id
              )
              gantt.moveTask(
                newProject,
                gantt.getTaskIndex(currentTask.id),
                gantt.getParent(currentTask.id)
              )
              gantt.moveTask(currentTask.id, 0, newProject)
              gantt.calculateTaskLevel(currentTask)
              var newTask = gantt.addTask(
                {
                  text: 'Subtask of ' + projectName,
                  start_date: gantt.roundDate(startDate),
                  end_date: gantt.roundDate(endDate),
                },
                newProject
              )
              gantt.calculateTaskLevel(newTask)
            }
          } else if (tasksInRow.length === 0) {
            gantt.createTask({
              text: 'New task',
              start_date: gantt.roundDate(startDate),
              end_date: gantt.roundDate(endDate),
            })
          }
        },
        singleRow: true,
      }

      gantt.templates.tooltip_text = function (start, end, task) {
        return (
          '<b>Task:</b> ' +
          task.text +
          '<br/><b>其它信息:</b> ' +
          task.extraText
        )
      }

      gantt.init(ganttRef.value)
      // gantt.i18n.setLocale('cn')
      // gantt.attachEvent('onTaskClick', function (id, e) {
      //   alert("You've just clicked an item with id=" + id)
      // })

      gantt.attachEvent('onAfterTaskUpdate', function (id, item) {
        console.log(id, item)
      })

      gantt.attachEvent("onAfterTaskAdd", function(id,item){
         console.log(id, item)
      });
      // 数据解析
      gantt.parse(state.tasks)
    })

    const HandleGetData = () => {
      console.log(gantt.getTaskByTime())
    }

    return {
      ganttRef,
      ...toRefs(state),
      HandleGetData,
    }
  },
}
</script>
<style lang="less">
.left-container {
  height: 600px;
}
</style>
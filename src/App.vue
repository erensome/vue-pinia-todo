<template>
  <main>

    <!-- Heading -->
    <header>
      <img src="./assets/pinia-logo.svg" alt="Pinia logo">
      <h1>Pinia Tasks</h1>
    </header>

    <!-- Task form -->
    <div class="new-task-form">
      <TaskForm/>      
    </div>

    <!-- Filters -->
    <nav class="filter">
      <button @click="filter = 'all'">All Tasks</button>
      <button @click="filter = 'favs'">Fav Tasks</button>
    </nav>

    <!-- Loading -->
    <div class="loading" v-if="loading">Tasks are loading...</div>

    <!-- Task list -->
    <div class="task-list" v-if="filter === 'all'">
      <p>You have {{ totalCount }} tasks left to do</p>
      <div v-for="task in tasks">
        <TaskDetails :task="task" />
      </div>
    </div>

    <!-- Fav list -->
    <div class="task-list" v-if="filter === 'favs'">
      <p>You have {{ favCount }} favs left to do</p>
      <div v-for="task in favs">
        <TaskDetails :task="task" />
      </div>
    </div>

    <button @click="taskStore.$reset">Reset State</button>
  </main>
</template>

<script>
import { ref } from 'vue'
import { useTaskStore } from './stores/TaskStore'
import TaskDetails from './components/TaskDetails.vue'
import TaskForm from './components/TaskForm.vue'
import { storeToRefs } from 'pinia'

export default {
  components: {TaskDetails, TaskForm},

  // Composition API - setup
  setup() {
    const taskStore = useTaskStore()

    // storeToRefs - converts a store to a reactive object (property ve getters)
    // store'daki property ve getterları reaktif verilere dönüştürür
    const {tasks, loading, favs, favCount, totalCount } = storeToRefs(taskStore)

    //fetch task
    taskStore.getTasks();

    const filter = ref('all')

    return {taskStore, filter, tasks, loading, favs, favCount, totalCount}
  }
}
</script>

<template>
    <form @submit.prevent="handleSubmit">
        <input 
            type="text"
            placeholder="I need to..."
            v-model="newTask"
        >
        <button>Add</button>
    </form>
</template>

<script>
import { useTaskStore } from '../stores/TaskStore';
import { ref } from 'vue';

export default {
    setup() {
        const taskStore = useTaskStore()

        const newTask = ref('')

        const handleSubmit = () => {
            if(newTask.value.length > 0) {
                const task = {
                    id: taskStore.tasks.length + 1,
                    title: newTask.value,
                    isFav: false
                }
                taskStore.addTask(task)
                newTask.value = ''                
            }
        }

        return { newTask, handleSubmit }
    }
}
</script>
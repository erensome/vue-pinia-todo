// Store oluşturabilmek için gerekli fonksiyon
import { defineStore } from "pinia";

// ilk argüman bir identifier, ikinci argüman ise bir obje ve bu obje içinde stateleri tanımlayacağız 
export const useTaskStore = defineStore('taskStore', {
    // state fonksiyonu ile uygulamanın durumlarını tanımlıyoruz
    state: () => ({
        tasks: [],
        loading: false
    }),
    // getters, durum içeriğini alarak işlevsel veya dönüştürücü bir işlem yapar ve bu işlem sonucunu geri döndürür
    getters: {
        favs() {
            return this.tasks.filter(i => i.isFav)
        },
        favCount() {
            // 2.argüman inital değer
            return this.tasks.reduce((acc, i) => {
                return i.isFav ? acc + 1 : acc
            }, 0)
        },
        totalCount: (state) => {
            return state.tasks.length
        }
    },
    // State üzerinde değişiklik veya işlemler yapılacağı zaman kullanılan metotlardır.
    actions: {
        // JSON dosyasındaki task verilerinin hepsini çeker
        async getTasks() {
            this.loading = true;
            const response = await fetch('http://localhost:3000/tasks');
            const data = await response.json();

            this.tasks = data;
            this.loading = false;
        },
        // Yeni task ekler
        async addTask(task) {
            this.tasks.push(task);

            // Post request
            const res = await fetch('http://localhost:3000/tasks', {
                method: 'POST',
                body: JSON.stringify(task),
                headers: {'Content-Type': 'application/json'}
            })

            if (res.error) {
                console.log(res.error);
            }
        },
        // Belirtilen taski siler
        async deleteTask(id) {
            this.tasks = this.tasks.filter(i => i.id !== id);

            // Delete request
            const res = await fetch('http://localhost:3000/tasks/' + id, {
                method: 'DELETE',
            })

            if (res.error) {
                console.log(res.error);
            }
        },
        // Belirtilen taski favorilere ekler veya çıkarır
        async toggleFav(id) {
            const task = this.tasks.find(i => i.id === id);
            task.isFav = !task.isFav;

            // Patch request
            const res = await fetch('http://localhost:3000/tasks/' + id, {
                method: 'PATCH',
                body: JSON.stringify({isFav: task.isFav}),
                headers: {'Content-Type': 'application/json'}
            })

            if (res.error) {
                console.log(res.error);
            }
        }
    }
})
